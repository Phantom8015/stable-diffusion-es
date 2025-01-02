import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const API_URL = 'https://stablediffusion-two.vercel.app/generate-image';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generate(prompta, cb) {
    let prompt = prompta;
    if (prompt.endsWith('{enhanced}')) {
        prompt = prompt.replace('{enhanced}', "realistic, smoothening, epic cinematic lighting, dark villanous looking background.");
    }

    const generateImage = async () => {
        try {
            const response = await axios.post(API_URL, { prompt }, { responseType: 'arraybuffer' });
            
            if (response.status === 200) {
                const filePath = path.join(__dirname, 'generated_image.jpg');
                fs.writeFileSync(filePath, response.data);
                cb({
                    error: false,
                    results: filePath
                });
                console.log(`Image saved at ${filePath}`);
            } else {
                console.log(`Error: ${response.status} - ${response.statusText}`);
                cb({ error: true });
            }
        } catch (error) {
            console.error('Error generating image:', error);
            cb({ error: true });
        }
    };

    generateImage();
}
