import InterpectorManager from "../core/amber-interpector";
import AmberResponse from "./../core/amber-response";

async function createResponse(response: Response, responseType: AmberResponseDataType, responseInterpector: InterpectorManager) {
    
    let amberResponse: AmberResponse = new AmberResponse(response as Response);
    let amberResponseDefault: AmberResponseDefault = await amberResponse.createResponse(responseType);
    // 根据响应状态触发拦截器
    amberResponseDefault = amberResponse.ok
        ? responseInterpector.invoke('fulfilled', amberResponseDefault)
        : responseInterpector.invoke('reject', amberResponseDefault);
    
    return amberResponseDefault;
}

export default createResponse;