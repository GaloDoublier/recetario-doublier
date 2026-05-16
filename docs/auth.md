# Arquitectura de Autenticación

El sistema utiliza **Auth.js (NextAuth v5)** con el proveedor de credenciales estáticas. La seguridad se gestiona a nivel de borde (Edge) mediante el Middleware de Next.js.

## Flujo de Autorización y Autenticación

```mermaid
sequenceDiagram
    actor U as Usuario
    participant Nav as Navegador
    participant Mid as Middleware (src/middleware.ts)
    participant Auth as Auth.js (src/auth.ts)
    participant Env as Entorno (.env)
    participant Page as Panel (/admin/panel)

    %% Escenario 1: Intento de acceso sin login
    U->>Nav: Entra a /admin/panel
    Nav->>Mid: Petición GET /admin/panel
    
    note over Mid: Revisa si existe la<br/>cookie de sesión (JWT)
    
    alt No hay sesión o es inválida
        Mid-->>Nav: 🛑 Estado 307: Redirección
        Nav-->>U: Muestra pantalla de Login (/admin)
        
        %% Proceso de Login
        U->>Nav: Ingresa 'admin' y contraseña
        Nav->>Auth: Función signIn("credentials")
        Auth->>Env: Lee ADMIN_USERNAME y ADMIN_PASSWORD
        
        alt Credenciales Correctas
            note over Auth: Firma el JWT con AUTH_SECRET
            Auth-->>Nav: ✅ Establece Cookie segura (HttpOnly)
            Nav->>Mid: Nueva petición a /admin/panel (con Cookie)
            Mid->>Page: 🟢 Acceso permitido
            Page-->>U: Muestra el Dashboard
        else Credenciales Incorrectas
            Auth-->>Nav: ❌ Retorna objeto { error: true }
            Nav-->>U: Muestra "Credenciales inválidas"
        end
        
    else Tiene cookie de sesión válida
        Mid->>Page: 🟢 Acceso permitido (Bypass)
        Page-->>U: Muestra el Dashboard directamente
    end