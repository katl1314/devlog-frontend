type RequestInterceptors = <T>(args: T) => Promise<T>;
type ResponseInterceptors = <T>(res: Response, reqArgs: unknown) => Promise<T>;
type Interceptors = {
  request?: RequestInterceptors;
  response?: ResponseInterceptors;
};

interface Fetch {
  baseUrl?: string;
  defaultHeader?: { [name: string]: string };
  interceptors?: Interceptors;
}

function customFetch({
  baseUrl = "",
  defaultHeader = {},
  interceptors = {},
}: Fetch) {
  const { request: requestInterceptor, response: responseInterceptors } =
    interceptors;

  return async (url: string = "", options: RequestInit = {}) => {
    const target = `${baseUrl}/${url}`;
    const config = {
      ...options,
      headers: {
        ...defaultHeader,
        ...options.headers,
      },
    };

    let requestArgs: [string, RequestInit] = [target, config];

    if (requestInterceptor) {
      requestArgs = await requestInterceptor(requestArgs);
    }

    let response: Response;

    response = await fetch(...requestArgs);

    if (responseInterceptors) {
      response = await responseInterceptors(response, requestArgs);
    }

    return response;
  };
}

function initFetch(
  baseUrl: string,
  defaultHeader?: { [name: string]: string },
  interceptors?: Interceptors
) {
  const fetch = customFetch({ baseUrl, defaultHeader, interceptors });
  return () => {
    return {
      get(url: string, options: RequestInit) {
        const config: RequestInit = { ...options, method: "GET" };
        return fetch(url, config);
      },
      post(url: string, options: RequestInit) {
        const config: RequestInit = { ...options, method: "POST" };
        return fetch(url, config);
      },
      patch(url: string, options: RequestInit) {
        const config: RequestInit = { ...options, method: "Patch" };
        return fetch(url, config);
      },
      put(url: string, options: RequestInit) {
        const config: RequestInit = { ...options, method: "PUT" };
        return fetch(url, config);
      },
      delete(url: string, options: RequestInit) {
        const config: RequestInit = { ...options, method: "DELETE" };
        return fetch(url, config);
      },
    };
  };
}

export default initFetch("http://localhost:3001")();
