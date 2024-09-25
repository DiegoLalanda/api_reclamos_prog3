import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

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
                rejectUnauthorized: false, // Solo para desarrollo
            },
        });
    }

    // Lee y compila la plantilla de Handlebars
    compileTemplate(templatePath, context) {
        const templateSource = fs.readFileSync(path.resolve(templatePath), 'utf8');
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
