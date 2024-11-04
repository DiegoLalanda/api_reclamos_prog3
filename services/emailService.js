import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import { fileURLToPath } from 'url';

// Determinar el directorio base de este archivo para calcular rutas correctamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EmailService {
    constructor() {
        // Configura el transporte de Nodemailer
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false, // Solo para desarrollo, se recomienda eliminar en producción
            },
        });
    }

    // Lee y compila la plantilla de Handlebars con la ruta correcta
    compileTemplate(templatePath, context) {
        // Calcula la ruta absoluta usando `__dirname` y `path.join`
        const absoluteTemplatePath = path.join(__dirname, templatePath);

        // Lee el archivo de plantilla y compílalo usando Handlebars
        const templateSource = fs.readFileSync(absoluteTemplatePath, 'utf8');
        const template = handlebars.compile(templateSource);
        return template(context);
    }

    // Método para enviar correo electrónico
    async sendEmail(to, subject, templatePath, context) {
        const html = this.compileTemplate(templatePath, context);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Correo enviado exitosamente');
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            throw error;
        }
    }
}

export default EmailService;
