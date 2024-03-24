# App de Notas

El proyecto es una aplicación de gestión de notas privadas con funcionalidades de autenticación de usuarios y categorización de notas. Permite a los usuarios registrarse, iniciar sesión, crear, ver, actualizar y eliminar notas. Cada nota puede tener un título, texto, categoría y opción de marcarse como pública para que otros usuarios puedan verla. Las categorías son predefinidas y no se pueden editar. Además, los usuarios pueden asociar una imagen única a cada nota. La aplicación está dividida en un frontend desarrollado con React y un backend desarrollado con Node.js y Express, con una base de datos MySQL para almacenar la información de usuarios, notas y categorías.

## Instalar

    1. Instalar dependencias mediante 'npm i'
    2. Editar el archivo '.env.example' por '.env' y completar los datos.
    3. Ejecutar 'npm run initdb' para ejecutar la base de datos
    4. ejecutar 'npm run dev' para ejecutar el servidor

# Base de Datos

en al carpeta server/db/AppNotas.sql esta montada la estructura básica, sin embargo se cargo de manera automatica con nodejs.

# Organización del código

Backend (Node.js con Express):
Rutas para notas: routes/notasRoutes.js
Rutas para categorías: routes/categoriasRoutes.js
Controladores para notas: controllers/notasController.js
Controladores para categorías: controllers/categoriasController.js
Middleware para verificar el token de autenticación: middleware/verifyToken.js
Modelo para las notas: models/Nota.js
Modelo para las categorías: models/Categoria.js
Configuración para manejar la carga de imágenes: config/uploadConfig.js

Frontend (React - vite):
Componentes para ver el listado de notas, ver una nota específica, crear y modificar notas, y gestionar categorías.
Formularios para crear y editar notas.
Componente para mostrar imágenes asociadas a las notas.

Base de datos (MySQL - Workbench):

Diagrama de la Base de Datos

El diagrama para la aplicación incluirá tres tablas principales:

Usuarios: Para almacenar la información de los usuarios que pueden crear notas.
Categorías: Para almacenar las categorías fijas a las que se pueden asociar las notas.
Notas: Para almacenar las notas creadas por los usuarios, incluyendo una referencia a la categoría y al usuario que la creó.
Las relaciones entre estas tablas son:

Usuarios a Notas: Una relación de uno a muchos, donde un usuario puede tener varias notas, pero una nota pertenece a un solo usuario.
Categorías a Notas: Una relación de uno a muchos, donde una categoría puede estar asociada a varias notas, pero una nota solo tiene una categoría.

/routes para las rutas.
/controllers para la lógica.
/models para la interacción con DB.
/middlewares para los middlewares (por ejemplo, para verificar tokens).

listado de los endpoints necesarios para la aplicación de acuerdo con los requisitos que has proporcionados

Autenticación:

POST /api/auth/login: Iniciar sesión de un usuario.
POST /api/auth/registro: Registrar un nuevo usuario.

Notas:

GET /api/notas: Obtener todas las notas del usuario.
GET /api/notas/:id: Obtener una nota específica por su ID.
POST /api/notas: Crear una nueva nota.
PUT /api/notas/:id: Actualizar una nota existente por su ID.
DELETE /api/notas/:id: Eliminar una nota existente por su ID.

Categorías:

GET /api/categorias: Obtener todas las categorías.
GET /api/categorias/:id: Obtener una categoría específica por su ID.
POST /api/categorias: Crear una nueva categoría.
PUT /api/categorias/:id: Actualizar una categoría existente por su ID.
DELETE /api/categorias/:id: Eliminar una categoría existente por su ID.

Imágenes:

POST /api/imagenes/upload: Subir una imagen asociada a una nota.
GET /api/imagenes/:id: Obtener una imagen específica por su ID.
DELETE /api/imagenes/:id: Eliminar una imagen existente por su ID.
