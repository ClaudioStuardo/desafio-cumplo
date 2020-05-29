const basePath = "https://api.sbif.cl/api-sbifv3/recursos_api/";
const apiKey = "9c84db4d447c80c74961a72245371245cb7ac15f";
const apiFormat = "json";
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

export function getDolarApi(fromYear, fromMonth, fromDay, toYear, toMonth, toDay) {
    const url = `${basePath}dolar/periodo/${fromYear}/${fromMonth}/dias_i/${fromDay}/${toYear}/${toMonth}/dias_f/${toDay}?apikey=${apiKey}&formato=${apiFormat}`;

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(proxyUrl + url, params)
        .then(resp => {
            return resp.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
}