import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center bg-background">

      <h1 className="font-playfair text-6xl md:text-8xl font-bold text-primary mb-4">
        4<p className='inline text-5xl sm:text-7xl'>🥘</p>4
      </h1>
      
      <h2 className="font-sans text-xl md:text-2xl font-semibold text-card-foreground mb-4">
        Esto todavia no lo cociné
      </h2>
      
      <p className="text-muted-foreground max-w-md mb-8 text-sm md:text-base">
        La página que estás buscando no existe todavia. 
        Mejor volvamos al menú principal
        Si ves algun posible error escribime!
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-primary text-primary-foreground font-medium h-11 px-8 rounded-md hover:bg-primary/90 transition-colors shadow-sm"
        >
          Volver al Inicio 🏠
        </Link>
        
      </div>

      {/* Decoración de fondo sutil tipo cocina */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
    </div>
  );
}