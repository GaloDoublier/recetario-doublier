# Arquitectura de Subida de Imágenes

Así es como fluye la información cuando creamos una receta:

```mermaid
sequenceDiagram
    participant U as Administrador
    participant F as Frontend (Next.js)
    participant C as Cloudinary
    participant DB as Neon DB (Prisma)

    U->>F: Sube foto de la receta
    F->>C: Envía archivo con "Upload Preset"
    C-->>F: Devuelve URL segura (https://...)
    F->>F: Inyecta ![Foto](URL) en el Markdown
    U->>F: Clic en "Guardar Receta"
    F->>DB: Guarda Markdown plano en la base de datos