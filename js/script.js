import countries from "/js/data.js";

let elCardsBox = document.querySelector("#cardsBox"); 
let elThemeToggler = document.querySelector(".theme_toggler");
let elFindInput = document.querySelector("#finder");
let elFilterSelect = document.querySelector("#filter");

function UIWrite(array) {
array.forEach(el => {
const {name,population,region,capital,flag} = el;
elCardsBox.innerHTML+=`
<div class="country_card">
<img src="${flag}" alt="" aria-hidden="true">
<div class="card_dec">
<span class="country_title">${name}</span>
<div class="card_dec_details">
<span><b>Population:</b> ${population}</span>
<span><b>Region:</b> ${region}</span>
<span><b>Capital:</b> ${capital}</span>
</div></div></div></div>
`
});
};


UIWrite(countries);


elThemeToggler.addEventListener("click",()=>{
    document.querySelector("html").classList.toggle("dark");
    if(document.querySelector("html").classList=="dark"){
    elThemeToggler.innerHTML=
    `<span class="theme_icon fa fa-sun"></span>
    <span class="theme_text">Light Mode</span>`;
    localStorage.setItem("theme","dark");
    } else {
    elThemeToggler.innerHTML=
    `<span class="theme_icon fa fa-moon"></span>
    <span class="theme_text">Dark Mode</span>`;
    localStorage.setItem("theme","light"); 
    };
});

let theme = localStorage.getItem("theme");

if(theme==="dark") {
    document.querySelector("html").classList.add("dark");
    elThemeToggler.innerHTML=
    `<span class="theme_icon fa fa-sun"></span>
    <span class="theme_text">Light Mode</span>`;
} else {
    document.querySelector("html").classList.remove("dark");
    elThemeToggler.innerHTML=
    `<span class="theme_icon fa fa-moon"></span>
    <span class="theme_text">Dark Mode</span>`;
}

function filter(reg){
    let countriesFiltered = [];
    countries.filter(el=>{
        if(reg.toLowerCase()==el.region.toLowerCase()) countriesFiltered.push(el);
        else return false;
    });
    UIWrite(countriesFiltered);
}

elFilterSelect.addEventListener("change",(evt)=>{
    elCardsBox.innerHTML=null;
    if(evt.target.value=="no") {
        UIWrite(countries);
    } else {
        filter(evt.target.value);
    }
});

function find(val){
    let countriesFiltered = [];
    countries.filter(el=>{
        if(el.name.toLowerCase().includes(val.trim().toLowerCase())==true||el.capital.toLowerCase().includes(val.trim().toLowerCase())==true) countriesFiltered.push(el);
        else {    
        return false;
        }; 
    });
    UIWrite(countriesFiltered);
};

elFindInput.addEventListener("input",(evt)=>{
    elCardsBox.innerHTML=null;
    find(evt.target.value);
});