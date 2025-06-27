import PDFDocument from 'pdfkit';
import {
    obtenerTotalReclamosPorEstado,
    obtenerTotalReclamosPorTipo
} from '../services/estadisticasService.js';
import db from '../models/index.js'; // Necesitamos db para contar el total

const { Reclamo } = db;

export default class PDFUtils {
    static async generarInformeReclamos(reclamos, res) {
        return new Promise(async (resolve, reject) => {
            try {
                const doc = new PDFDocument({ margin: 50 });
                doc.pipe(res);

                // --- Encabezado del documento ---
                doc.fontSize(20).font('Helvetica-Bold').text('Informe de Reclamos', { align: 'center' });
                doc.moveDown(1);

                // --- Sección de Estadísticas ---
                doc.fontSize(16).font('Helvetica-Bold').text('Estadísticas Generales', { underline: true });
                doc.moveDown(0.5);
                
                // Obtenemos los datos para las estadísticas usando Sequelize
                const totalReclamos = await Reclamo.count();
                const estados = await obtenerTotalReclamosPorEstado();
                const tipos = await obtenerTotalReclamosPorTipo();

                const reclamosFinalizados = estados.find(e => e.get('estado') === 'Finalizado')?.get('total') || 0;
                const reclamosNoFinalizados = totalReclamos - reclamosFinalizados;

                // Encontrar el tipo más frecuente
                const tipoMasFrecuente = tipos.reduce((max, tipo) => (tipo.get('total') > max.get('total') ? tipo : max), tipos[0] || { get: () => 'N/A' });

                // Agregar las estadísticas al documento
                doc.fontSize(12).font('Helvetica');
                doc.text(`- Total de Reclamos: ${totalReclamos}`);
                doc.text(`- Reclamos Finalizados: ${reclamosFinalizados}`);
                doc.text(`- Reclamos No Finalizados: ${reclamosNoFinalizados}`);
                doc.text(`- Tipo de Reclamo Más Frecuente: ${tipoMasFrecuente.get('tipo')} (${tipoMasFrecuente.get('total')} casos)`);
                doc.moveDown(1.5);

                // --- Línea divisoria ---
                doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
                doc.moveDown(1);

                // --- Detalle de Reclamos ---
                doc.fontSize(16).font('Helvetica-Bold').text('Detalle de Reclamos', { underline: true });
                doc.moveDown(1);

                reclamos.forEach((reclamo, index) => {
                    const reclamoData = reclamo.get({ plain: true }); // Obtenemos el objeto plano

                    doc.fontSize(12).font('Helvetica-Bold').text(`Reclamo #${reclamoData.idReclamo}`, { continued: true });
                    doc.font('Helvetica').text(` (Estado: ${reclamoData.ReclamoEstado.descripcion})`);

                    doc.fontSize(10).font('Helvetica-Oblique').fillColor('gray');
                    doc.text(`Creado por: ${reclamoData.creador.nombre} ${reclamoData.creador.apellido} el ${new Date(reclamoData.fechaCreado).toLocaleDateString()}`);
                    doc.moveDown(0.5);

                    doc.fontSize(11).font('Helvetica-Bold').fillColor('black');
                    doc.text(`Asunto: `, { continued: true, underline: false });
                    doc.font('Helvetica').text(reclamoData.asunto);

                    doc.font('Helvetica-Bold');
                    doc.text(`Descripción: `, { continued: true });
                    doc.font('Helvetica').text(reclamoData.descripcion || 'Sin descripción.');
                    
                    doc.moveDown(1.5);

                    // Línea divisoria suave entre reclamos
                    if (index < reclamos.length - 1) {
                        doc.strokeColor('#dddddd').lineWidth(0.5).moveTo(70, doc.y).lineTo(530, doc.y).stroke();
                        doc.moveDown(1);
                    }
                });

                // Finalizar el PDF
                doc.end();
                res.on('finish', resolve); // Resolvemos la promesa cuando el stream de respuesta finaliza

            } catch (error) {
                console.error("Error al generar el PDF:", error);
                // Si el stream ya empezó, no podemos enviar un error 500
                if (!res.headersSent) {
                    res.status(500).send('Error al generar el informe PDF.');
                }
                reject(error);
            }
        });
    }
}