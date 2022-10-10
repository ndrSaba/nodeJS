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