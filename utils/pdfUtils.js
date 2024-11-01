import PDFDocument from 'pdfkit';
import EstadisticasData from '../database/estadisticasData.js';

export default class PDFUtils {
    static async generarInformeReclamos(reclamos, res) {
        return new Promise(async (resolve, reject) => {
            try {
                const doc = new PDFDocument();
                doc.pipe(res);

                // Encabezado del documento
                doc.fontSize(20).font('Helvetica-Bold').fillColor('black').text('Informe de Reclamos', { align: 'center' });
                doc.moveDown(0.5); // Espaciado

                // Llamada al procedimiento datosPDF para obtener estadísticas
                const datosPDF = await EstadisticasData.getDatosPDF();
                console.log('Datos PDF:', datosPDF);

                if (datosPDF.length > 0) {
                    const estadisticas = datosPDF[0];
                    // Agregar las estadísticas al documento
                    doc.fontSize(14).font('Helvetica-Bold').fillColor('black').text('Estadísticas Generales', { underline: true });
                    doc.moveDown(0.2); // Espaciado
                    doc.fontSize(12).fillColor('black').text(`Total de Reclamos: ${estadisticas.TotalReclamos}`);
                    doc.text(`Reclamos No Finalizados: ${estadisticas.ReclamosNoFinalizados}`);
                    doc.text(`Reclamos Finalizados: ${estadisticas.ReclamosFinalizados}`);
                    doc.text(`Tipo de Reclamo Más Frecuente: ${estadisticas.TipoReclamoFrecuente}`);
                    doc.text(`Cantidad de este Tipo: ${estadisticas.CantidadTipoReclamoFrecuente}`);
                } else {
                    doc.fontSize(12).text('No se encontraron estadísticas disponibles.');
                }
                doc.moveDown(1); // Espaciado adicional

                // Línea divisoria
                doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('black');
                doc.moveDown(1); // Espaciado

                // Información de cada reclamo
                doc.fontSize(14).font('Helvetica-Bold').text('Detalle de Reclamos', { underline: true });
                doc.moveDown(0.5); // Espaciado
                reclamos.forEach((reclamo, index) => {
                    doc.fontSize(12).font('Helvetica-Bold').text(`Reclamo #${index + 1}`);
                    doc.fontSize(10).font('Helvetica').text(`ID: ${reclamo.idReclamo}`);
                    doc.text(`Asunto: ${reclamo.asunto}`);
                    doc.text(`Descripción: ${reclamo.descripcion}`);
                    doc.text(`Estado: ${reclamo.estadoDescripcion}`);
                    doc.text(`Fecha Creación: ${reclamo.fechaCreado}`);
                    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('gray'); // Línea divisoria entre reclamos
                    doc.moveDown(0.5); // Espaciado
                });

                doc.end();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
}
