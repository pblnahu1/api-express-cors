
/**
 * @description Solicitud a la API remota, manejo promesas, ordena alfabéticamente los datos y los muestra en una lista. La función se relaciona gracias al localhost, lógica implementada en `server.js`-
 * @function listCountryAPI con Promesasy Fetch API
 * @param {string} apiUrl
 * @author Pablo Torrez
*/

// 🤯 Solucionar este error de bloqueo por CORS: SOLUCIONADO ⭐
const listCountryAPI = () => {
    const d = document
    const selector = d.getElementById("list-country");
    const apiUrl = 'http://localhost:3000/names.json'; // http://country.io/names.json

    // Hacer una solicitud a la API: {mode:'cors'} especifica el modo de la solicitud
    fetch(apiUrl, { mode: 'cors' })
        // .then(response => (response.ok ? response.json() : Promise.reject(`HTTP error! Status: ${response.status}`)))
        // Verifico si la respuesta es exitosa, sino lanza un error
        .then(response => {
            console.log(response);
            if (!response) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de la API Country: ', data);

            const countryCodes = Object.keys(data).sort(); // Agarro las claves de los datos y ordeno alfabéticamente

            // Iterar sobre los datos de la API y agregar a la lista 
            if (countryCodes) {
                countryCodes.forEach(countryCode => { // for (const countryCode in data)
                    if (data.hasOwnProperty(countryCode)) { // si `data` tiene la propiedad especificada según `countryCode`
                        const countryName = data[countryCode]; // accedo a la propiedad existente del objeto.
                        let newElementOption = d.createElement("option");
                        newElementOption.value = countryCode;
                        newElementOption.textContent = countryName;
                        selector.appendChild(newElementOption);
                    } else {
                        console.warn("Error: Se esperaba una respuesta de parte la API para agregar los datos a las etiquetas 'option'.");
                    }
                });
            } else {
                console.warn("Ocurrió un error al ordenar alfabéticamente.");
            }

        })
        .catch(error => console.error('Error al realizar la solicitud a la API...', error));
}


listCountryAPI()  