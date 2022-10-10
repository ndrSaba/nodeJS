import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock";

const req = supertest(app);

describe("GET /planets", () => {
    test("Valid request", async () => {
        const planets = [
            {
                id: 1,
                name: "Mercury",
                description: null,
                diameter: 1234,
                moons: 12,
                createdAt: "2022-09-13T11:03:03.185Z",
                updatedAt: "2022-09-13T11:03:14.767Z",
            },
            {
                id: 2,
                name: "Venus",
                description: null,
                diameter: 5678,
                moons: 2,
                createdAt: "2022-09-13T11:04:59.928Z",
                updatedAt: "2022-09-13T11:04:24.483Z",
            },
        ];

        // @ts-ignore
        prismaMock.planet.findMany.mockResolvedValue(planets);

        const res = await req
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual(planets);
    });
});

describe("GET /planets/:id", () => {
    test("Valid request", async () => {
        const planet = {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2022-09-13T11:03:03.185Z",
            updatedAt: "2022-09-13T11:03:14.767Z",
        };

        // @ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(planet);

        const res = await req
            .get("/planets/1")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual(planet);
    });

    test("Planet does not exist", async () => {
        // @ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(null);

        const res = await req
            .get("/planets/23")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot GET /planets/23");
    });

    test("Invalid planet ID", async () => {
        const res = await req
            .get("/planets/asdf")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot GET /planets/asdf");
    });
});

describe("POST /planets", () => {
    test("Valid request", async () => {
        const planet = {
            id: 3,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2022-09-15T11:12:58.475Z",
            updatedAt: "2022-09-15T11:12:58.476Z",
        };

        // @ts-ignore
        prismaMock.planet.create.mockResolvedValue(planet);

        const res = await req
            .post("/planets")
            .send({
                name: "Mercury",
                diameter: 1234,
                moons: 12,
            })
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet = {
            diameter: 1234,
            moons: 12,
        };

        const res = await req
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});

describe("PUT /planets/:id", () => {
    test("Valid request", async () => {
        const planet = {
            id: 3,
            name: "Mercury",
            description: "Lovely planet",
            diameter: 1234,
            moons: 12,
            createdAt: "2022-09-15T11:12:58.475Z",
            updatedAt: "2022-09-15T11:12:58.476Z",
        };

        // @ts-ignore
        prismaMock.planet.update.mockResolvedValue(planet);

        const res = await req
            .put("/planets/3")
            .send({
                name: "Mercury",
                description: "Lovely planet",
                diameter: 1234,
                moons: 12,
            })
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet = {
            diameter: 1234,
            moons: 12,
        };

        const res = await req
            .put("/planets/23")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });

    test("Planet does not exist", async () => {
        // @ts-ignore
        prismaMock.planet.update.mockRejectedValue(new Error("Error"));

        const res = await req
            .put("/planets/23")
            .send({
                name: "Mercury",
                description: "Lovely planet",
                diameter: 1234,
                moons: 12,
            })
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot PUT /planets/23");
    });

    test("Invalid planet ID", async () => {
        const res = await req
            .put("/planets/asdf")
            .send({
                name: "Mercury",
                description: "Lovely planet",
                diameter: 1234,
                moons: 12,
            })
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot PUT /planets/asdf");
    });
});

describe("DELETE /planets/:id", () => {
    test("Valid request", async () => {
        const res = await req.delete("/planets/1").expect(204);

        expect(res.text).toEqual("");
    });

    test("Planet does not exist", async () => {
        // @ts-ignore
        prismaMock.planet.delete.mockRejectedValue(new Error("Error"));

        const res = await req
            .delete("/planets/23")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot DELETE /planets/23");
    });

    test("Invalid planet ID", async () => {
        const res = await req
            .delete("/planets/asdf")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot DELETE /planets/asdf");
    });
});
