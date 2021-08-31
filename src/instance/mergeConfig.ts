
function mergeConfig(config: AmberConfig, amberRequestInit: AmberRequestInit = {}) {
    let _config = {
        cache: config.cache,
        credentials: config.credentials,
        headers: config.headers,
        integrity: config.integrity,
        keepalive: config.keepalive,
        mode: config.mode,
        redirect: config.redirect,
        referrer: config.referrer,
        referrerPolicy: config.referrerPolicy,
        signal: config.signal ?? null,
        responseType: config.responseType,
        timeout: config.timeout ?? Infinity,
        oncancel: config.oncancel ?? null,
        onprogress: config.onprogress ?? null,
        ondownloadend: config.ondownloadend ?? null,
        onfail: config.onfail ?? null,
    }

    amberRequestInit = Object.assign(_config, amberRequestInit);

    return amberRequestInit;
}

function buildFullPath(input: RequestInfo, baseURL: string = '') {
    typeof input === 'string' && (input = baseURL + input);

    return input;
}

export { mergeConfig, buildFullPath };