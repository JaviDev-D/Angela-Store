function ProductCard({
    nombre,
    precio,
    imagen
}) {
    return (
        <div className="card">
            <img src={imagen} alt={nombre} />
            <h3>{nombre}</h3>
            <p>${precio}</p>
            <button>+ </button>
        </div>
    );
}

export default ProductCard;