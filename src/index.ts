import { AxiosStatic, AxiosInstance, AxiosRequestConfig } from "axios";
export * from "./plugins";

type beforeCreateHook = (
  config: AxiosRequestConfig,
  axios: AxiosStatic
) => void;

type createdHook = (axios: AxiosInstance, config: AxiosRequestConfig) => void;

export interface AxiosPlugin {
  beforeCreate?: beforeCreateHook;
  created?: createdHook;
}

export interface DefinePlugin extends AxiosPlugin {
  apply: (...args: any) => void;
}

export function definePlugin<T extends DefinePlugin>(
  plugin: T
): { this: T; new (...args: Parameters<T["apply"]>): AxiosPlugin } {
  return function pluginWrapper(
    this: any,
    ...args: Parameters<typeof plugin["apply"]>
  ) {
    plugin.apply.apply(this, args);

    if (plugin.beforeCreate) {
      this.beforeCreate = plugin.beforeCreate.bind(this);
    }
    if (plugin.created) {
      this.created = plugin.created.bind(this);
    }
  } as any;
}

class AxiosPluginify {
  private beforeCreate: Array<beforeCreateHook> = [];
  private created: Array<createdHook> = [];

  constructor(
    private axiosStatic: AxiosStatic,
    private config: AxiosRequestConfig
  ) {}

  use(...plugins: Array<AxiosPlugin>) {
    for (const plugin of plugins) {
      if (typeof plugin.beforeCreate === "function") {
        this.beforeCreate.push(
          (config: AxiosRequestConfig, axios: AxiosStatic) =>
            // @ts-ignore
            plugin.beforeCreate(config, axios)
        );
      }

      if (typeof plugin.created === "function") {
        this.created.push((axios: AxiosInstance, config: AxiosRequestConfig) =>
          // @ts-ignore
          plugin.created(config, axios)
        );
      }
    }

    return this;
  }

  generate(destroy = false): AxiosInstance {
    for (const hook of this.beforeCreate) {
      hook(this.config, this.axiosStatic);
    }

    const axios = this.axiosStatic.create(this.config);

    for (const hook of this.created) {
      hook(axios, this.config);
    }

    if (destroy) {
      this.destroy();
    }

    return axios;
  }

  destroy() {
    this.beforeCreate = [];
    this.created = [];
    // @ts-ignore
    this.config = this.axiosStatic = null;
  }
}

export function pluginify(
  axiosStatic: AxiosStatic,
  config: AxiosRequestConfig = {}
) {
  return new AxiosPluginify(axiosStatic, config);
}
