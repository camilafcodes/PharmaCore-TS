

import axios from 'axios'
import config from 'config'

export class ChatgptService {

    async sendReportByEmail(question: string, productContext?: string) {
        let url = config.get<string>('REPORT_SERVICE.URL_CHATGPT')
        const response = await axios.post(url, { question, productContext })
        const data = response.data
        return data
    }

}