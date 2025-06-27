# API de Gestión de Reclamos V2.0

<p align="center">
  Una API RESTful robusta y moderna para un sistema de gestión de reclamos de un Concesionaria de Automóviles.
</p>

---

## ✨ Descripción General

La API permite a diferentes tipos de usuarios (Clientes, Empleados, Administradores) interactuar con un sistema de reclamos, desde su creación hasta su resolución, con notificaciones automáticas por correo electrónico.

Se implementa un **ORM (Sequelize)** y una base de datos **PostgreSQL**, lo que la hace más mantenible, escalable y fácil de desplegar.

<br>

## 🚀 Cómo Probar la API

¡Puedes probar toda la API ahora mismo sin instalar nada!

> **[➡️ Acceder a la Documentación Interactiva de la API ⬅️](https://tu-api-en-render.onrender.com/api/v1/api-docs)** 

Sigue estos 3 simples pasos:

1.  **Crea un Administrador**: Ve a la sección `Auth` y usa el endpoint `POST /registro-admin` para crear una cuenta de administrador de prueba.
2.  **Inicia Sesión**: Usa el endpoint `POST /login` con las credenciales que acabas de crear. La respuesta te dará un `token`.
3.  **Autorízate**: Haz clic en el botón verde **"Authorize"** en la parte superior derecha, pega el `token` en el campo y haz clic en "Authorize".

¡Listo! Ahora tienes acceso completo a todos los endpoints protegidos y puedes explorar todas las funcionalidades de la API.

<br>

## 🛠️ Tecnologías y Arquitectura

Este proyecto utiliza un stack tecnológico moderno y una arquitectura por capas para asegurar la separación de responsabilidades y la escalabilidad.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger"/>
  <img src="https://img.shields.io/badge/Neon-05a582?style=for-the-badge&logo=neon&logoColor=white" alt="Neon DB"/>
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" alt="Render"/>
</p>

### Mejoras Clave de la Versión 2.0:
*   **Base de Datos PostgreSQL en Neon:** Migración de MySQL a una base de datos PostgreSQL gestionada en la nube, más robusta y con un excelente plan gratuito.
*   **ORM con Sequelize:** Se reemplazó el acceso a datos con SQL nativo por Sequelize, lo que abstrae la lógica de las consultas, previene inyecciones SQL y facilita las relaciones entre modelos.
*   **Sincronización y Seeding Automático:** La base de datos se estructura (`sync`) y se puebla con datos iniciales (`seed`) automáticamente al arrancar el servidor, haciendo el despliegue trivial.
*   **Documentación Interactiva con Swagger:** Se integró Swagger UI para generar una documentación profesional que permite probar cada endpoint directamente desde el navegador.
*   **Arquitectura Orientada a Servicios:** La lógica de negocio está encapsulada en `Servicios`, manteniendo los `Controladores` delgados y enfocados en manejar el flujo de `request/response`.

<br>

## 👥 Autores

Este proyecto fue realizado con dedicación por:

*   **Fernanda Elola**
*   **Diego Lalanda**

*Para la asignatura **Programación 3** de la **Tecnicatura Universitaria en Desarrollo Web***