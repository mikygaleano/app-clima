
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
    
    const domDiv = document.querySelector('.mini-cards-conteiners');
    
    for (let i = 0; i <= 6; i++) {
        let icono = array.days[i].icon;

        

        console.log(array)
        const cards = document.createElement('div');
        cards.classList.add('conteinerCards')
        cards.innerHTML = `
            <span><strong>${array.days[i].date}</strong></span>
            <span>${array.days[i].text}</span>
            <img src=${`https://v5i.tutiempo.net/wi/01/40/${icono}.png`}>
        `;
        domDiv.appendChild(cards);

        cards.addEventListener('click', ()=> {
                
            domDiv.innerHTML = '';
            const detalles = document.createElement('div');
            detalles.classList.add('detalles')
            detalles.innerHTML = `
            <span><strong>${array.days[i].date}</strong></span>
            <span>${array.days[i].text}</span>
            <img src=${`https://v5i.tutiempo.net/wi/01/40/${icono}.png`}>
            <span>Max ${array.days[i].temperature_max}ºC</span>
            <span>Min ${array.days[i].temperature_min}ºC</span>
            <span>Hd ${array.days[i].humidity}%</span>
            <span>Viento ${array.days[i].wind} km/h con dirección ${array.days[i].wind_direction}</span>
            `;
            domDiv.appendChild(detalles);
        })

    };
};

document.addEventListener('DOMContentLoaded', ()=> {
    localizacion();
});