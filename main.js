
const apiKey = 'Dgjl3Oz1oSH7vhdm'



function localizacion () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            solicit(lat, lon)
        });
    };
}

async function solicit (lat, lon) {

    const api = `https://my.meteoblue.com/packages/current_basic-day_webcolors?apikey=${apiKey}&lat=${lat}&lon=${lon}`;

    try {
        const respuesta = await fetch(api);
        const data = await respuesta.json();
        
        ui(data);
    } catch (error) {
        console.log(error);
    }
}

function ui (data) {
    const array = [];
    array.push({
        name: data.metadata.name,
        dayTime: data.data_current.time,
        temperatura: data.data_current.temperature,
        temperaturaColor: data.data_current.temperature_color,
        dias: data.data_day.time,
        viento:data.data_current.windspeed,
        velozVientoMin: data.data_day.windspeed_min,
        velozVientoMax: data.data_day.windspeed_max,
        temperaturaMaxdays: data.data_day.temperature_max,
        temperaturaMindays: data.data_day.temperature_min,
        humedadMax: data.data_day.relativehumidity_max,
        humedadMin: data.data_day.relativehumidity_min,
        predicipitaciones: data.data_day.precipitation_probability
    });

    console.log(array.dias)
    /*miniCards(array);*/
};


/*function miniCards (array) {
    console.log(array.dias)    
};*/

document.addEventListener('DOMContentLoaded', ()=> {
    localizacion();
});