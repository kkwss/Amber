
class InterpectorManager {
    interpectorContainer: Array<Interpector> = [];

    public use(fulfilled: Function, reject: Function) {
        let interpector: Interpector = { fulfilled, reject };

        this.interpectorContainer.push(interpector);
    }
    
    public invoke(type: 'fulfilled' | 'reject', info: any): typeof info {

        this.interpectorContainer.forEach(interpector => {
            info = interpector[type](info) ?? info;
            return;
        })

        return info;
    }
}

export default InterpectorManager;