import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ISetupCache } from 'axios-cache-adapter';
import { IAxiosRetryConfig } from 'axios-retry';
import IAxiosRetry from 'axios-retry';
import { AxiosPlugin } from './index';

export class AxiosCacheAdapter implements AxiosPlugin {
  constructor(private adapter: ISetupCache) {}

  beforeCreate(config: AxiosRequestConfig): void {
    config.adapter = this.adapter.adapter;
  }
}

export class AxiosRetry implements AxiosPlugin {
  constructor(
    private config: IAxiosRetryConfig,
    private retry: typeof IAxiosRetry
  ) {}

  created(axios: AxiosInstance): void {
    this.retry(axios, this.config);
  }
}
