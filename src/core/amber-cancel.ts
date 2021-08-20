

class AmberCancel {

    public cancelSignalContainer:     Map<any, AbortSignal>             = new Map();
    public cancelControllerContainer: Map<AbortSignal, AbortController> = new Map();

    // 给请求 init信息中的 signal 设置值，并为 signal的触发器绑定key，即 key/signal/controller三者相关联
    public cancelSignal(tokenKey: any): AbortSignal {
        let registered: boolean = this.cancelSignalContainer.has(tokenKey);

        if (registered) {
            return this.cancelSignalContainer.get(tokenKey);
        }

        const abortController: AbortController = new AbortController();
        const { signal } = abortController;

        this.cancelSignalContainer.set(tokenKey, signal);
        this.cancelControllerContainer.set(signal, abortController);

        return signal;
    }

    // 触发 signal, 取消请求, 成功拦截则返回 true, 失败返回 false
    public cancel(tokenKey: any): boolean {
        let registered: boolean = this.cancelSignalContainer.has(tokenKey);

        if (!registered) {
            return false;
        }

        let signal:          AbortSignal     = this.cancelSignalContainer.get(tokenKey);
        let abortController: AbortController = this.cancelControllerContainer.get(signal);

        abortController.abort();
        return true;
    }
   
}

export default AmberCancel;