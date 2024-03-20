const openmeteoAPI = {
    async getFetch(params) {
        const method = params.method;
        const body = params.body;
        const url = params.request;
        const parameters = {
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
    getForecastDataForChemicalTreatments(coordinates) {
        console.log(coordinates);
        let params = {
            method: 'GET',
            request: `https://api.open-meteo.com/v1/forecast?latitude=${coordinates[1]}&longitude=${coordinates[0]}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,precipitation_probability,precipitation,weathercode,windspeed_10m,windgusts_10m&models=best_match&current_weather=true&windspeed_unit=ms&forecast_days=4&timezone=auto`
        };
        return openmeteoAPI.getFetch(params);
    }
};

export default openmeteoAPI;
