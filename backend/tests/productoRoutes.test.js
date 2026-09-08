/**
 * Pruebas de integración de los endpoints REST del módulo producto.
 * Se usa supertest sobre la app de Express (sin levantar un puerto)
 * y se mockea el repositorio para no depender de MySQL.
 */
jest.mock("../src/repositories/productoRepository");
const request = require("supertest");
const productoRepository = require("../src/repositories/productoRepository");
const app = require("../src/app");

describe("API /api/productos", () => {
    afterEach(() => jest.clearAllMocks());

    it("GET /api/productos responde 200 con la lista", async () => {
        productoRepository.obtenerTodos.mockResolvedValue([{ id: 1, nombre: "Camiseta" }]);

        const res = await request(app).get("/api/productos");

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
    });

    it("POST /api/productos con datos válidos responde 201", async () => {
        const nuevo = { nombre: "Camiseta", talla: "M", color: "Rojo", precio: 50000 };
        productoRepository.crear.mockResolvedValue({ id: 1, ...nuevo });

        const res = await request(app).post("/api/productos").send(nuevo);

        expect(res.status).toBe(201);
        expect(res.body.id).toBe(1);
    });

    it("POST /api/productos sin nombre responde 400", async () => {
        const res = await request(app)
            .post("/api/productos")
            .send({ talla: "M", color: "Rojo", precio: 50000 });

        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    it("GET /api/productos/:id responde 404 si no existe", async () => {
        productoRepository.obtenerPorId.mockResolvedValue(null);

        const res = await request(app).get("/api/productos/999");

        expect(res.status).toBe(404);
    });

    it("DELETE /api/productos/:id responde 204 si existe", async () => {
        productoRepository.obtenerPorId.mockResolvedValue({ id: 1 });
        productoRepository.eliminar.mockResolvedValue(true);

        const res = await request(app).delete("/api/productos/1");

        expect(res.status).toBe(204);
    });

    it("ruta inexistente responde 404", async () => {
        const res = await request(app).get("/api/no-existe");
        expect(res.status).toBe(404);
    });
});
