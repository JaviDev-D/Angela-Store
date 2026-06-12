let contador = 0;

const botones = document.querySelectorAll(".btn-agregar");
const contadorHTML = document.getElementById("contador");

const btnBuscar = document.getElementById("btnBuscar");
const buscador = document.getElementById("buscador");


botones.forEach(boton => {
    boton.addEventListener("click", () => {
        contador++;
        contadorHTML.textContent = contador;
    });
});

btnBuscar.addEventListener("click", () => {
    if (buscador.value.trim() === "") {

        alert("Debe ingresar un producto para realizar la búsqueda");
        return;
    }
    alert(`Buscando: ${buscador.value}`);
});