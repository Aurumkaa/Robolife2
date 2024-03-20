import { createAxiosClient } from '../clients/createAxiosClient';

const REFRESH_TOKEN_URL = 'http://localhost:8000/api/accounts/token/refresh/';
const BASE_URL = 'http://localhost:8000';

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
    window.location.replace('http://127.0.0.1:3000/login');
}

export const client = createAxiosClient({
    options: {
        baseURL: BASE_URL,
        timeout: 300000,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    },
    getCurrentAccessToken,
    getCurrentRefreshToken,
    refreshTokenUrl: REFRESH_TOKEN_URL,
    logout,
    setRefreshedTokens
});
