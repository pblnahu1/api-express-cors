function mostrarDatosAPI() {
    const apiUrl = "http://country.io/names.json";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Datos de la API Country: ", data);
        })
        .catch(error => console.error("No ha sido posible obtener los datos de la API Country: ", error));
}

mostrarDatosAPI();
