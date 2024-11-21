import {code as countryCodes} from './code.js';

let inputAmt = document.querySelector('.input input');
let selectCountry = document.querySelectorAll('select');
let btn = document.querySelector('.btn');
let fromValue = 'USD';
let toValue = 'INR';
let result = document.querySelector('.rate');


for (let select of selectCountry){
    
    for (let countryCode in countryCodes){
        let newOption = document.createElement('option')
        newOption.value = countryCode;
        newOption.text = countryCode;
        // let newOption = `<option value="${countryCode}">USD</option>`

        if (select.name === 'from' && countryCode === 'USD'){
            newOption.selected = true;
        }
        if (select.name === 'to' && countryCode === 'INR'){
            newOption.selected = true;
        }
        select.appendChild(newOption);

        
    }

    select.addEventListener('change', (event)=>{
        let value = select.value;
        if (select.name === 'from'){
            fromValue = value;
        }
        else toValue = value;
        let newImg = `https://flagsapi.com/${countryCodes[value]}/flat/64.png`;
        let parent = event.target.parentElement;
        parent.querySelector('img').src = newImg;        
    })
}

inputAmt.addEventListener('keydown', (event) =>{
    if (event.key === 'Enter') cal();
})
btn.addEventListener('click', cal);

async function cal(){
    let URL = `https://v6.exchangerate-api.com/v6/04466627f449994ece12e583/latest/${fromValue}`;
    let promise = await fetch(URL);
    
    let data = await promise.json();
    
    let conversionResult = data.conversion_rates[toValue];
    let amt = inputAmt.value;
    
    let exchangeResult = (conversionResult * amt).toFixed(3);

    result.innerHTML = `${amt} ${fromValue} = ${exchangeResult} ${toValue}`;
}