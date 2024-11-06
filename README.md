# API de Gestión de Reclamos

## Descripción del Proyecto

Esta API está diseñada para gestionar reclamos en una concesionaria, permitiendo a los usuarios autenticarse, registrar reclamos, actualizar sus estados y recibir notificaciones por correo electrónico cuando se produce un cambio de estado. El proyecto sigue una arquitectura de cliente, rutas, controladores y servicios usando Programación Orientada a Objetos (POO).

## Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **MySQL2**
- **Passport.js** (autenticación)
- **JWT Token** (tokens de acceso)
- **Bcrypt** (encriptación de contraseñas)
- **express-validator** (validaciones de datos)
- **PDFKit** (generación de informes en PDF)
- **Nodemailer** (envío de correos electrónicos)
- **Handlebars** (plantillas de correo electrónico)
- **Dotenv** (gestión de variables de entorno)

## Estructura de la API

La API está organizada en diferentes rutas para manejar CRUD de las siguientes entidades:

1. **Usuarios**: Gestión de información y autenticación.
2. **Tipos de Usuarios**: Gestión de tipos de usuarios (cliente, empleado, administrador).
3. **Reclamos**: Registro y actualización de estados de reclamos.
4. **Tipos de Reclamos**: Definición de los diferentes tipos de reclamos.
5. **Estados de Reclamos**: Definición de los posibles estados de un reclamo.
6. **Oficinas**: Gestión de oficinas asociadas.

Cada uno de estos componentes cuenta con rutas específicas que permiten las operaciones CRUD y otras funcionalidades adicionales.

---
## Autenticación y Seguridad

Se utiliza **Passport.js** para manejar la autenticación, y los tokens **JWT** para autorizar a los usuarios a realizar acciones específicas según su perfil. Las contraseñas de los usuarios son encriptadas usando **Bcrypt**. Además, se gestionan cookies para mantener la sesión activa.

## Validaciones

La API implementa validaciones con **express-validator** para garantizar que los datos recibidos a través de las solicitudes sean correctos y seguros.

## Configuración del Correo Electrónico

La API está configurada para enviar correos electrónicos a los usuarios cuando se actualiza el estado de un reclamo. Para ello, se utiliza `Nodemailer` junto con plantillas `Handlebars`.

---

## Detalles de la Base de Datos

La base de datos está diseñada para incluir las siguientes tablas, que están relacionadas entre sí:

## Tablas

### 1. **usuarios**
La tabla `usuarios` almacena la información de los usuarios, incluyendo su nombre, apellido, correo electrónico y contraseña. Cada usuario está asociado a un tipo de usuario.

- **Campos**:
  - `idUsuario` (int): ID único del usuario.
  - `nombre` (varchar): Nombre del usuario.
  - `apellido` (varchar): Apellido del usuario.
  - `correoElectronico` (varchar): Correo electrónico del usuario.
  - `contrasenia` (varchar): Contraseña del usuario (cifrada).
  - `idTipoUsuario` (int): Relacionado con el tipo de usuario (referencia a `usuariosTipo`).
  - `imagen` (varchar, nullable): Imagen del usuario (opcional).
  - `activo` (tinyint): Indica si el usuario está activo (1) o inactivo (0).

### 2. **usuariosTipo**
Define los diferentes tipos de usuarios (cliente, empleado, administrador). Los usuarios en la tabla `usuarios` se asocian a un tipo de usuario mediante una clave foránea.

- **Campos**:
  - `idTipoUsuario` (int): ID único del tipo de usuario.
  - `descripcion` (varchar): Descripción del tipo de usuario (ej. Cliente, Empleado, Administrador).
  - `activo` (tinyint): Indica si el tipo de usuario está activo.

### 3. **reclamos**
Almacena los reclamos realizados por los usuarios. Cada reclamo está asociado a un usuario creador, un tipo de reclamo y un estado.

