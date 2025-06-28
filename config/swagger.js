import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestión de Reclamos',
            version: '1.0.0',
            description: 'API RESTful para un sistema de gestión de reclamos, construida con Node.js, Express, PostgreSQL y Sequelize. Permite probar todos los endpoints de forma interactiva.',
        },
        // ¡NUEVA SECCIÓN! Para controlar el orden de los grupos
        tags: [
            {
                name: "Auth",
                description: "Endpoints para registro, login y logout. ¡Empieza por aquí!"
            },
            {
                name: "Reclamos",
                description: "Gestión del ciclo de vida de los reclamos."
            },
            {
                name: "Usuarios",
                description: "Gestión de usuarios clientes."
            },
            {
                name: "Empleados",
                description: "(Admin) Gestión de empleados."
            },
            {
                name: "Oficinas",
                description: "(Admin) Gestión de oficinas."
            },
            {
                name: "Estadisticas",
                description: "(Admin) Métricas y estadísticas del sistema."
            },
            {
                name: "Asignaciones - Usuarios y Oficinas",
                description: "(Admin) Asignación de empleados a oficinas."
            },
            {
                name: "Reclamos - Tipos",
                description: "(Admin) Gestión de los tipos de reclamos."
            },
            {
                name: "Reclamos - Estados",
                description: "(Admin) Gestión de los estados de reclamos."
            },
            {
                name: "Usuarios - Tipos (Roles)",
                description: "(Admin) Gestión de los roles del sistema."
            }
        ],
        servers: [
            { url: 'http://localhost:3000/api/v1', description: 'Servidor Local' },
            { url: 'https://api-reclamos-prog3.onrender.com/api/v1', description: 'Servidor de Producción' } // ¡Recuerda cambiar esto!
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: "Pega aquí el token JWT obtenido del endpoint de /login."
                }
            },
            schemas: {
                Usuario: {
                    type: 'object',
                    properties: {
                        idUsuario: { type: 'integer', example: 1 },
                        nombre: { type: 'string', example: 'Juan' },
                        apellido: { type: 'string', example: 'Pérez' },
                        correoElectronico: { type: 'string', format: 'email', example: 'juan.perez@example.com' },
                        idTipoUsuario: { type: 'integer', example: 3 },
                        activo: { type: 'boolean', example: true }
                    }
                },
                Oficina: {
                    type: 'object',
                    properties: {
                        idOficina: { type: 'integer', example: 1 },
                        nombre: { type: 'string', example: 'Taller Mecánico' },
                        idReclamoTipo: { type: 'integer', example: 1 },
                        activo: { type: 'boolean', example: true }
                    }
                },
                Reclamo: {
                    type: 'object',
                    properties: {
                        idReclamo: { type: 'integer', example: 101 },
                        asunto: { type: 'string', example: 'Ruido en el motor al acelerar' },
                        descripcion: { type: 'string', example: 'El coche hace un ruido metálico cuando supero las 3000 RPM.' },
                        idReclamoEstado: { type: 'integer', example: 1 },
                        idReclamoTipo: { type: 'integer', example: 1 },
                        idUsuarioCreador: { type: 'integer', example: 5 }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'Fallo' },
                        data: {
                            type: 'object',
                            properties: {
                                error: { type: 'string', example: 'Acceso denegado.' }
                            }
                        }
                    }
                }
            }
        },
        security: [{
            bearerAuth: [] // Aplica seguridad JWT por defecto a todas las rutas que la requieran
        }]
    },
    apis: ['./routes/*.js'], // Apunta a los archivos de rutas
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);