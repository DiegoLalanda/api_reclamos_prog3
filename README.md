# API de Gestión de Reclamos

## Descripción del Proyecto

Esta API está diseñada para gestionar reclamos en una concesionaria, permitiendo a los usuarios autenticarse, registrar reclamos, actualizar sus estados y recibir notificaciones por correo electrónico cuando se produce un cambio de estado. El proyecto sigue una arquitectura de cliente, rutas, controladores y servicios usando Programación Orientada a Objetos (POO).

## Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **MySQL2**
- **Handlebars**
- **Dotenv**
- **Nodemailer**

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

## Endpoints de la API

### Usuarios

- **GET** `/api/v1/usuarios`  
  Retorna todos los usuarios registrados en la base de datos.

- **GET** `/api/v1/usuarios/:id`  
  Retorna un usuario específico según su ID.

- **POST** `/api/v1/usuarios`  
  Crea un nuevo usuario.  
  **Campos requeridos**: `nombre`, `correoElectronico`, `contraseña`.

- **POST** `/api/v1/login`  
  Login de usuario.  
  **Campos requeridos**: `correoElectronico`, `contraseña`.  

- **PUT** `/api/v1/usuarios/:id`  
  Actualiza la información de un usuario existente.  
  **Campos opcionales**: `nombre`, `correoElectronico`, `contraseña`.

- **DELETE** `/api/v1/usuarios/:id`  
  Elimina un usuario existente de la base de datos.

### Tipos de Usuarios

- **GET** `/api/v1/rol`  
  Retorna todos los tipos de usuarios.

- **POST** `/api/v1/rol`  
  Crea un nuevo tipo de usuario.  
  **Campos requeridos**: `descripcion`, `activo`.

### Reclamos

- **GET** `/api/v1/reclamos`  
  Retorna todos los reclamos registrados.

- **GET** `/api/v1/reclamos/:idReclamo`  
  Retorna un reclamo específico según su ID.

- **POST** `/api/v1/reclamos`  
  Crea un nuevo reclamo.  
  **Campos requeridos**: `asunto`, `descripcion`, `idUsuarioCreador`, `idReclamoTipo`, `idReclamoEstado`.

- **PUT** `/api/v1/reclamos/:idReclamo`  
  Actualiza un reclamo existente según su ID.  
  **Campos opcionales**: `asunto`, `descripcion`, `idUsuarioFinalizador`.

- **PUT** `/api/v1/reclamos/:idReclamo/estado`  
  Actualiza el estado de un reclamo y envía un correo electrónico al usuario creador.  
  **Campos requeridos**: `nuevoEstado`.

- **DELETE** `/api/v1/reclamos/:idReclamo`  
  Elimina un reclamo de la base de datos.

### Tipos de Reclamos

- **GET** `/api/v1/reclamosTipo`  
  Retorna todos los tipos de reclamos.

- **POST** `/api/v1/reclamosTipo`  
  Crea un nuevo tipo de reclamo.  
  **Campos requeridos**: `descripcion`, `activo`.

### Estados de Reclamos

- **GET** `/api/v1/reclamosEstado`  
  Retorna todos los estados de reclamos.

- **POST** `/api/v1/reclamosEstado`  
  Crea un nuevo estado de reclamo.  
  **Campos requeridos**: `descripcion`.

### Oficinas

- **GET** `/api/v1/oficinas`  
  Retorna todas las oficinas.

- **POST** `/api/v1/oficinas`  
  Crea una nueva oficina.  
  **Campos requeridos**: `nombre`, `ubicacion`.

---

## Configuración del Correo Electrónico

La API está configurada para enviar correos electrónicos a los usuarios cuando se actualiza el estado de un reclamo. Para ello, se utiliza `Nodemailer` junto con plantillas `Handlebars`.

## Detalles de la Base de Datos

La base de datos está diseñada para incluir las siguientes tablas, que están relacionadas entre sí:

1. **usuarios**: Esta tabla almacena la información de los usuarios, incluyendo su nombre, correo electrónico y contraseña. Cada usuario está asociado a un tipo de usuario.

2. **usuariosTipo**: Define los diferentes tipos de usuarios (cliente, empleado, administrador). Cada usuario en la tabla `usuarios` se asocia a un tipo de usuario mediante una clave foránea.

3. **reclamos**: Almacena los reclamos registrados por los usuarios. Cada reclamo está asociado a un usuario creador y tiene un tipo y estado específicos.

4. **reclamosTipo**: Define los diferentes tipos de reclamos. Cada reclamo en la tabla `reclamos` está asociado a un tipo de reclamo.

5. **reclamosEstado**: Define los posibles estados de un reclamo (abierto, cerrado, cancelado, etc.). Cada reclamo en la tabla `reclamos` tiene un estado asociado.

6. **oficinas**: Almacena información sobre las oficinas de la concesionaria, que pueden estar relacionadas con los reclamos o los usuarios.

### Relaciones

- La tabla `usuarios` tiene una relación de muchos a uno con la tabla `usuariosTipo`, ya que varios usuarios pueden tener el mismo tipo.
- La tabla `reclamos` tiene relaciones de muchos a uno con las tablas `usuarios`, `reclamosTipo` y `reclamosEstado`, indicando que un reclamo es creado por un usuario, tiene un tipo y un estado específico.

### Ejemplo de Creación de Tablas

```sql
CREATE TABLE IF NOT EXISTS usuarios (
    idUsuario int AUTO_INCREMENT NOT NULL UNIQUE,
    nombre varchar(256) NOT NULL,
    correoElectronico varchar(256) NOT NULL UNIQUE,
    contraseña varchar(256) NOT NULL,
    idUsuarioTipo int NOT NULL,
    PRIMARY KEY (idUsuario),
    FOREIGN KEY (idUsuarioTipo) REFERENCES usuariosTipo(idUsuarioTipo)
);

CREATE TABLE IF NOT EXISTS reclamos (
    idReclamo int AUTO_INCREMENT NOT NULL UNIQUE,
    asunto varchar(256) NOT NULL,
    descripcion varchar(256),
    fechaCreado datetime NOT NULL,
    idUsuarioCreador int NOT NULL,
    idReclamoTipo int NOT NULL,
    idReclamoEstado int NOT NULL,
    PRIMARY KEY (idReclamo),
    FOREIGN KEY (idUsuarioCreador) REFERENCES usuarios(idUsuario),
    FOREIGN KEY (idReclamoTipo) REFERENCES reclamosTipo(idReclamoTipo),
    FOREIGN KEY (idReclamoEstado) REFERENCES reclamosEstado(idReclamoEstado)
);
```
  
## Configuración del Entorno

Para configurar la API, es necesario crear un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```DB_HOST=localhost

DB_USER=tu_usuario 

DB_PASSWORD=tu_contraseña 

DB_NAME=tu_base_de_datos 

EMAIL_USER=concesionaria.prog3@gmail.com 

EMAIL_PASS=comq xjcs uurg eqkp
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
`Fernanda Elola, Diego Lalanda, Nahuel Pereyra, Damian Fernandez.`

*Para la asignatura **Programación 3** de la **Tecnicatura Universitaria en Desarrollo Web***

**UNER FCAD**