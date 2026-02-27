# Sistema de Gestión — Fundación 100% San Agustín

Aplicación web desarrollada con Node.js, Express y MongoDB para la gestión de beneficiarios y actividades de la fundación.

## 📋 Características

- **Arquitectura MVC**: Modelo-Vista-Controlador para una mejor organización del código.
- **CRUD Completo**: Funcionalidades para crear, leer, actualizar y eliminar registros.
- **5 Colecciones en MongoDB**:
  - `beneficiaries` — Personas que reciben servicios
  - `activities` — Programas y eventos
  - `volunteers` — Personal de apoyo
  - `resources` — Inventario de materiales
  - `attendances` — Registro de participación
- **Diseño Responsivo**: Interfaz adaptada a diferentes dispositivos con Bootstrap 5.
- **Deploy en Vercel**: Configurado para entornos serverless.

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
Crea un archivo `.env` en la raíz del proyecto copiando `.env.example`:
```bash
copy .env.example .env
```
Edita `.env` con tu URI de MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=3000
```

### 4. Ejecutar la aplicación
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

---

## ☁️ Despliegue en Vercel

### Requisitos previos
- Cuenta en [vercel.com](https://vercel.com)
- Repositorio en GitHub conectado a Vercel

### Pasos

1. **Importar proyecto** en Vercel desde GitHub
2. **Configurar variable de entorno** en Vercel:
   - Ve a: `Project → Settings → Environment Variables`
   - Agrega: `MONGODB_URI` con el valor de tu URI de MongoDB Atlas
3. **Desplegar**: Vercel detecta automáticamente el `vercel.json` y despliega

> ⚠️ **Importante**: Si `MONGODB_URI` no está configurada en Vercel, la aplicación dará error. Las variables del `.env` local **no se suben a Vercel**.

---

## 🌐 Rutas Disponibles

| Módulo | Ruta base | CRUD |
|---|---|---|
| Beneficiarios | `/beneficiarios` | ✅ + Consulta |
| Actividades | `/actividades` | ✅ + Filtro por área |
| Voluntarios | `/voluntarios` | ✅ |
| Recursos | `/recursos` | ✅ |
| Asistencias | `/asistencias` | ✅ |

---

## 🛠️ Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | ≥18 | Entorno de ejecución |
| Express | ^5.x | Framework web |
| MongoDB | Atlas | Base de datos NoSQL |
| Mongoose | ^9.x | ODM para MongoDB |
| EJS | ^4.x | Motor de plantillas |
| Bootstrap | 5.3.3 | UI / Diseño responsivo |
| Vercel | — | Plataforma de despliegue |

---

## 📁 Estructura del Proyecto

```
excalibur-sd3-activity/
├── config/
│   └── database.js          # Conexión a MongoDB (con caché serverless)
├── controllers/             # Lógica de negocio (CRUD)
├── models/                  # Schemas de Mongoose
├── routes/                  # Definición de rutas
├── views/                   # Plantillas EJS
├── public/                  # Assets estáticos
├── .env.example             # Plantilla de variables de entorno
├── vercel.json              # Configuración de despliegue serverless
└── server.js                # Punto de entrada
```

---

## 👥 Autores

- Eliezer González — Grupo SD3

## 📄 Licencia

Proyecto académico — Universidad Nacional Experimental de las Telecomunicaciones (UNET)