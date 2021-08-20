import InterpectorManager from "../core/amber-interpector";

async function sendRequest(request: Request, timeout: number, requestInterpector: InterpectorManager) {
    let response: Response
    try {
        response = await requestTimeout(request, timeout);
    } catch (e) {
        //触发请求失败拦截器
        return requestInterpector.invoke("reject", e);
    }

    return response;
}

async function requestTimeout(request: Request, timeout: number): Promise<Response> {
    if (!isFinite(timeout)) {
        return await fetch(request);
    }

    let promise = new Promise((res) => {
        setTimeout(res, timeout);
    });

    let response = await Promise.race([promise, fetch(request)]);

    if (!response) {
        return Promise.reject(new Error('timeout'));
    }

    return response as Response;
}

export default sendRequest;