import InterpectorManager from "../core/amber-interpector";
import AmberRequest from "./../core/amber-request";

function createRequest(input: RequestInfo, amberRequestInit: AmberRequestInit, requestInterpector: InterpectorManager) {
    let amberRequest: AmberRequest = new AmberRequest(input, amberRequestInit);
    // 触发请求成功拦截器
    amberRequest = requestInterpector.invoke('fulfilled', amberRequest);
    
    return amberRequest.createRequest();
}

export default createRequest;