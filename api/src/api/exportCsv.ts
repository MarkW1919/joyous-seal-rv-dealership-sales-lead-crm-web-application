import type { FastifyInstance } from "fastify";
import { getDbClient } from "../db";
import fastifyPlugin from 'fastify-plugin';
import { Readable } from 'stream';

async function exportCsv(server: FastifyInstance) {
  server.get("/reports/export/csv", {
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
    const csv = 'id,name,email\n' + result.rows.map(row => `${row.id},${row.name},${row.email}`).join('\n');

    const stream = Readable.from(csv);
    reply.header('Content-Type', 'text/csv');
    reply.header('Content-Disposition', 'attachment; filename="report.csv"');
    reply.send(stream);
  });
}

export default fastifyPlugin(exportCsv);