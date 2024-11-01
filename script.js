const apiKey = '5a0fb254ec789e44eadc9688';
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

// Função para buscar taxa de câmbio via API
async function getExchangeRate(daMoeda, paraMoeda){
    try{
        const response = await fetch(`${apiURL}${daMoeda}`);
        const data = await response.json();

        if(data.result === "sucesso"){
            return data.conversion_rate[paraMoeda];
        }else{
            throw new Error('Erro ao buscar as taxas de câmbio');
        }
    }catch{

    }
} 