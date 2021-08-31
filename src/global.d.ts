type AmberResponseDataType = 'json' | 'text' | 'blob' | 'formData' | 'arrayBuffer' | 'blob' | 'ReadableStream';

interface AmberRequestInit {
    body?: BodyInit,
    cache?: RequestCache,
    credentials?: RequestCredentials,
    headers?: HeadersInit,
    integrity?: string,
    keepalive?: boolean,
    method?: string,
    mode?: RequestMode,
    redirect?: RequestRedirect,
    referrer?: string,
    referrerPolicy?: ReferrerPolicy,
    signal?: AbortSignal,

    responseType?: AmberResponseDataType,
    timeout?: number,

    oncancel?: Function | Function[],
    onprogress?: Function | Function[],
    ondownloadend?: Function | Function[],
    onfail?: Function | Function[],
}

interface AmberConfig {
    cache?: RequestCache,
    credentials?: RequestCredentials,
    headers?: HeadersInit,
    integrity?: string,
    keepalive?: boolean,
    mode?: RequestMode,
    redirect?: RequestRedirect,
    referrer?: string,
    referrerPolicy?: ReferrerPolicy,
    signal?: AbortSignal,

    responseType?: AmberResponseDataType,
    baseURL?: string,
    timeout?: number,

    oncancel?: Function | Function[],
    onprogress?: Function | Function[],
    ondownloadend?: Function | Function[],
    onfail?: Function | Function[],
}

interface Interpector {
    fulfilled: Function,
    reject: Function,
}

interface AmberResponseDefault {
    body?: BodyInit,
    data?: any,
    status: number,
    statusText: string,
    url: string,
}