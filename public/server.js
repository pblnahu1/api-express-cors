
/**
 * @description Servidor Express que sirve archivos estáticos, habilita CORS y redirije las solicitudes de la ruta "/names.json" a una API remota. También habilita CORS para todas las solicitudes.
 * @param {string} apiUrl
 * @author Pablo Torrez
*/


// Paquete Express, Cors y Middleware
// npm install express cors / pnpm i express cors
// npm install http-proxy-middleware / pnpm i http-proxy-middleware


const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')
// import express from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';
// import cors from 'cors';


const app = express(); // Creo una instancia de la aplicación Express
const PORT = 3000; // Defino el puerto donde se ejecutará el servidor

app.use(cors()); // Habilito CORS usando el middleware `cors()`

// Configuro Express para servir archivos estáticos
//app.use(express.static('public'));

// Agrego Middleware de Proxy para redirigir las solicitudes de "/names.json" a la API remota "http://country.io"
app.use('/names.json', createProxyMiddleware({ target: 'http://country.io', changeOrigin: true }));

// Habilito CORS para todas las solicitudes
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // '*' por el origen específico
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});*/

// Para evitar la redundancia -> si quiero editar las cabeceras, solo paso un objeto de configuración a `cors()`
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

// Inicio el Servidor en el puerto 3000
app.listen(PORT, () => {
    if (app && typeof app.listen === "function") {
        console.log(`Servidor Express en ejecución en http://localhost:${PORT}`);
    } else {
        console.error("Error: No se puede iniciar el servidor Express. Revise la variable `app`.");
    }
});


