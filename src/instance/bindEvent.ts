import AmberEvent from "../core/amber-Event";

function bindEvent(amberRequestInit: AmberRequestInit, request: Request, amberEvent: AmberEvent) {
    let { oncancel, onprogress, ondownloadend, onfail } = amberRequestInit

    onprogress    && amberEvent.bind('progress',    request, ...[].concat(onprogress));
    ondownloadend && amberEvent.bind('downloadend', request, ...[].concat(ondownloadend));
    onfail        && amberEvent.bind('fail',        request, ...[].concat(onfail));
    oncancel      && amberEvent.bind('cancel',      request, ...[].concat(oncancel));
}

export default bindEvent;