import { AxiosStatic, AxiosInstance, AxiosRequestConfig } from "axios";
declare type beforeCreateHook = (config: AxiosRequestConfig, axios: AxiosStatic) => void;
declare type createdHook = (axios: AxiosInstance, config: AxiosRequestConfig) => void;
export interface AxiosPlugin {
    beforeCreate?: beforeCreateHook;
    created?: createdHook;
}
export interface DefinePlugin extends AxiosPlugin {
    apply: (...args: any) => void;
}
export declare function definePlugin<T extends DefinePlugin>(plugin: T): {
    this: T;
    new (...args: Parameters<T["apply"]>): AxiosPlugin;
};
declare class AxiosPluginify {
    private axiosStatic;
    private config;
    private beforeCreate;
    private created;
    constructor(axiosStatic: AxiosStatic, config: AxiosRequestConfig);
    use(...plugins: Array<AxiosPlugin>): this;
    generate(destroy?: boolean): AxiosInstance;
    destroy(): void;
}
export declare function pluginify(axiosStatic: AxiosStatic, config?: AxiosRequestConfig): AxiosPluginify;
export {};
//# sourceMappingURL=index.d.ts.map