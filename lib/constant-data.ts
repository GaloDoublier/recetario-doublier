import { Recipe, Author, Maestro } from "./types";

export const author: Author = {
  name: "Galo Doublier",
  bio: `¡Hola! Soy Galo Doublier, una apasionada de la cocina casera que apenas está aprendiendo los secretos del buen comer. 

**Aviso importante:** No soy chef profesional ni tengo formación culinaria formal. Simplemente soy una persona curiosa que disfruta experimentando en la cocina, a veces con éxito y otras... bueno, ¡aprendemos de los errores!

Este rincón digital es donde comparto mis aventuras culinarias, las recetas que me han funcionado (después de varios intentos), y los trucos que voy descubriendo en el camino. Mi filosofía es simple: la cocina debe ser divertida, accesible y sin pretensiones.

Si estás buscando recetas complicadas de alta cocina, este no es tu lugar. Pero si quieres acompañarme en este viaje de descubrimiento gastronómico, ¡bienvenido a Mi Cocina!`,
  photos: [
    "/cocinero/cocinero1.jpg",
    "/cocinero/cocinero2.jpg",
    "/cocinero/cocinero3.jpg",
  ],
};

export const maestros: Maestro[] = [
  {
    name: "Monica",
    description: "Mi primera maestra en la cocina. Me enseñó que la paciencia es el ingrediente más importante y que no hay prisa cuando cocinas con amor.",
    imageUrl: "/maestros/monica.jpg",
  },
  {
    name: "Lidia",
    description: "La reina de los postres. Gracias a ella aprendí que la repostería es una ciencia exacta donde cada gramo cuenta.",
    imageUrl: "/maestros/lidia.jpg",
  },
  {
    name: "Noemi",
    description: "Experta en sabores tradicionales. Me transmitió las recetas de su abuela y el valor de preservar la cocina de toda la vida.",
    imageUrl: "/maestros/noemi.jpg",
  },
];

