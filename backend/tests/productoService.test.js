/**
 * Pruebas unitarias del módulo "producto" - capa de servicio.
 * Se mockea el repositorio para que las pruebas NO dependan de
 * una base de datos real: así son rápidas, repetibles y aisladas
 * (verdadera prueba unitaria del módulo de negocio).
 */
jest.mock("../src/repositories/productoRepository");
const productoRepository = require("../src/repositories/productoRepository");
const productoService = require("../src/services/productoService");

describe("productoService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("listarProductos", () => {
        it("devuelve la lista de productos del repositorio", async () => {
            const productosFalsos = [{ id: 1, nombre: "Camiseta" }];
            productoRepository.obtenerTodos.mockResolvedValue(productosFalsos);

            const resultado = await productoService.listarProductos();

            expect(resultado).toEqual(productosFalsos);
            expect(productoRepository.obtenerTodos).toHaveBeenCalledTimes(1);
        });
    });

    describe("crearProducto", () => {
        it("crea un producto cuando los datos son válidos", async () => {
            const datos = { nombre: "Camiseta", talla: "M", color: "Rojo", precio: 50000 };
            productoRepository.crear.mockResolvedValue({ id: 1, ...datos });

            const resultado = await productoService.crearProducto(datos);

            expect(resultado.id).toBe(1);
            expect(productoRepository.crear).toHaveBeenCalledWith(datos);
        });

        it("rechaza un producto sin nombre", async () => {
            const datos = { talla: "M", color: "Rojo", precio: 50000 };

            await expect(productoService.crearProducto(datos)).rejects.toThrow(
                productoService.ErrorDeValidacion
            );
            expect(productoRepository.crear).not.toHaveBeenCalled();
        });

        it("rechaza un producto con precio negativo o cero", async () => {
            const datos = { nombre: "Camiseta", talla: "M", color: "Rojo", precio: 0 };

            await expect(productoService.crearProducto(datos)).rejects.toThrow(
                productoService.ErrorDeValidacion
            );
        });

        it("rechaza un producto con precio no numérico", async () => {
            const datos = { nombre: "Camiseta", talla: "M", color: "Rojo", precio: "gratis" };

            await expect(productoService.crearProducto(datos)).rejects.toThrow(
                productoService.ErrorDeValidacion
            );
        });
    });

    describe("obtenerProducto", () => {
        it("lanza ErrorNoEncontrado si el producto no existe", async () => {
            productoRepository.obtenerPorId.mockResolvedValue(null);

            await expect(productoService.obtenerProducto(999)).rejects.toThrow(
                productoService.ErrorNoEncontrado
            );
        });

        it("retorna el producto si existe", async () => {
            const producto = { id: 1, nombre: "Camiseta" };
            productoRepository.obtenerPorId.mockResolvedValue(producto);

            const resultado = await productoService.obtenerProducto(1);

            expect(resultado).toEqual(producto);
        });
    });

    describe("actualizarProducto", () => {
        it("actualiza un producto existente con datos válidos", async () => {
            productoRepository.obtenerPorId.mockResolvedValue({ id: 1, nombre: "Camiseta" });
            productoRepository.actualizar.mockResolvedValue({ id: 1, nombre: "Camiseta Nueva" });

            const resultado = await productoService.actualizarProducto(1, { nombre: "Camiseta Nueva" });

            expect(resultado.nombre).toBe("Camiseta Nueva");
        });

        it("lanza error si el producto a actualizar no existe", async () => {
            productoRepository.obtenerPorId.mockResolvedValue(null);

            await expect(
                productoService.actualizarProducto(999, { nombre: "X" })
            ).rejects.toThrow(productoService.ErrorNoEncontrado);
        });
    });

    describe("eliminarProducto", () => {
        it("elimina un producto existente", async () => {
            productoRepository.obtenerPorId.mockResolvedValue({ id: 1 });
            productoRepository.eliminar.mockResolvedValue(true);

            const resultado = await productoService.eliminarProducto(1);

            expect(resultado).toBe(true);
        });

        it("lanza error si el producto a eliminar no existe", async () => {
            productoRepository.obtenerPorId.mockResolvedValue(null);

            await expect(productoService.eliminarProducto(999)).rejects.toThrow(
                productoService.ErrorNoEncontrado
            );
        });
    });
});
