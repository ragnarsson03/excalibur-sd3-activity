# Sistema de Gestión para la Fundación 100% San Agustín

Aplicación web desarrollada con Node.js, Express y MongoDB para la gestión de beneficiarios y actividades de la fundación.

## 📋 Características

- **Arquitectura MVC**: Modelo-Vista-Controlador para una mejor organización del código.
- **CRUD Completo**: Funcionalidades para crear, leer, actualizar y eliminar registros.
- **Múltiples Colecciones**: Gestión de 5 colecciones en MongoDB:
  - `beneficiarios`
  - `actividades`
  - `voluntarios`
  - `recursos`
  - `asistencias`
- **Diseño Responsivo**: Interfaz de usuario adaptada a diferentes dispositivos.

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd excalibur-sd3-activity
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```env
   MONGODB_URI=tu_cadena_de_conexion_mongodb
   PORT=3000
   ```

4. Ejecuta la aplicación:
   ```bash
   npm start
   ```

## 🌐 Uso

La aplicación estará disponible en `http://localhost:3000`.

### Rutas Disponibles

- **Beneficiarios**:
  - `GET /beneficiarios` - Listar todos los beneficiarios
  - `GET /beneficiarios/new` - Crear nuevo beneficiario
  - `POST /beneficiarios` - Guardar nuevo beneficiario
  - `GET /beneficiarios/:id/edit` - Editar beneficiario
  - `POST /beneficiarios/:id/edit` - Actualizar beneficiario
  - `POST /beneficiarios/:id/delete` - Eliminar beneficiario
  - `GET /beneficiarios/consulta` - Consulta personalizada

- **Actividades**:
  - `GET /actividades` - Listar todas las actividades
  - `GET /actividades/new` - Crear nueva actividad
  - `POST /actividades` - Guardar nueva actividad
  - `GET /actividades/:id/edit` - Editar actividad
  - `POST /actividades/:id/edit` - Actualizar actividad
  - `POST /actividades/:id/delete` - Eliminar actividad

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **EJS** - Motor de plantillas
- **Vercel** - Despliegue (opcional)

## 📄 Licencia

Este proyecto es para fines académicos.

## 👥 Autor

- [Tu Nombre]
- [Tu Grupo]

## 📝 Notas de la Profesora

> "Inmaculada Maldonado, [19/2/2026 7:46 p. m.]
>
> Para esta evaluación vamos a crear nuestro propio proyecto con Node.Js y Mongo db.
>
> Una colección de documentos , ustedes escogerán el tema a trabajar o el mismo de proyecto , en grupo considerando las siguientes condiciones:
>
> Mínimo cinco colecciones en la base de datos.
>
> Cada colección con un mínimo de cuatro campos y documentos
>
> Desarrollar un módulo el cual genere CRUD Create (Crear), Read (Leer), Update (Actualizar) y Delete (Borrar) y una consulta sencilla se debe de realizar en Node.js y conexión base de dato MongoDb .
>
> Toma captura de Cluster en MongoDB Compass o Atlas donde se vean las 5 colecciones.Guardar las capturas de pantallas de las colecciones en MongoDb y la conexión.
>
> Subir el proyecto a un repositorio de github y copiar el enlance de tu Github,el código fuente pegado con formato y las capturas de pantallas organizadas .
>
> Asegúrate de que el archivo README.md explique cómo ejecutar tu proyecto (npm install y npm start).
>
> Una vez culminado tu sistema, guárdalo en formato .pdf, identifícalo con tu nombre y apellido y cárgalo en el 