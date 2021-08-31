
class AmberRequest {
   public init: AmberRequestInit;
   public input: RequestInfo;
   public body: any;
   public responseType: AmberResponseDataType;

   constructor(input: RequestInfo, init?: AmberRequestInit) {
        this.init = init;
        this.input = input;
        this.body = init?.body;
        this.responseType = init?.responseType;
   }

   public createRequest(): Request {
       let requestInit: RequestInit = this.requestFomart(this.init);
       let request: Request = new Request(this.input, requestInit);

       return request;
   }

   private requestFomart(amberRequestInit: AmberRequestInit): RequestInit {
    let {
        body,
        cache,
        credentials,
        headers,
        integrity,
        keepalive,
        method,
        mode,
        redirect,
        referrer,
        referrerPolicy,
        signal,
    } = amberRequestInit;
    
    // 真正发出去的请求可能是被拦截器拦截过的，body可能改变，因此在这里重新赋值
    body = this.body;

    return {
        body,
        cache,
        credentials,
        headers,
        integrity,
        keepalive,
        method,
        mode,
        redirect,
        referrer,
        referrerPolicy,
        signal,
    }
}


}

export default AmberRequest;