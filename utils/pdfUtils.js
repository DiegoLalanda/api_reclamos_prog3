import PDFDocument from 'pdfkit';

export default class PDFUtils {
    static async generarInformeReclamos(reclamos, filePath) {
        return new Promise((resolve, reject) => {
            try {
                const doc = new PDFDocument();
                doc.pipe(filePath); // Puedes usar res para enviar el PDF al cliente

                // Encabezado del documento
                doc.fontSize(20).text('Informe de Reclamos', { align: 'center' });
                doc.moveDown();

                // Información de cada reclamo
                reclamos.forEach((reclamo, index) => {
                    doc.fontSize(12).text(`Reclamo #${index + 1}`);
                    doc.fontSize(10).text(`ID: ${reclamo.idReclamo}`);
                    doc.text(`Asunto: ${reclamo.asunto}`);
                    doc.text(`Descripción: ${reclamo.descripcion}`);
                    doc.text(`Estado: ${reclamo.estadoDescripcion}`);
                    doc.text(`Fecha Creación: ${reclamo.fechaCreado}`);
                    doc.text('--------------------------');
                    doc.moveDown();
                });

                doc.end();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
}
