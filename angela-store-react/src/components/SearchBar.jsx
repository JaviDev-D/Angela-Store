function searchBar() {
    const buscar = () => {
        const texto = 
            document.getElementById("Buscador").value;
        
        if (texto.trim() === "") {
            alert("Debe ingresar un producto para realizar la búsqueda.");
            return;
        }
        alert("Busqueda realizada correctamente.");
    };

    return (
        <div className="Busqueda">
            <input
            type="text"
            id="Buscador"
            placeholder="Buscar producto..."
            />

        
            <button onClick={buscar}>Buscar</button>
        </div>
    );
}

export default searchBar;

 