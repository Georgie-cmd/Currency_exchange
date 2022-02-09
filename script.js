const delay = ms => new Promise(r => setTimeout(() => r(), ms))

//objects
const wallets = {
    all: 'https://www.nbrb.by/api/exrates/rates?periodicity=0',
    usd: 'https://www.nbrb.by/api/exrates/rates/431',
    eur: 'https://www.nbrb.by/api/exrates/rates/451'
}

const rates = {}


//wallets
const elementUSD = document.querySelector('[data-value="USD"]')
const elementEUR = document.querySelector('[data-value="EUR"]')


//async operations
async function getWallet() {
    console.log('Checking out...')

    await delay(1000)
    const response = await fetch(wallets.all)
    const data = await response.json()
    //console.log('Here is all wallets:', data)


    await delay(1000)
    //USD
    const reqUSD = await fetch(wallets.usd)
    const resUSD = await reqUSD.json()
    rates.USD = resUSD

    //EUR
    const reqEUR = await fetch(wallets.eur)
    const resEUR = await reqEUR.json()
    rates.EUR = resEUR

    console.log(rates)


    elementUSD.textContent = rates.USD.Cur_OfficialRate.toFixed(2)  
    elementEUR.textContent = rates.EUR.Cur_OfficialRate.toFixed(2)  

    /* TOP or BOTTOm */
    //USD
    if(rates.USD.Cur_OfficialRate > rates.USD.Previous) {
        elementUSD.classList.add('top')
        elementUSD.classList.remove('bottom')
    } else {
        elementUSD.classList.add('bottom')
        elementUSD.classList.remove('top')
    }

    //EUR
    if(rates.EUR.Cur_OfficialRate > rates.EUR.Previous) {
        elementEUR.classList.add('top')
        elementEUR.classList.remove('bottom')
    } else {
        elementEUR.classList.add('bottom')
        elementEUR.classList.remove('top')
    }
}

getWallet()
setInterval(getWallet, 10000000)


//Calculating
const input = document.querySelector('#input')
const result = document.querySelector('#result')
const select = document.querySelector('#select')


input.oninput = convertValue

select.oninput = convertValue

result.oninput = convertByResult


function convertValue() {
    result.value = (parseFloat(input.value) / rates[select.value].Cur_OfficialRate).toFixed(2)
}

function convertByResult() {
    input.value = (parseFloat(result.value) * rates[select.value].Cur_OfficialRate).toFixed(2)
}
