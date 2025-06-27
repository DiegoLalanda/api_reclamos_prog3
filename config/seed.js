import db from '../models/index.js';

const { UsuarioTipo, ReclamoEstado, ReclamoTipo } = db;

// Datos iniciales que la aplicación necesita para funcionar
const initialUsuarioTipos = [
    { idUsuarioTipo: 1, descripcion: 'Administrador' },
    { idUsuarioTipo: 2, descripcion: 'Empleado' },
    { idUsuarioTipo: 3, descripcion: 'Cliente' }
];

const initialReclamoEstados = [
    { idReclamoEstado: 1, descripcion: 'Creado' },
    { idReclamoEstado: 2, descripcion: 'En Proceso' },
    { idReclamoEstado: 3, descripcion: 'Cancelado' },
    { idReclamoEstado: 4, descripcion: 'Finalizado' }
];

const initialReclamoTipos = [
    { idReclamoTipo: 1, descripcion: 'Falla Mecánica', activo: true },
    { idReclamoTipo: 2, descripcion: 'Falla Eléctrica', activo: true },
    { idReclamoTipo: 3, descripcion: 'Problema de Chapa y Pintura', activo: true },
    { idReclamoTipo: 4, descripcion: 'Gestión de Documentación', activo: true }
];

// Función para sembrar los datos
export const seedDatabase = async () => {
    try {
        console.log('Iniciando seeder...');

        // Usamos findOrCreate para evitar duplicados si el seeder se ejecuta varias veces
        for (const tipo of initialUsuarioTipos) {
            await UsuarioTipo.findOrCreate({
                where: { idUsuarioTipo: tipo.idUsuarioTipo },
                defaults: tipo
            });
        }

        for (const estado of initialReclamoEstados) {
            await ReclamoEstado.findOrCreate({
                where: { idReclamoEstado: estado.idReclamoEstado },
                defaults: estado
            });
        }
        
        for (const tipo of initialReclamoTipos) {
            await ReclamoTipo.findOrCreate({
                where: { idReclamoTipo: tipo.idReclamoTipo },
                defaults: tipo
            });
        }

        console.log('Seeding completado exitosamente.');

    } catch (error) {
        console.error('Error durante el seeding de la base de datos:', error);
    }
};