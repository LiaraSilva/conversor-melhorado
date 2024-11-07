const apiKey = '5a0fb254ec789e44eadc9688';
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Função para buscar taxa de câmbio via API
async function getExchangeRate(daMoeda, paraMoeda){
    try{
        const response = await fetch(`${apiURL}${daMoeda}`);
        const data = await response.json();

        if(data.result === "success"){
            return data.conversion_rates[paraMoeda];
        }else{
            throw new Error('Erro ao buscar as taxas de câmbio');
        }
    }catch(error){
        console.error("Erro:", error);
        return null;
    }
} 
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
document.getElementById('currency-form').addEventListener('submit', async function(event){
    event.preventDefault();
    // obter valores de entrada
    const valor = parseFloat(document.getElementById('amount').value);
    const daMoeda = document.getElementById('from-currency').value;
    const paraMoeda = document.getElementById('to-currency').value;
    // Busca taxa de câmbio da API
    const exchangeRate = await getExchangeRate(daMoeda, paraMoeda);

    if(exchangeRate){
        const converterValue = valor * exchangeRate;
        const conversao = document.getElementById('result');
        conversao.textContent = `Resultado: ${converterValue.toFixed(2)} ${paraMoeda}`;
    }else{
        alert('Não foi possivel buscar a cotação. Tente novamente');
    }

})