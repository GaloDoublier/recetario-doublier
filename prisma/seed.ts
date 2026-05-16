import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.receta.deleteMany();

  const recetas = [
    {
      title: 'Tortilla de Patatas Clásica',
      description: 'La receta tradicional española, jugosa y con cebolla caramelizada.',
      difficulty: 'Media',
      totalTime: 45,
      ricor: 5,
      imagen_url: 'https://images.unsplash.com/photo-1538680327341-a1b60cd5e2f7?q=80&w=1000&auto=format&fit=crop',
      contenido_markdown: `## Ingredientes\n\n- 4 patatas medianas\n- 6 huevos grandes\n- 1 cebolla\n- Aceite de oliva virgen extra\n- Sal al gusto\n\n## Preparación\n\n1. Pelar y cortar las patatas y la cebolla en láminas finas.\n2. Pochar en abundante aceite a fuego medio-bajo.\n3. Escurrir bien el aceite y mezclar con los huevos batidos.\n4. Cuajar en la sartén 2 minutos por lado para que quede jugosa.`,
    },
    {
      title: 'Macarrones con Queso (Mac & Cheese)',
      description: 'Pasta cremosa con una mezcla intensa de quesos fundidos al horno.',
      difficulty: 'Baja',
      totalTime: 30,
      ricor: 4,
      imagen_url: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?q=80&w=1000&auto=format&fit=crop',
      contenido_markdown: `## Ingredientes\n\n- 300g de macarrones\n- 200g de queso cheddar rallado\n- 50g de mantequilla\n- 50g de harina\n- 500ml de leche entera\n\n## Preparación\n\n1. Hervir la pasta hasta que esté al dente.\n2. En una olla, derretir mantequilla, tostar harina y añadir leche poco a poco (Roux).\n3. Añadir el queso hasta fundir y mezclar con la pasta.\n4. Gratinar 5 minutos al horno.`,
    },
    {
      title: 'Risotto de Champiñones',
      description: 'Arroz meloso italiano con setas, vino blanco y queso parmesano.',
      difficulty: 'Alta',
      totalTime: 50,
      ricor: 5,
      imagen_url: 'https://images.unsplash.com/photo-1633337474564-1d9e96e5d8a4?q=80&w=1000&auto=format&fit=crop',
      contenido_markdown: `## Ingredientes\n\n- 300g de arroz arborio o carnaroli\n- 250g de champiñones laminados\n- 1 litro de caldo de pollo caliente\n- 1 vaso de vino blanco\n- Queso parmesano rallado\n\n## Preparación\n\n1. Sofreír los champiñones con ajo y retirar.\n2. Tostar el arroz en la misma sartén, desglasar con vino blanco.\n3. Añadir el caldo cazo a cazo, sin dejar de remover hasta que el arroz lo absorba.\n4. Apagar el fuego, añadir los champiñones, mantequilla fría y parmesano para mantecar.`,
    }
  ];

  for (const receta of recetas) {
    await prisma.receta.create({
      data: receta,
    });
  }

  console.log('Base de datos poblada con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end(); // Cerramos la conexión del pool
  });