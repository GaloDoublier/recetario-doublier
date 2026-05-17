import { AboutSection } from "@/src/components/about-section";
import { MaestrosSection } from "@/src/components/maestros-section";
import { maestros } from "@/lib/constant-data";

export default async function HomePage() {
  return (
    <main>
      <AboutSection /> 
      <MaestrosSection maestros={maestros} />
    </main>
  );
}