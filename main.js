
const apiKey = 'XCTazzX44qXgvMm';


class datos {
    constructor(country,city,days) 
        {
        this.country = country;
        this.city = city;
        this.days = days;
        }
};

function localizacion () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let ll = position.coords.latitude +','+ position.coords.longitude;
            solicit(ll)
        });
    };
}

async function solicit (ll) {

    const api = `https://api.tutiempo.net/json/?lan=es&apid=${apiKey}&ll=${ll}`;

    try {
        const respuesta = await fetch(api);
        const data = await respuesta.json();
        /*console.log(data)*/
        info(data);
    } catch (error) {
        console.log(error);
    }
};



function info (data) {
    let array = new datos(
        data.locality.country,
        data.locality.name,
        [data.day1, data.day2, data.day3, data.day4, data.day5, data.day6, data.day7],
    );
    

    cards(array)
    
};



function cards (array) {
    const frag = document.createDocumentFragment();
    const domDiv = document.querySelector('.mini-cards-conteiners');
    let icono = array.days[1].icon;
    const cardConteiner = document.createElement('article');
    const detalles = document.createElement('div');


    const home = document.createElement('div');
    home.classList.add('home');
    home.innerHTML = `<div class="home-title">
            <h1>📍🌍 ${array.city} (${array.country})</h1>
        </div>
        <main class="principal">
            <div>
                <img src=${`https://v5i.tutiempo.net/wi/01/40/${icono}.png`}>
            </div>
            <div>
                <span>Max ${array.days[1].temperature_max}ºC</span>
                <span>Min ${array.days[1].temperature_min}ºC</span>
                <span>${array.days[1].text}</span>
            </div>
        </main>
        <div><h2>Pronóstico par los proximos 7 días</h2></div>
        `;

        detalles.innerHTML = '';

    for (let i = 0; i <= 6; i++) {
        
        icono = array.days[i].icon;
        const card = document.createElement('div');
        const detallesConteiner = document.createElement('section'); 
        

        detallesConteiner.appendChild(detalles);
        domDiv.appendChild(detallesConteiner);


        console.log(array)
        cardConteiner.classList.add('conteinerCards')
        card.innerHTML = `
            <h3><strong>${array.days[i].date}</strong></h3>
            <span>Max ${array.days[i].temperature_max}ºC</span>
            <span>Min ${array.days[i].temperature_min}ºC</span>
        `;
        cardConteiner.appendChild(card);

        card.addEventListener('click', ()=> {  
            detalles.classList.add('detalles');

            detalles.innerHTML = `
            <span><strong>${array.days[i].date}</strong></span>
            <span>${array.days[i].text}</span>
            <img src=${`https://v5i.tutiempo.net/wi/01/40/${icono}.png`}>
            <span>Max ${array.days[i].temperature_max}ºC</span>
            <span>Min ${array.days[i].temperature_min}ºC</span>
            <span>Hd ${array.days[i].humidity}%</span>
            <span>Viento ${array.days[i].wind} km/h con dirección ${array.days[i].wind_direction}</span>
            `;
            detallesConteiner.appendChild(detalles);
            domDiv.appendChild(detallesConteiner);
        })
    };
    frag.append(home, cardConteiner);

    domDiv.append(frag);
};

document.addEventListener('DOMContentLoaded', ()=> {
    localizacion();
});