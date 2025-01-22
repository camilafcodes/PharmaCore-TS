import PdfDocument from "pdfkit";
import fs from "fs";
import { SaleReceipt } from "../../domain/models/saleReceipt";
import { generate as random } from "randomstring";

//envolver en promesa
export const CreateSalePdf = (sale: SaleReceipt) => {

    return new Promise<string>((resolve, reject) => {

        try {


            const pdf = new PdfDocument({ margin: 50 });
            const pathPdf = `./static/Factura de venta ${random(10)} - venta${sale.id_sale}.pdf`


            const stream = fs.createWriteStream(pathPdf);
            pdf.pipe(stream);

            const imageWidth = 80;
            const imageHeight = 80;
            const imageX = (pdf.page.width - imageWidth) / 2;
            const saleDateTime = new Date(sale.date_time);
            const formattedDateTime = `${saleDateTime.getDate().toString().padStart(2, '0')}/${(saleDateTime.getMonth() + 1).toString().padStart(2, '0')}/${saleDateTime.getFullYear()} ${saleDateTime.getHours().toString().padStart(2, '0')}:${saleDateTime.getMinutes().toString().padStart(2, '0')}:${saleDateTime.getSeconds().toString().padStart(2, '0')}`;
        
            pdf.image('./images/logo.png', imageX, 0, { width: imageWidth, height: imageHeight });
        
            pdf.moveDown(2); // Añadir espacio después de la imagen
        
            pdf.fillColor("#007BFF").fontSize(20).font("Helvetica-Bold").text("Factura de venta Quickpharma", { align: "center" }).moveDown(1);
        
            pdf.fontSize(12).font("Helvetica");
            pdf.fillColor("#000000").font("Helvetica-Bold").text(`Número de la venta: `, { continued: true }).font("Helvetica").text(`${sale.id_sale}`).moveDown(0.5);
            pdf.fillColor("#000000").font("Helvetica-Bold").text(`Identificación del paciente: `, { continued: true }).font("Helvetica").text(`${sale.id_patient}`).moveDown(0.5);
            pdf.fillColor("#000000").font("Helvetica-Bold").text(`Fecha y hora de la venta: `, { continued: true }).font("Helvetica").text(`${formattedDateTime}`).moveDown(0.5);
            pdf.fillColor("#000000").font("Helvetica-Bold").text(`Valor total de la venta: `, { continued: true }).font("Helvetica").text(`$${sale.sale_total_cost.toFixed(2)}`).moveDown(1);
        
            pdf.fillColor("#007BFF").fontSize(14).font("Helvetica-Bold").text("Detalle de la compra:").moveDown(0.5);


            const tableHeaders = ["Nombre del medicamento", "Unidades", "Costo unidad", "Costo total"];
            const columnWidths = [180, 100, 100, 150];
            const startX = pdf.page.margins.left;
            let currentY = pdf.y;

            
            pdf.rect(startX, currentY, columnWidths.reduce((a, b) => a + b, 0), 20).fill("#007BFF").stroke();
            pdf.font("Helvetica-Bold").fontSize(12).fillColor("#FFFFFF");
            
            tableHeaders.forEach((header, index) => {
                const x = columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
                pdf.text(header, startX + x + 5, currentY + 5, {
                    width: columnWidths[index] - 10,
                    align: "left",
                    ellipsis: true
                });
            });

            currentY += 20;
            pdf.font("Helvetica").fontSize(10).fillColor("#000000");


            sale.items.forEach((item, index) => {
                const rowValues = [
                    item.name_medicine,
                    item.quantity.toString(),
                    `$${item.unit_cost.toFixed(2)}`,
                    `$${item.total_cost_item.toFixed(2)}`
                ];

                const rowColor = index % 2 === 0 ? "#F0F0F0" : "#FFFFFF";
                pdf.rect(startX, currentY, columnWidths.reduce((a, b) => a + b, 0), 20).fill(rowColor).stroke();

                rowValues.forEach((value, index) => {
                    const x = columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
                    pdf.fillColor("#000000").text(value, startX + x, currentY, {
                        width: columnWidths[index],
                        align: "left",
                        ellipsis: true
                    });
                });

                currentY += 20;


                if (currentY > pdf.page.height - pdf.page.margins.bottom - 30) {
                    pdf.addPage();
                    currentY = pdf.page.margins.top;
                }
            });


            pdf.end();


            stream.on("finish", () => {
                console.log(`PDF generado: ${`./static/Factura de venta ${sale.id_sale}.pdf`}`);
                resolve(pathPdf);
            });
        }
        catch (error) {
            console.error("Error al generar el PDF:", error);
            reject(error);
        }
    })
}
