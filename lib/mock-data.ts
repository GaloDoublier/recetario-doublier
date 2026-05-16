import { Recipe, Author, Maestro } from "./types";

export const author: Author = {
  name: "Carmen",
  bio: `¡Hola! Soy Carmen, una apasionada de la cocina casera que apenas está aprendiendo los secretos del buen comer. 

**Aviso importante:** No soy chef profesional ni tengo formación culinaria formal. Simplemente soy una persona curiosa que disfruta experimentando en la cocina, a veces con éxito y otras... bueno, ¡aprendemos de los errores!

Este rincón digital es donde comparto mis aventuras culinarias, las recetas que me han funcionado (después de varios intentos), y los trucos que voy descubriendo en el camino. Mi filosofía es simple: la cocina debe ser divertida, accesible y sin pretensiones.

Si estás buscando recetas complicadas de alta cocina, este no es tu lugar. Pero si quieres acompañarme en este viaje de descubrimiento gastronómico, ¡bienvenido a Mi Cocina!`,
  photos: [
    "/placeholder-author-1.jpg",
    "/placeholder-author-2.jpg",
    "/placeholder-author-3.jpg",
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

export const recipes: Recipe[] = [
  {
    id: "1",
    slug: "tortilla-espanola-clasica",
    title: "Tortilla Española Clásica",
    description:
      "La receta que mi abuela me enseñó, con ese punto jugoso perfecto que tanto cuesta conseguir.",
    difficulty: "Media",
    ricor: 5,
    prepTime: "20 min",
    cookTime: "25 min",
    totalTime: 45,
    ingredients: [
      "6 huevos grandes",
      "4 patatas medianas",
      "1 cebolla grande (opcional pero recomendada)",
      "Aceite de oliva virgen extra",
      "Sal al gusto",
    ],
    steps: [
      "Pela y corta las patatas en rodajas finas. Si usas cebolla, córtala en juliana.",
      "Calienta abundante aceite de oliva en una sartén y fríe las patatas a fuego medio-bajo hasta que estén tiernas pero sin dorarse demasiado.",
      "Bate los huevos en un bol grande con sal. Añade las patatas escurridas y mezcla bien.",
      "En una sartén con un poco de aceite, vierte la mezcla y cocina a fuego bajo. Cuando cuaje por debajo, dale la vuelta con ayuda de un plato.",
      "Termina de cuajar por el otro lado, dejando el centro ligeramente jugoso si te gusta así.",
    ],
    content: `## Ingredientes

- 6 huevos grandes
- 4 patatas medianas
- 1 cebolla grande (opcional pero recomendada)
- Aceite de oliva virgen extra
- Sal al gusto

## Preparación

### Paso 1: Preparar las patatas
Pela y corta las patatas en rodajas finas. Si usas cebolla, córtala en juliana. Este paso es crucial para conseguir esa textura perfecta.

### Paso 2: Freír las patatas
Calienta abundante aceite de oliva en una sartén y fríe las patatas a fuego medio-bajo hasta que estén tiernas pero sin dorarse demasiado. La clave está en la paciencia.

### Paso 3: Mezclar con los huevos
Bate los huevos en un bol grande con sal. Añade las patatas escurridas y mezcla bien. Deja reposar unos minutos para que los sabores se integren.

### Paso 4: Cuajar la tortilla
En una sartén con un poco de aceite, vierte la mezcla y cocina a fuego bajo. Cuando cuaje por debajo, dale la vuelta con ayuda de un plato.

### Paso 5: El toque final
Termina de cuajar por el otro lado, dejando el centro ligeramente jugoso si te gusta así.

---

**Consejo de Carmen:** Esta receta me costó varios intentos perfeccionar. No te desanimes si no sale perfecta la primera vez. ¡La práctica hace al maestro!`,
  },
  {
    id: "2",
    slug: "gazpacho-andaluz",
    title: "Gazpacho Andaluz",
    description:
      "Perfecto para los días calurosos de verano. Fresco, nutritivo y súper fácil de hacer.",
    difficulty: "Baja",
    ricor: 4,
    prepTime: "15 min",
    cookTime: "0 min",
    totalTime: 15,
    ingredients: [
      "1 kg de tomates maduros",
      "1 pepino pequeño",
      "1 pimiento verde",
      "1 diente de ajo",
      "100 ml de aceite de oliva",
      "30 ml de vinagre de Jerez",
      "Sal y agua fría",
    ],
    steps: [
      "Lava todos los vegetales. Pela el pepino y el ajo.",
      "Trocea todo y colócalo en el vaso de la batidora.",
      "Añade el aceite, vinagre, sal y un poco de agua fría.",
      "Tritura hasta obtener una textura homogénea.",
      "Cuela si prefieres una textura más fina. Refrigera al menos 2 horas antes de servir.",
    ],
    content: `## Ingredientes

- 1 kg de tomates maduros
- 1 pepino pequeño
- 1 pimiento verde
- 1 diente de ajo
- 100 ml de aceite de oliva
- 30 ml de vinagre de Jerez
- Sal y agua fría

## Preparación

### Paso 1: Preparar los vegetales
Lava todos los vegetales con cuidado. Pela el pepino y el ajo. Los tomates deben estar bien maduros para conseguir ese sabor dulce característico.

### Paso 2: Triturar
Trocea todo y colócalo en el vaso de la batidora. No te preocupes por el tamaño, todo va a triturarse.

### Paso 3: Añadir líquidos
Añade el aceite, vinagre, sal y un poco de agua fría. El vinagre de Jerez es el secreto del auténtico gazpacho andaluz.

### Paso 4: Conseguir la textura perfecta
Tritura hasta obtener una textura homogénea. Cuela si prefieres una textura más fina.

### Paso 5: Enfriar
Refrigera al menos 2 horas antes de servir. ¡Cuanto más frío, mejor!

---

**Consejo de Carmen:** Sirve con trocitos de pepino, pimiento y huevo duro por encima. ¡Queda espectacular!`,
  },
  {
    id: "3",
    slug: "paella-valenciana",
    title: "Paella Valenciana",
    description:
      "Mi humilde intento de recrear el plato más emblemático de España. ¡Aún estoy perfeccionando el socarrat!",
    difficulty: "Alta",
    ricor: 5,
    prepTime: "30 min",
    cookTime: "45 min",
    totalTime: 75,
    ingredients: [
      "400 g de arroz bomba",
      "500 g de pollo troceado",
      "200 g de judías verdes",
      "100 g de garrofón",
      "1 tomate rallado",
      "Azafrán, pimentón, romero",
      "Aceite de oliva y sal",
      "1.2 L de caldo de pollo",
    ],
    steps: [
      "Calienta aceite en la paellera y dora el pollo por todos lados. Reserva.",
      "Sofríe las judías y el garrofón. Añade el tomate y cocina hasta que oscurezca.",
      "Agrega el pimentón (cuidado de no quemar), el caldo caliente y el azafrán.",
      "Cuando hierva, añade el arroz distribuyéndolo bien. Cocina a fuego fuerte 10 min, luego medio 8-10 min.",
      "Deja reposar 5 minutos tapado con un paño antes de servir.",
    ],
    content: `## Ingredientes

- 400 g de arroz bomba
- 500 g de pollo troceado
- 200 g de judías verdes
- 100 g de garrofón
- 1 tomate rallado
- Azafrán, pimentón, romero
- Aceite de oliva y sal
- 1.2 L de caldo de pollo

## Preparación

### Paso 1: Dorar el pollo
Calienta aceite en la paellera y dora el pollo por todos lados hasta que esté bien dorado. Reserva en un plato.

### Paso 2: El sofrito
Sofríe las judías y el garrofón durante unos minutos. Añade el tomate rallado y cocina hasta que oscurezca y pierda toda el agua.

### Paso 3: Añadir el caldo
Agrega el pimentón (¡cuidado de no quemarlo!), el caldo caliente y el azafrán. Devuelve el pollo a la paellera.

### Paso 4: El arroz
Cuando hierva, añade el arroz distribuyéndolo bien por toda la paellera. Cocina a fuego fuerte 10 minutos, luego baja a fuego medio 8-10 minutos más.

### Paso 5: El socarrat
Si quieres conseguir el famoso socarrat, sube el fuego al final hasta que escuches crepitar el arroz. Deja reposar 5 minutos tapado con un paño antes de servir.

---

**Consejo de Carmen:** La proporción de caldo es crucial: usa siempre el doble de caldo que de arroz. Y nunca, NUNCA remuevas el arroz una vez lo añadas.`,
  },
  {
    id: "4",
    slug: "croquetas-de-jamon",
    title: "Croquetas de Jamón",
    description:
      "Cremosas por dentro, crujientes por fuera. El secreto está en la bechamel bien espesa.",
    difficulty: "Media",
    ricor: 5,
    prepTime: "40 min",
    cookTime: "20 min",
    totalTime: 60,
    ingredients: [
      "100 g de jamón serrano picado",
      "80 g de mantequilla",
      "100 g de harina",
      "750 ml de leche",
      "Nuez moscada, sal y pimienta",
      "2 huevos batidos",
      "Pan rallado",
      "Aceite para freír",
    ],
    steps: [
      "Derrite la mantequilla y sofríe el jamón 2 minutos.",
      "Añade la harina y cocina removiendo 3 minutos.",
      "Incorpora la leche poco a poco sin dejar de remover hasta obtener una bechamel espesa.",
      "Sazona con nuez moscada, sal y pimienta. Extiende en una bandeja y refrigera mínimo 4 horas.",
      "Forma las croquetas, pásalas por huevo y pan rallado. Fríe en aceite caliente hasta dorar.",
    ],
    content: `## Ingredientes

- 100 g de jamón serrano picado
- 80 g de mantequilla
- 100 g de harina
- 750 ml de leche
- Nuez moscada, sal y pimienta
- 2 huevos batidos
- Pan rallado
- Aceite para freír

## Preparación

### Paso 1: El jamón
Derrite la mantequilla en una sartén amplia y sofríe el jamón picado durante 2 minutos para que suelte todo su sabor.

### Paso 2: La base
Añade la harina y cocina removiendo constantemente durante 3 minutos. Este paso elimina el sabor a harina cruda.

### Paso 3: La bechamel
Incorpora la leche poco a poco, sin dejar de remover, hasta obtener una bechamel bien espesa. Debe despegarse de las paredes.

### Paso 4: Enfriar
Sazona con nuez moscada, sal y pimienta. Extiende la masa en una bandeja y refrigera mínimo 4 horas (mejor toda la noche).

### Paso 5: Formar y freír
Forma las croquetas con las manos húmedas, pásalas por huevo batido y pan rallado. Fríe en aceite bien caliente hasta que estén doradas.

---

**Consejo de Carmen:** El secreto de unas buenas croquetas está en la bechamel: debe ser tan espesa que puedas dejar la cuchara de pie. ¡Y no escatimes en jamón!`,
  },
  {
    id: "5",
    slug: "patatas-bravas",
    title: "Patatas Bravas",
    description:
      "El tapa perfecto para compartir. Mi salsa brava es un poco más suave porque no aguanto el picante extremo.",
    difficulty: "Baja",
    ricor: 4,
    prepTime: "15 min",
    cookTime: "30 min",
    totalTime: 45,
    ingredients: [
      "1 kg de patatas",
      "Aceite para freír",
      "Para la salsa: tomate frito, pimentón picante, cayena, ajo",
      "Alioli opcional",
    ],
    steps: [
      "Pela las patatas y córtalas en cubos irregulares.",
      "Fríelas en aceite caliente hasta que estén doradas y crujientes.",
      "Para la salsa, mezcla tomate frito con pimentón, un toque de cayena y ajo picado.",
      "Calienta la salsa y viértela sobre las patatas.",
      "Sirve con alioli si te apetece el contraste.",
    ],
    content: `## Ingredientes

- 1 kg de patatas
- Aceite para freír
- Para la salsa: tomate frito, pimentón picante, cayena, ajo
- Alioli opcional

## Preparación

### Paso 1: Las patatas
Pela las patatas y córtalas en cubos irregulares. El corte irregular hace que queden más crujientes.

### Paso 2: Freír
Fríelas en aceite bien caliente (180°C) hasta que estén doradas y crujientes por fuera, tiernas por dentro.

### Paso 3: La salsa brava
Para la salsa, mezcla tomate frito con pimentón picante, un toque de cayena y ajo picado. Ajusta el picante a tu gusto.

### Paso 4: Calentar la salsa
Calienta la salsa en una sartén pequeña para que los sabores se integren.

### Paso 5: Servir
Vierte la salsa sobre las patatas calientes. Sirve con alioli si te apetece el contraste de sabores.

---

**Consejo de Carmen:** El truco está en freír las patatas dos veces: primero a temperatura media para cocerlas, y luego a temperatura alta para que queden crujientes.`,
  },
  {
    id: "6",
    slug: "tarta-de-queso-vasca",
    title: "Tarta de Queso Vasca",
    description:
      "Quemadita por fuera, cremosa por dentro. Esta receta no falla nunca.",
    difficulty: "Baja",
    ricor: 5,
    prepTime: "15 min",
    cookTime: "35 min",
    totalTime: 50,
    ingredients: [
      "500 g de queso crema",
      "200 g de azúcar",
      "4 huevos",
      "300 ml de nata líquida",
      "30 g de harina",
      "Una pizca de sal",
    ],
    steps: [
      "Precalienta el horno a 220°C.",
      "Bate el queso crema con el azúcar hasta que esté suave.",
      "Añade los huevos uno a uno, luego la nata y finalmente la harina tamizada.",
      "Vierte en un molde forrado con papel de horno.",
      "Hornea 35-40 minutos hasta que esté dorada pero temblorosa en el centro. Deja enfriar.",
    ],
    content: `## Ingredientes

- 500 g de queso crema (a temperatura ambiente)
- 200 g de azúcar
- 4 huevos
- 300 ml de nata líquida
- 30 g de harina
- Una pizca de sal

## Preparación

### Paso 1: Precalentar
Precalienta el horno a 220°C. Es importante que esté bien caliente para conseguir ese exterior quemadito característico.

### Paso 2: El queso
Bate el queso crema con el azúcar hasta que esté completamente suave y sin grumos.

### Paso 3: Añadir el resto
Añade los huevos uno a uno, batiendo bien después de cada adición. Incorpora la nata y finalmente la harina tamizada.

### Paso 4: Al molde
Vierte la mezcla en un molde de 20-22 cm forrado con papel de horno, dejando que sobresalga por los bordes.

### Paso 5: Hornear
Hornea 35-40 minutos hasta que esté bien dorada por fuera pero temblorosa en el centro. Deja enfriar completamente antes de desmoldar.

---

**Consejo de Carmen:** No te asustes si se hunde un poco al enfriarse, ¡es completamente normal! La magia está en ese centro cremoso.`,
  },
  {
    id: "7",
    slug: "albondigas-caseras",
    title: "Albóndigas Caseras en Salsa",
    description:
      "Como las de la abuela, con esa salsa que moja pan sin parar.",
    difficulty: "Media",
    ricor: 4,
    prepTime: "25 min",
    cookTime: "40 min",
    totalTime: 65,
    ingredients: [
      "500 g de carne picada mixta",
      "1 huevo",
      "Pan rallado",
      "Perejil, ajo",
      "Para la salsa: cebolla, zanahoria, vino blanco, caldo",
      "Harina para rebozar",
    ],
    steps: [
      "Mezcla la carne con huevo, pan rallado, perejil y ajo picado. Forma bolitas.",
      "Pasa las albóndigas por harina y fríelas hasta dorar. Reserva.",
      "En la misma sartén, sofríe cebolla y zanahoria picadas.",
      "Añade vino blanco, deja evaporar y agrega caldo.",
      "Incorpora las albóndigas y cocina a fuego lento 20 minutos.",
    ],
    content: `## Ingredientes

- 500 g de carne picada mixta (cerdo y ternera)
- 1 huevo
- Pan rallado
- Perejil fresco, ajo
- Para la salsa: cebolla, zanahoria, vino blanco, caldo
- Harina para rebozar

## Preparación

### Paso 1: La masa
Mezcla la carne picada con el huevo, un par de cucharadas de pan rallado, perejil picado y ajo muy picadito. Amasa bien con las manos.

### Paso 2: Formar las albóndigas
Con las manos húmedas, forma bolitas del tamaño de una nuez grande. Pásalas por harina.

### Paso 3: Dorar
Fríe las albóndigas en aceite caliente hasta que estén doradas por todos lados. Reserva en un plato.

### Paso 4: La salsa
En la misma sartén, sofríe la cebolla y zanahoria picadas. Añade un chorro de vino blanco y deja que evapore.

### Paso 5: Cocinar juntos
Agrega el caldo, incorpora las albóndigas y cocina a fuego lento durante 20 minutos hasta que la salsa espese.

---

**Consejo de Carmen:** El secreto de unas albóndigas tiernas está en no amasar demasiado la carne. Y la salsa siempre mejora de un día para otro.`,
  },
  {
    id: "8",
    slug: "arroz-con-leche",
    title: "Arroz con Leche",
    description:
      "Postre reconfortante que me transporta a mi infancia cada vez que lo preparo.",
    difficulty: "Baja",
    ricor: 4,
    prepTime: "5 min",
    cookTime: "45 min",
    totalTime: 50,
    ingredients: [
      "150 g de arroz redondo",
      "1 L de leche entera",
      "150 g de azúcar",
      "Piel de limón",
      "1 rama de canela",
      "Canela en polvo para decorar",
    ],
    steps: [
      "Hierve el arroz en agua 5 minutos y escurre.",
      "Calienta la leche con la piel de limón y la canela.",
      "Añade el arroz y cocina a fuego lento 35-40 minutos, removiendo.",
      "Agrega el azúcar en los últimos 10 minutos.",
      "Sirve tibio o frío espolvoreado con canela.",
    ],
    content: `## Ingredientes

- 150 g de arroz redondo
- 1 L de leche entera
- 150 g de azúcar
- Piel de limón (solo la parte amarilla)
- 1 rama de canela
- Canela en polvo para decorar

## Preparación

### Paso 1: Precocer el arroz
Hierve el arroz en agua durante 5 minutos y escúrrelo bien. Este paso evita que quede duro.

### Paso 2: Aromatizar la leche
Calienta la leche en una cazuela grande con la piel de limón y la rama de canela.

### Paso 3: Cocinar
Cuando rompa a hervir, añade el arroz escurrido. Cocina a fuego muy lento durante 35-40 minutos, removiendo de vez en cuando para que no se pegue.

### Paso 4: Endulzar
Agrega el azúcar en los últimos 10 minutos de cocción. Remueve bien para que se disuelva.

### Paso 5: Servir
Retira la canela y el limón. Sirve tibio o frío, espolvoreado con canela en polvo.

---

**Consejo de Carmen:** Para un arroz con leche extra cremoso, añade una yema de huevo batida al final, fuera del fuego.`,
  },
  {
    id: "9",
    slug: "ensaladilla-rusa",
    title: "Ensaladilla Rusa",
    description:
      "El clásico de los bares españoles. Mi versión tiene un toque de mostaza que marca la diferencia.",
    difficulty: "Baja",
    ricor: 3,
    prepTime: "20 min",
    cookTime: "25 min",
    totalTime: 45,
    ingredients: [
      "4 patatas medianas",
      "2 zanahorias",
      "150 g de guisantes cocidos",
      "3 huevos cocidos",
      "1 lata de atún",
      "Mayonesa casera o comprada",
      "Aceitunas y pimientos para decorar",
    ],
    steps: [
      "Cuece las patatas y zanahorias hasta que estén tiernas. Deja enfriar y corta en dados.",
      "Cuece los huevos, pélalos y pícalos.",
      "Mezcla todo con los guisantes y el atún escurrido.",
      "Añade mayonesa al gusto y mezcla con cuidado.",
      "Refrigera al menos 1 hora antes de servir. Decora con aceitunas y pimientos.",
    ],
    content: `## Ingredientes

- 4 patatas medianas
- 2 zanahorias
- 150 g de guisantes cocidos
- 3 huevos cocidos
- 1 lata de atún
- Mayonesa casera o comprada
- Aceitunas y pimientos del piquillo para decorar

## Preparación

### Paso 1: Cocer las verduras
Cuece las patatas y zanahorias en agua con sal hasta que estén tiernas pero firmes. Deja enfriar completamente y corta en dados pequeños.

### Paso 2: Los huevos
Cuece los huevos durante 10 minutos. Pélalos bajo agua fría y pícalos no muy finos.

### Paso 3: Mezclar
En un bol grande, mezcla las patatas, zanahorias, guisantes, huevos y el atún bien escurrido.

### Paso 4: La mayonesa
Añade mayonesa al gusto (mi truco: una cucharadita de mostaza Dijon en la mayonesa). Mezcla con cuidado para no aplastar las patatas.

### Paso 5: Refrigerar y decorar
Refrigera al menos 1 hora antes de servir. Decora con aceitunas y tiras de pimiento del piquillo.

---

**Consejo de Carmen:** La ensaladilla está mucho mejor al día siguiente, cuando todos los sabores se han integrado.`,
  },
];
