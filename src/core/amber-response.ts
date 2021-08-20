
class AmberResponse  {
    public body: ReadableStream<Uint8Array>
    public headers: HeadersInit
    public redirected: boolean
    public ok: boolean
    public status: number
    public statusText: string
    public url: string
    public response: Response

    constructor(response: Response) {

        const {
            body,
            headers,
            ok,
            status,
            statusText,
            url,
            redirected,
        } = response;

        this.body = body;
        this.headers = headers;
        this.redirected = redirected;
        this.ok = ok;
        this.status = status;
        this.statusText = statusText;
        this.url = url;
        this.response = response;
    }
    

    private async read(responseType: AmberResponseDataType): Promise<any> {
        let _response = this.response.clone();

        if (responseType === 'ReadableStream') {
            return _response.body;
        }

        return await _response[responseType]();
    }

    public async createResponse(responseType: AmberResponseDataType): Promise<AmberResponseDefault> {
        return {
            data: await this.read(responseType),
            body: JSON.parse(JSON.stringify(this.body)),
            status: this.status,
            statusText: this.statusText,
            url: this.url,
        }
    }
}

export default AmberResponse;