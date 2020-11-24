import { getData } from './main.js';

/**
 * Sua chave/id deve ser colocoda aqui
**/
const apiKey = 'Sua chave aqui!';

const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=';


async function getApi(url, key) {
    await fetch(`${url}${key}&start=1&limit=20`)
        .then((response) => {
            if(!response.ok) {
                throw new Error(`Erro ao executar a requisição, status: ${response.status}`);
            }
            return response.json();
        })
        .then((api) => {
            getData(api.data);
        })
        .catch((error) => {
            return error.message;
        });
} 

getApi(url, apiKey);
