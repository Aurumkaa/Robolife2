import { FIELD_CLIMATE_API } from '../constants/Constants';

const successLoginEvent = new Event('successLogin');
const failLoginEvent = new Event('failedLogin');

const fieldClimateAPI = {
    loginPayload: {
        grant_type: 'password',
        client_id: 'FieldclimateNG',
        client_secret: '618a5baf48287eecbdfc754e9c933a',
        username: 'oao kuban',
        password: '8523700'
    },

    currentTokenData: null,
    isRefreshing: false,
    loginEmitter: document.createElement('div'),

    async login() {
        try {
            this.isRefreshing = true;
            const res = await fetch('https://oauth.fieldclimate.com/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.loginPayload)
            });

            if (!res.ok) throw new Error('Login error');

            const result = await res.json();
            result['expires_on'] = result['expires_in'] * 1000 + new Date().getTime();
            this.loginEmitter.dispatchEvent(successLoginEvent);
            this.currentTokenData = result;
        } catch (err) {
            this.loginEmitter.dispatchEvent(failLoginEvent);
            throw err;
        } finally {
            this.isRefreshing = false;
        }
    },

    checkIsLoginExpired() {
        if (!this.currentTokenData) return true;
        const currentDate = new Date().getTime();
        return currentDate > this.currentTokenData['expires_on'] - 1000;
    },

    waitForLogin() {
        return new Promise((resolve, reject) => {
            const onSuccess = () => {
                this.loginEmitter.removeEventListener(successLoginEvent.type, onSuccess);
                resolve();
            };
            const onFail = () => {
                this.loginEmitter.removeEventListener(failLoginEvent.type, onFail);
                reject();
            };
            this.loginEmitter.addEventListener(successLoginEvent.type, onSuccess);
            this.loginEmitter.addEventListener(failLoginEvent.type, onFail);
        });
    },

    async getFetch(params) {
        const method = params.method;
        const body = params.body;
        const baseurl = FIELD_CLIMATE_API.fieldClimateUrl;
        const timestamp = new Date().toUTCString();

        if (this.checkIsLoginExpired()) {
            if (this.isRefreshing) {
                await this.waitForLogin();
            } else {
                await this.login();
            }
        }

        const url = baseurl + params.request;
        const parameters = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this.currentTokenData['access_token']}`,
                'Request-Date': timestamp
            },
            method,
            body
        };

        return await fetch(url, parameters)
            .then((data) => {
                return data.json();
            })
            .then((resp) => {
                return resp;
            })
            .catch((error) => console.log(error));
    },
    getStations() {
        let params = {
            method: 'GET',
            request: '/user/stations'
        };
        return fieldClimateAPI.getFetch(params);
    },
    getForecast(stationId = '00001F76', firstDate = 1666937600, secondDate = 1668103813, intervalTimeUnit = 'daily') {
        let params = {
            method: 'POST',
            request: FIELD_CLIMATE_API.forecastUrl + stationId + '/' + intervalTimeUnit + '/from/' + firstDate + '/to/' + secondDate
        };
        return fieldClimateAPI.getFetch(params);
    },
    getCalculationTemperature(
        stationId = '00001F76',
        type = 'temp',
        ch = 22,
        date_from = '1640995200',
        date_to = '1668124740',
        tmin = 10,
        tmax = 24
    ) {
        let params = {
            method: 'POST',
            request: FIELD_CLIMATE_API.calculationUrl + stationId,
            body: JSON.stringify({ type: type, ch: ch, date_from: date_from, date_to: date_to, tmin: tmin, tmax: tmax })
        };
        return fieldClimateAPI.getFetch(params);
    },
    getCalculationRain(stationId = '00001F76', ch = 5, date_from = '1640995200', date_to = '1668124740') {
        let params = {
            method: 'POST',
            request: FIELD_CLIMATE_API.calculationUrl + stationId + '/rain',
            body: JSON.stringify({ type: 'rain', ch: ch, date_from: date_from, date_to: date_to })
        };
        return fieldClimateAPI.getFetch(params);
    },
    setRainData(stationId = '00001F76', editData = [{ dt: '2022-12-05 08:00:00', c: 6, ch: 5, v: 0 }]) {
        let params = {
            method: 'POST',
            request: '/station/' + stationId + '/rain',
            body: JSON.stringify(editData)
        };
        return fieldClimateAPI.getFetch(params);
    },
    getLastParams(stationId = '00001F76') {
        let params = {
            method: 'GET',
            request: '/data/' + stationId + '/hourly/last/1'
        };
        return fieldClimateAPI.getFetch(params);
    }
};

export default fieldClimateAPI;