- **Campos**:
  - `idReclamo` (int): ID único del reclamo.
  - `asunto` (varchar): Asunto del reclamo.
  - `descripcion` (varchar, nullable): Descripción detallada del reclamo.
  - `fechaCreado` (datetime): Fecha en que se creó el reclamo.
  - `fechaFinalizado` (datetime, nullable): Fecha en que se finalizó el reclamo (si aplica).
  - `fechaCancelado` (datetime, nullable): Fecha en que se canceló el reclamo (si aplica).
  - `idReclamoEstado` (int): Estado actual del reclamo (referencia a `reclamos_estado`).
  - `idReclamoTipo` (int): Tipo del reclamo (referencia a `reclamos_tipo`).
  - `idUsuarioCreador` (int): Usuario que creó el reclamo (referencia a `usuarios`).
  - `idUsuarioFinalizador` (int, nullable): Usuario que finalizó o cerró el reclamo (referencia a `usuarios`).

### 4. **reclamos_tipo**
Define los diferentes tipos de reclamos que pueden ser registrados.

- **Campos**:
  - `idReclamosTipo` (int): ID único del tipo de reclamo.
  - `descripcion` (varchar): Descripción del tipo de reclamo (ej. Falla de motor, Falla de frenos).
  - `activo` (tinyint): Indica si el tipo de reclamo está activo.

### 5. **reclamos_estado**
Define los posibles estados que puede tener un reclamo.

- **Campos**:
  - `idReclamosEstado` (int): ID único del estado del reclamo.
  - `descripcion` (varchar): Descripción del estado (ej. Creado, En Proceso, Cancelado, Finalizado).
  - `activo` (tinyint): Indica si el estado está activo.

### 6. **oficinas**
Almacena información sobre las oficinas de la concesionaria. Estas oficinas pueden estar relacionadas con los reclamos o los usuarios.

- **Campos**:
  - `idOficina` (int): ID único de la oficina.
  - `nombre` (varchar): Nombre de la oficina (ej. Dpto. de Taller, Dpto. de Garantías).
  - `idReclamoTipo` (int): Tipo de reclamo relacionado con esta oficina (referencia a `reclamos_tipo`).
  - `activo` (tinyint): Indica si la oficina está activa.

### 7. **usuarios_oficinas**
Relaciona a los usuarios con las oficinas en las que trabajan.

- **Campos**:
  - `idUsuarioOficina` (int): ID único de la relación.
  - `idUsuario` (int): ID del usuario (referencia a `usuarios`).
  - `idOficina` (int): ID de la oficina (referencia a `oficinas`).
  - `activo` (tinyint): Indica si la relación usuario-oficina está activa.

### Relaciones
- usuarios está relacionado con usuariosTipo a través de idTipoUsuario.
- reclamos está relacionado con usuarios a través de idUsuarioCreador e idUsuarioFinalizador.
- reclamos está relacionado con reclamos_estado a través de idReclamoEstado.
- reclamos está relacionado con reclamos_tipo a través de idReclamoTipo.
- usuarios_oficinas está relacionado con usuarios y oficinas.

---
  
## Configuración del Entorno

Para configurar la API, es necesario crear un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```DB_HOST=localhost

DB_USER=tu_usuario 

DB_PASSWORD=tu_contraseña 

DB_NAME=tu_base_de_datos 

EMAIL_USER=concesionaria.prog3@gmail.com 

EMAIL_PASSWORD=comq xjcs uurg eqkp

SECRET_KEY=tu_clave_secreta

TOKEN_EXPIRATION=2h
```


### Instalación

1. Clona el repositorio en tu máquina local.
2. Navega al directorio del proyecto.
3. Ejecuta `npm install` para instalar las dependencias.
4. Configura el archivo `.env` según tus credenciales.
5. Inicia la aplicación con `npm start`.

Con esta configuración, la API estará lista para gestionar reclamos en tu concesionaria. ¡Disfruta programando!

---

## Proyecto realizado por
`Fernanda Elola, Diego Lalanda, Nahuel Pereyra.`

*Para la asignatura **Programación 3** de la **Tecnicatura Universitaria en Desarrollo Web***

**UNER FCAD**