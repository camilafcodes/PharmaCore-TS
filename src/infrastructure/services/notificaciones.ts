
import { EmailOptions } from "../../domain/models/EmailOptions";
import axios from 'axios'
import config from 'config'

export class NotificacionesService {

    async sendReportByEmail( payload: EmailOptions) {
        let url = config.get<string>('REPORT_SERVICE.URL')
        const response = await axios.post(url, payload)
        const data = response.data
        return data
    }

}