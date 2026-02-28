# Sistema de Gestión — Fundación 100% San Agustín

Aplicación web profesional desarrollada con **Node.js, TypeScript y MongoDB** para la gestión integral de la fundación.

## 📋 Características

- **Arquitectura MVC Pro**: Organización estricta bajo el patrón Modelo-Vista-Controlador.
- **Tipado Fuerte**: Implementación de **TypeScript** e Interfaces para integridad de datos.
- **Diseño Moderno**: Interfaz construida con **Tailwind CSS**, enfocada en la experiencia de usuario.
- **5 Colecciones en MongoDB**:
  - `beneficiaries` — Gestión de personas (Incluye búsqueda por Cédula).
  - `activities` — Programas y eventos.
  - `volunteers` — Personal de apoyo.
  - `resources` — Inventario de materiales.
  - `attendances` — Registro de participación.
- **Deploy Cloud**: Optimizado para **Vercel** con soporte para funciones serverless.

---

## 🚀 Instalación Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/ragnarsson03/excalibur-sd3-activity.git
cd excalibur-sd3-activity
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:
```env
MONGODB_URI=tu_uri_de_mongodb_atlas
PORT=3000
```

### 4. Ejecutar en modo desarrollo
```bash
npm run dev
```
La aplicación compilará el código TypeScript y estará disponible en http://localhost:3000.

---

## 📁 Estructura del Proyecto (src/)
```plaintext
excalibur-sd3-activity/
├── src/
│   ├── config/      # Conexión a MongoDB (Singleton)
│   ├── controllers/ # Lógica de negocio y búsqueda por cédula
│   ├── interfaces/  # Interfaces de TypeScript
│   ├── models/      # Schemas de Mongoose tipados
│   ├── routes/      # Enrutamiento de la API
│   └── server.ts    # Punto de entrada TS
├── views/           # Plantillas EJS + Tailwind CSS
├── public/          # Assets estáticos
├── tsconfig.json    # Configuración de TypeScript
└── vercel.json      # Configuración de despliegue
```

---

## 🛠️ Stack Tecnológico
| Tecnología | Uso |
| :--- | :--- |
| **TypeScript** | Lenguaje principal (Tipado estático) |
| **Node.js / Express** | Backend y Servidor |
| **MongoDB Atlas** | Base de datos NoSQL Cloud |
| **Tailwind CSS** | Framework de diseño UI |
| **EJS** | Motor de plantillas dinámicas |

---

## 👥 Autores

- Frederick Durán — Grupo SD3
- Yesmir Guzmán - Grupo SD3
- Juan Henríquez - Grupo SD3

## 📄 Licencia

Este proyecto es para fines académicos de la asignatura Desarrollo Web - Universidad Nacional Experimental de las Telecomunicaciones (UNET).
