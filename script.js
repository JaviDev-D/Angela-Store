let contador = 0;

const botones = document.querySelectorAll(".btn-agregar");
const contadorHTML = document.getElementById("contador");

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        contador++;
        contadorHTML.textContent = contador;
    });
});