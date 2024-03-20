import axios from 'axios';

let failedQueue = [];
let isRefreshing = false;

const processQueue = (error) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });

    failedQueue = [];
};

export function createAxiosClient({ options, getCurrentAccessToken, getCurrentRefreshToken, refreshTokenUrl, logout, setRefreshedTokens }) {
    const client = axios.create(options);

    client.interceptors.request.use(
        (config) => {
            if (getCurrentAccessToken) {
                const token = getCurrentAccessToken();
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    client.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            const originalRequest = error.config;
            originalRequest.headers = JSON.parse(JSON.stringify(originalRequest.headers || {}));
            const refreshToken = getCurrentRefreshToken();

            // If error, process all the requests in the queue and logout the user.
            const handleError = (error) => {
                processQueue(error);
                logout();
                return Promise.reject(error);
            };

            // Refresh token conditions
            if (
                refreshToken &&
                error.response?.status === 401 &&
                originalRequest?.url !== refreshTokenUrl &&
                originalRequest?._retry !== true
            ) {
                if (isRefreshing) {
                    return new Promise(function (resolve, reject) {
                        failedQueue.push({ resolve, reject });
                    })
                        .then(() => {
                            return client(originalRequest);
                        })
                        .catch((err) => {
                            return Promise.reject(err);
                        });
                }
                isRefreshing = true;
                originalRequest._retry = true;
                return client
                    .post(refreshTokenUrl, {
                        refresh: refreshToken
                    })
                    .then((res) => {
                        setRefreshedTokens(res.data?.access);
                        processQueue(null);

                        return client(originalRequest);
                    }, handleError)
                    .finally(() => {
                        isRefreshing = false;
                    });
            }

            if (error.response?.status === 401) {
                return handleError(error);
            }

            return Promise.reject(error);
        }
    );

    return client;
}
