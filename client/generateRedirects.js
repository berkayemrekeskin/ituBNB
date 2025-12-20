import fs from 'node:fs';

//
const backendApiUrl = process.env.BACKEND_API_URL;

const redirectContent = `/api/*  ${backendApiUrl}/api/:splat  200\n`;

if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public');
}

fs.writeFileSync('./public/_redirects', redirectContent);
