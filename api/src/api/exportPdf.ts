import type { FastifyInstance } from "fastify";
import { getDbClient } from "../db";
import fastifyPlugin from 'fastify-plugin';
import PDFKit from 'pdfkit';

async function exportPdf(server: FastifyInstance) {
  server.get("/reports/export/pdf", {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          startDate: { type: 'string', format: 'date' },
          endDate: { type: 'string', format: 'date' }
        },
        required: ['startDate', 'endDate']
      }
    }
  }, async (request, reply) => {
    const query = request.query as any;
    const db = await getDbClient();
    // Assuming a SQL execution method that returns a promise
    const result = await db.execute("SELECT * FROM leads WHERE DATE(created_at) BETWEEN ? AND ?", [query.startDate, query.endDate]);

    const doc = new PDFKit();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      reply.header('Content-Type', 'application/pdf');
      reply.header('Content-Disposition', 'attachment; filename="report.pdf"');
      reply.send(pdfData);
    });

    // PDF content generation
    doc.fontSize(12).text('Leads Report', 100, 80);
    result.rows.forEach(row => {
      doc.text(`${row.id} - ${row.name} - ${row.email}`, 100);
    });
    doc.end();
  });
}

export default fastifyPlugin(exportPdf);