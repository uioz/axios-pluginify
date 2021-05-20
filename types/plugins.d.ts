import { AxiosInstance, AxiosRequestConfig } from "axios";
import { ISetupCache } from "axios-cache-adapter";
import { IAxiosRetryConfig } from "axios-retry";
import IAxiosRetry from "axios-retry";
import { AxiosPlugin } from "./index";
export declare class AxiosCacheAdapter implements AxiosPlugin {
    private adapter;
    constructor(adapter: ISetupCache);
    beforeCreate(config: AxiosRequestConfig): void;
}
export declare class AxiosRetry implements AxiosPlugin {
    private config;
    private retry;
    constructor(config: IAxiosRetryConfig, retry: typeof IAxiosRetry);
    created(axios: AxiosInstance): void;
}
//# sourceMappingURL=plugins.d.ts.map