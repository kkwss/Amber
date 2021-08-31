
class EventManager {
    public eventContainer: Map<any, Function[]> = new Map();

    public registerEvent(eventTarget: any, ...callBacks: Function[]) {

        if (!this.registered(eventTarget)) {
            this.eventContainer.set(eventTarget, [...callBacks]);
            return;
        }

        this.eventContainer.get(eventTarget).push(...callBacks);
    }

    public cancellationEvent(eventTarget: any, callBack: Function) {

        if (!this.registered(eventTarget)) {
            return;
        }

        let callBacks: Function[] = this.eventContainer.get(eventTarget);
        let index = callBacks.indexOf(callBack);

        callBacks.splice(index, 1);
    }

    public dispatchEvent(eventTarget: any, ...args: any[]) {

        if (!this.registered(eventTarget)) {
            return;
        }

        let callBacks: Function[] = this.eventContainer.get(eventTarget);
        callBacks.forEach(fn => fn(...args));

    }

    public registered(request: Request) {
        return this.eventContainer.has(request);
    }

}

class AmberEvent {

    public cancelEventManager: EventManager = new EventManager();
    public progressEventManager: EventManager = new EventManager();
    public downloadendEventManager: EventManager = new EventManager();
    public failEventManager: EventManager = new EventManager();

    public bind(eventType: string, request: Request, ...cbs: Function[]) {
        this[`${eventType.toLowerCase()}EventManager`].registerEvent(request, ...cbs);
    }

    public async listenTranslate(request: Request, response: Response) {
        if (!this.downloadendEventManager.registered(request) && !this.progressEventManager.registered(request)) {
            return;
        }
        let _response: Response = response.clone();

        // 获得一个 reader
        let reader: ReadableStreamDefaultReader = _response.body.getReader();
        // 获得总长度
        let totalLength = +_response.headers.get('Content-Length');
        // 读取数据
        let currentLength = 0;
        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                this.downloadendEventManager.dispatchEvent(request, { currentLength, totalLength });
                break;
            }

            currentLength += value.length;
            this.progressEventManager.dispatchEvent(request, { currentLength, totalLength });
        }
    }

    public listenCancel(request: Request, signal: AbortSignal) {
        if (!this.cancelEventManager.registered(request)) {
            return;
        }
        signal.addEventListener('abort', () => {
            this.cancelEventManager.dispatchEvent(request);
        })
    }

    public listenFail(request: Request, isFail: boolean, failMsg?: any) {
        if (!this.failEventManager.registered(request) || !isFail) {
            return;
        }

        this.failEventManager.dispatchEvent(request, failMsg);
    }
}

export default AmberEvent;