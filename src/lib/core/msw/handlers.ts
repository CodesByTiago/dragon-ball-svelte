import { http, HttpResponse } from "msw";

const goku = {
  id: 1,
  name: "Goku",
  ki: "60.000.000",
  maxKi: "90 Septillion",
  race: "Saiyan",
  gender: "Male",
  description: "A Saiyan hero.",
  image: "https://dragonball-api.com/characters/goku_normal.webp",
  affiliation: "Z Fighter",
  deletedAt: null,
};

const vegeta = {
  id: 2,
  name: "Vegeta",
  ki: "54.000.000",
  maxKi: "19.84 Septillion",
  race: "Saiyan",
  gender: "Male",
  description: "Prince of all Saiyans.",
  image: "https://dragonball-api.com/characters/vegeta_normal.webp",
  affiliation: "Z Fighter",
  deletedAt: null,
};

export const handlers = [
  http.get("https://dragonball-api.com/api/characters", ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name");

    if (name) {
      const characters = [goku, vegeta].filter((character) =>
        character.name.toLowerCase().includes(name.toLowerCase()),
      );
      return HttpResponse.json(characters);
    }

    return HttpResponse.json({
      items: [goku, vegeta],
      meta: {
        totalItems: 2,
        itemCount: 2,
        itemsPerPage: 12,
        totalPages: 1,
        currentPage: Number(url.searchParams.get("page") ?? 1),
      },
      links: {
        first: "https://dragonball-api.com/api/characters?page=1&limit=12",
        previous: "",
        next: "",
        last: "https://dragonball-api.com/api/characters?page=1&limit=12",
      },
    });
  }),
  http.get("https://dragonball-api.com/api/characters/:id", ({ params }) => {
    if (params.id !== "1" && params.id !== "2") {
      return HttpResponse.json({ message: "Character not found" }, { status: 404 });
    }

    const character = params.id === "1" ? goku : vegeta;
    return HttpResponse.json({
      ...character,
      originPlanet: {
        id: 2,
        name: "Earth",
        isDestroyed: false,
        description: "Home of the Z Fighters.",
        image: "https://dragonball-api.com/planetas/Tierra_Dragon_Ball_Z.webp",
        deletedAt: null,
      },
      transformations:
        params.id === "1"
          ? [
              {
                id: 1,
                name: "Super Saiyan",
                image: "https://dragonball-api.com/transformations/goku_ssj.webp",
                ki: "3.000.000",
              },
            ]
          : [],
    });
  }),
];
