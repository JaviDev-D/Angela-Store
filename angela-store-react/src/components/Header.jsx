function Header() {
    return (
        <header>
            <h1>Angela Store</h1>

            <nav>
                <ul> 
                    <li><a href="#">Inicio</a></li>
                    <li><a href='#'>Productos</a></li>
                </ul>
            </nav>

            <div className="acciones">
                <span>🛒</span>
                <span>👤</span>  
            </div>
        </header>
    );
}

export default Header;
