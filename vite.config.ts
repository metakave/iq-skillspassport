import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Vite server plugin to handle CSV participant intake
function participantCsvPlugin(): Plugin {
  return {
    name: 'participant-csv-logger',
    configureServer(server) {
      server.middlewares.use('/api/register-participant', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });

        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const { name, email, whatsapp, assessmentType } = data;

            if (!name || !email || !whatsapp) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Name, email, and WhatsApp number are required' }));
              return;
            }

            const dataDir = path.resolve(process.cwd(), 'data');
            if (!fs.existsSync(dataDir)) {
              fs.mkdirSync(dataDir, { recursive: true });
            }

            const csvPath = path.join(dataDir, 'participants.csv');
            const fileExists = fs.existsSync(csvPath);

            // CSV Header if creating new file
            if (!fileExists) {
              const headers = 'Timestamp,Name,Email,WhatsApp Number,Assessment Type\n';
              fs.writeFileSync(csvPath, headers, 'utf8');
            }

            // Escape CSV values
            const clean = (val: string) => `"${String(val || '').replace(/"/g, '""')}"`;
            const timestamp = new Date().toISOString();
            const row = `${clean(timestamp)},${clean(name)},${clean(email)},${clean(whatsapp)},${clean(assessmentType || 'standard-iq')}\n`;

            fs.appendFileSync(csvPath, row, 'utf8');

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Participant logged successfully' }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to record participant', details: err?.message }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), participantCsvPlugin()],
});
