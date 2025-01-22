import axios from 'axios';
import FormData from 'form-data';
import config from 'config';

export class OcrService {
    async createImage(buffer: Buffer) {
        const urlImage = config.get<string>('REPORT_SERVICE.URL_OCR');
        const form = new FormData();
        form.append('image', buffer, 'archivo.png'); // Cambiado a createReadStream

        try {
            const response = await axios.post(`${urlImage}/images`, form, {
                headers: {
                    ...form.getHeaders(),
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error calling OCR service:', error);
            throw new Error('Failed to create image');
        }
    }

    async createPdf(buffer: Buffer) {
        const urlPdf = config.get<string>('REPORT_SERVICE.URL_OCR');
        const form = new FormData();
        form.append('pdf', buffer, 'archivo.pdf'); // Cambiado a createReadStream

        try {
            const response = await axios.post(`${urlPdf}/pdf`, form, {
                headers: {
                    ...form.getHeaders(),
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error calling OCR service:', error);
            throw new Error('Failed to create PDF');
        }
    }
}