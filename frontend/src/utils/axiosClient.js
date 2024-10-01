import { createAxiosClient } from '../clients/createAxiosClient';
import { ROBOLIFE2_BACKEND_API } from '../constants/Constants';

function getCurrentAccessToken() {
    return localStorage.getItem('token');
}

function getCurrentRefreshToken() {
    return localStorage.getItem('refresh_token');
}

function setRefreshedTokens(token) {
    localStorage.setItem('token', token);
}

async function logout() {
    console.log('logout...');
    localStorage.clear();
    window.location.replace('/login');
}

export const client = createAxiosClient({
    options: {
        baseURL: ROBOLIFE2_BACKEND_API.base_url,
        timeout: 300000,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    },
    getCurrentAccessToken,
    getCurrentRefreshToken,
    refreshTokenUrl: ROBOLIFE2_BACKEND_API.base_url + '/api/accounts/token/refresh/',
    logout,
    setRefreshedTokens
});
