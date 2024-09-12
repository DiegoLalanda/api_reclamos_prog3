const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Configura el transporte de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Solo para desarrollo
  },
});

// Lee y compila la plantilla de Handlebars
const compileTemplate = (templatePath, context) => {
    const templateSource = fs.readFileSync(path.resolve(__dirname, templatePath), 'utf8');
    const template = handlebars.compile(templateSource);
    return template(context);
  };
  
  const sendEmail = async (to, subject, templatePath, context) => {
    const html = compileTemplate(templatePath, context);
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Correo enviado exitosamente');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw error;
    }
  };
  

module.exports = {
  sendEmail,
};
