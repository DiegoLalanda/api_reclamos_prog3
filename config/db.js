import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Validamos que la DATABASE_URL exista
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL no está definida en el archivo .env');
}

// Creamos la instancia de Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        // Neon y otros proveedores cloud requieren SSL
        ssl: {
            require: true,
            rejectUnauthorized: false // Necesario para evitar errores de certificado
        }
    },
    logging: false,
});

export default sequelize;