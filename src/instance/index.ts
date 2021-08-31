import { mergeConfig, buildFullPath } from './mergeConfig';
import createRequest from "./createRequest";
import sendRequest from "./sendRequest";
import createResponse from "./createResponse";
import InterpectorManager from '../core/amber-interpector';
import AmberCancel from '../core/amber-cancel';
import AmberEvent from '../core/amber-Event';
import bindEvent from './bindEvent';

class Amber {

    public requestInterpector: InterpectorManager = new InterpectorManager();
    public responseInterpector: InterpectorManager = new InterpectorManager();
    public amberCancel: AmberCancel = new AmberCancel();
    public amberEvent: AmberEvent = new AmberEvent();

    public requestConfig: AmberConfig;

    constructor(config: AmberConfig = {
        responseType: 'json',
        baseURL: '',
        timeout: Infinity,

        oncancel: null,
        onprogress: null,
        ondownloadend: null,
        onfail: null,
    }) {
        this.requestConfig = config;
    }

    public async send(input: RequestInfo, amberRequestInit?: AmberRequestInit) {
        /*-----初始化请求过程-------*/

        amberRequestInit = mergeConfig(this.requestConfig, amberRequestInit);
        input = buildFullPath(input, this.requestConfig.baseURL);

        let responseType: AmberResponseDataType = amberRequestInit.responseType;

        /*-----创建请求过程-------*/

        let request: Request = createRequest(input, amberRequestInit, this.requestInterpector);
        bindEvent(amberRequestInit, request, this.amberEvent);
        this.amberEvent.listenCancel(request, request.signal);

        /*-----发送请求过程------*/

        let response: Response | any = await sendRequest(request, amberRequestInit.timeout, this.requestInterpector);
        // 请求失败
        if (!(response instanceof Response)) {
            this.amberEvent.listenFail(request, true, response);
            return response
        };

        this.amberEvent.listenTranslate(request, response);

        /*-----接收响应过程------*/

        let amberResponseDefault: AmberResponseDefault = await createResponse(response, responseType, this.responseInterpector);

        return amberResponseDefault;
    }

    public async get(input: RequestInfo, amberRequestInit?: AmberRequestInit): Promise<AmberResponseDefault> {
        amberRequestInit.method = 'GET';
        amberRequestInit.body = null;

        let result: any = await this.send(input, amberRequestInit);
        return result;
    }

    public async delete(input: RequestInfo, amberRequestInit?: AmberRequestInit): Promise<AmberResponseDefault> {
        amberRequestInit.method = 'DELETE';
        amberRequestInit.body = null;

        let result: any = await this.send(input, amberRequestInit);
        return result;
    }

    public async post(input: RequestInfo, body?: any, amberRequestInit?: AmberRequestInit): Promise<AmberResponseDefault> {
        amberRequestInit.method = 'POST';
        amberRequestInit.body = body;

        let result: any = await this.send(input, amberRequestInit);

        return result;
    }

    public async put(input: RequestInfo, body?: any, amberRequestInit?: AmberRequestInit): Promise<AmberResponseDefault> {
        amberRequestInit.method = 'PUT';
        amberRequestInit.body = body;

        let result: any = await this.send(input, amberRequestInit);

        return result;
    }

    public async patch(input: RequestInfo, body?: any, amberRequestInit?: AmberRequestInit): Promise<AmberResponseDefault> {
        amberRequestInit.method = 'PATCH';
        amberRequestInit.body = body;

        let result: any = await this.send(input, amberRequestInit);

        return result;
    }

    public cancelSignal(tokenKey: any) {
        return this.amberCancel.cancelSignal(tokenKey);
    }

    public cancel(tokenKey: any) {
        return this.amberCancel.cancel(tokenKey);
    }

}

export default Amber;