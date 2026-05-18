import { Recipe, Author, Maestro } from "./types";

export const author: Author = {
  name: "Galo Doublier",
  bio: `Soy un aficionado de la cocina casera en constante aprendizaje.

**Aviso importante:** No soy chef profesional ni tengo formación culinaria formal (todavia, quién sabe). Simplemente soy una persona curiosa que disfruta experimentando en la cocina, a veces sale bien y otras veces la cago, pero siempre aprendo algo.

Esta página es donde comparto mis experiencias culinarias, las recetas que me funcionaron y los trucos que voy descubriendo en el camino. Mi filosofía es simple: si te gusta comer, te puede gustar cocinar, por ende cualquiera puede cocinar.

Si estás buscando recetas complicadas de alta cocina, este **no es el lugar**. Pero si queres chusmear un par de recetas amateur y aprender conmigo, bienvenido sea!`,
  photos: [
    "/galo-cocinero/cocinero1.jpg",
    "/galo-cocinero/cocinero2.jpg",
    "/galo-cocinero/cocinero3.jpg",
  ],
};

export const maestros: Maestro[] = [
  {
    name: "Monica Huarte",
    description: "Mi madre... que decir, mi primera maestra en la cocina y en la vida. Me ayudo a dar mis primeros pasos y me enseñó a transmitir el amor a través de la comida. Experta en generar platos con cualquier tipo de ingredientes que haya.",
    imageUrl: "/maestros/monica.jpg",
  },
  {
    name: "Lidia Mejuto Huarte",
    description: "Mi abuela Lidia, la maestra del ojimetro , de pesar y medir las cosas con la palma de la mano. De ella aprendí la importacia de los condimentos y de improvisar para darle toques unicos a los platos.",
    imageUrl: "/maestros/lidia.jpg",
  },
  {
    name: "Noemí doublier",
    description: "Mi abuela Mimi, mejor conocida como Lali, la maestra de lo exacto. Experta en seguir el paso a paso, de ella aprendí que la precisión es también fundamental para los buenos platos.",
    imageUrl: "/maestros/noemi.jpg",
  },
];

