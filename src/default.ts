import Amber from './instance/index';

class AmberDefault {
    public create(config: any): Amber {
        return new Amber(config);
    }
}

const amber = new AmberDefault().create({
    responseType: 'json',
    baseURL: '',
    timeout: Infinity,

    oncancel: null,
    onprogress: null,
    ondownloadend: null,
    onfail: null,
});

export default amber;