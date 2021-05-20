export class AxiosCacheAdapter {
    constructor(adapter) {
        this.adapter = adapter;
    }
    beforeCreate(config) {
        config.adapter = this.adapter.adapter;
    }
}
export class AxiosRetry {
    constructor(config, retry) {
        this.config = config;
        this.retry = retry;
    }
    created(axios) {
        this.retry(axios, this.config);
    }
}
//# sourceMappingURL=plugins.js.map