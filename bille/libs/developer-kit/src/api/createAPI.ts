import axios from 'axios';
import { delay, from, map, Observable, of } from 'rxjs';

export interface APIConfig {
  url: string;
}

export interface ServiceConfig {
  name: string;
}

export type PropType = 'query' | 'param';

export type MethodConfig<P> = {
  [K in keyof P]: PropType;
};

const getByPropType = <P>(
  config: MethodConfig<P> | null,
  propType: PropType
) => {
  return Object.entries(config ?? {}).filter(([, pt]) => pt === propType);
};

const extractUrl = <P extends Record<string, unknown> | null>(
  apiConfig: APIConfig,
  serviceConfig: ServiceConfig,
  methodConfig: MethodConfig<P> | null
) => {
  const params = getByPropType(methodConfig, 'param').map(([key]) => ':' + key);

  return [apiConfig.url, serviceConfig.name, ...params].join('/');
};

const getSafeObject = (
  obj: Record<string, unknown> | null
): Record<string, unknown> => obj ?? {};

const extractByPropType = <P extends Record<string, unknown> | null>(
  methodConfig: MethodConfig<P> | null,
  payload: P,
  propType: PropType
): Record<string, unknown> => {
  const safePayload = getSafeObject(payload);
  const params = methodConfig
    ? getByPropType(methodConfig, propType).reduce(
        (acc, [propKey]) => ({
          ...acc,
          [propKey]: safePayload[propKey],
        }),
        {}
      )
    : {};
  return params;
};

const attachParamsToUrl = <P extends Record<string, unknown> | null>(
  url: string,
  methodConfig: MethodConfig<P> | null,
  payload: P
): string => {
  const params = extractByPropType(methodConfig, payload, 'param');

  return [url, ...Object.values(params)].join('/');
};

const attachQueryToUrl = <P extends Record<string, unknown> | null>(
  methodConfig: MethodConfig<P> | null,
  payload: P
): Record<string, unknown> | undefined => {
  const queryParams = extractByPropType(methodConfig, payload, 'query');
  return Object.keys(queryParams).length > 0 ? queryParams : undefined;
};

const getBaseUrl = (
  apiConfig: APIConfig,
  serviceConfig: ServiceConfig
): string => [apiConfig.url, serviceConfig.name].join('/');

const mock = <R>(data: R, time = 1500): Observable<{ data: R }> =>
  of(data).pipe(
    delay(time),
    map((data) => ({ data }))
  );

export const createAPI = (apiConfig: APIConfig) => {
  return {
    createService: (serviceConfig: ServiceConfig) => {
      const noBodyRequest =
        (type: 'get' | 'delete') =>
        <P extends Record<string, any> | null, R>(
          methodConfig: MethodConfig<P> | null
        ) => {
          const url = getBaseUrl(apiConfig, serviceConfig);

          const handler = (payload: P) => {
            return from(
              axios[type]<R>(attachParamsToUrl(url, methodConfig, payload), {
                params: attachQueryToUrl(methodConfig, payload),
              })
            );
          };

          handler.url = extractUrl(apiConfig, serviceConfig, methodConfig);
          handler.mock = (data: R, time?: number) => mock<R>(data, time);

          return handler;
        };

      const bodyRequest =
        (type: 'post' | 'put' | 'patch') =>
        <P extends Record<string, any> | null, B, R>(
          methodConfig: MethodConfig<P> | null
        ) => {
          const url = getBaseUrl(apiConfig, serviceConfig);

          const handler = (payload: P, body: B) => {
            return from(
              axios[type]<R>(
                attachParamsToUrl(url, methodConfig, payload),
                body ?? undefined,
                {
                  params: attachQueryToUrl(methodConfig, payload),
                }
              )
            );
          };

          handler.url = extractUrl(apiConfig, serviceConfig, methodConfig);
          handler.mock = (data: R, time?: number) => mock<R>(data, time);

          return handler;
        };

      return {
        get: noBodyRequest('get'),
        delete: noBodyRequest('delete'),
        post: bodyRequest('post'),
        put: bodyRequest('put'),
        patch: bodyRequest('patch'),
      };
    },
  };
};
