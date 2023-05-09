
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
    

    contenido(array)
    
};



function contenido (array) {
    const frag = document.createDocumentFragment();
    const domDiv = document.querySelector('.mini-cards-conteiners');
    let icono = array.days[1].icon;
    const cardConteiner = document.createElement('article');
    const detalles = document.createElement('div');


    const home = document.createElement('div');
    home.classList.add('home');
    home.innerHTML = `<div class="home-title">
                            <h2>📍🌍 ${array.city} (${array.country})</h2>
                    </div>
                        <main class="principal">
                            <div>
                                <img src=${`https://v5i.tutiempo.net/wi/01/40/${icono}.png`}>
                            </div>
                            <div>
                                <span>Max ${array.days[1].temperature_max}Cº</span>
                                <span>Min ${array.days[1].temperature_min}Cº</span>
                                <span>${array.days[1].text}</span>
                                <span>Hd ${array.days[1].humidity}%</span>
                                <span>${array.days[1].wind} km/h ${array.days[1].wind_direction}</span>    
                            </div>
                        </main>
                    <div><h2>Pronóstico par los proximos 6 días</h2></div>
        `;

        detalles.innerHTML = '';

    for (let i = 1; i <= 6; i++) {
        
        const card = document.createElement('div');
        card.classList.add('card')
        const detallesConteiner = document.createElement('section'); 
        detallesConteiner.classList.add('detallesConteiner');
        

        detallesConteiner.appendChild(detalles);
        domDiv.appendChild(detallesConteiner);


        cardConteiner.classList.add('conteinerCards')
        card.innerHTML = `
            <h3><strong>${array.days[i].date}</strong></h3>
            <span>Max ${array.days[i].temperature_max}Cº</span>
            <span>Min ${array.days[i].temperature_min}Cº</span>
        `;
        cardConteiner.appendChild(card);

        card.addEventListener('click', ()=> {  
            detalles.classList.add('detalles');
            

            detalles.innerHTML = `
            <span><strong>${array.days[i].date}</strong></span>
            <span>${array.days[i].text}</span>
            <img src=${`https://v5i.tutiempo.net/wi/01/40/${array.days[i].icon}.png`}>
            <span>Max ${array.days[i].temperature_max}Cº</span>
            <span>Min ${array.days[i].temperature_min}Cº</span>
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

function toggleDark (e) {
    let btnModDark = document.querySelector('.btnDark');
    const dataDark = document.querySelectorAll('[data-dark]');
        if (e.target.matches('.btnDark')) {
            if (btnModDark.textContent === '🌚') {
                btnModDark.textContent = '🌞'
                dataDark.forEach(el => {
                    el.classList.add('togleDark');
                });
            } else {
                btnModDark.textContent = '🌚'
                dataDark.forEach(el => {
                    el.classList.remove('togleDark');
                });
            }
        }
}

function modoOscuro () {
    document.addEventListener('click', (e)=> {
        toggleDark(e);
    })
};


document.addEventListener('DOMContentLoaded', ()=> {
    localizacion();
    modoOscuro();
});

