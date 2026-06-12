import ProductCard from "./ProductCard";

function ProductList() {

  const productos = [

    {
      nombre: "Camiseta Básica",
      precio: "50000",
      imagen:
        "https://png.pngtree.com/png-vector/20240815/ourmid/pngtree-classic-white-t-shirt-perfect-for-custom-printing-with-a-blank-png-image_13485404.png"
    },

    {
      nombre: "Pantalón",
      precio: "80000",
      imagen:
        "https://freestorecol.com/cdn/shop/files/pantalon-basico-granada-bolsillos-azul.png?v=1729968193&width=1080"
    }

  ];

  return (

    <section className="productos">

      {productos.map((producto, index) => (

        <ProductCard
          key={index}
          nombre={producto.nombre}
          precio={producto.precio}
          imagen={producto.imagen}
        />

      ))}

    </section>
  );
}

export default ProductList;