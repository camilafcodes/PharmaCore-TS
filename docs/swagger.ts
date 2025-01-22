import { patientDoc, patientIdDoc } from "./patients.docs";



import { userId, Users,  } from "./user.docs1";
import { medicineDoc, medicineIdDoc, medicineNameDoc } from "./medicine.docs";
import { prescriptionDoc, prescriptionIdDoc } from "./prescription.docs";
import { prescriptionItemDoc, prescriptionItemIdDoc } from "./prescriptionItem.docs";
import { doctorDoc, doctorIdDoc } from "./doctor.docs";
import { saleDoc, saleIdDoc } from "./sale.docs";
import { saleItemDoc, saleItemIdDoc } from "./saleItem.docs";
import { notificationDoc } from "./notification.docs";
import { ocrImgDocs, ocrPdfDocs } from "./ocr.docs";
import { chatgptDocs } from "./chatgpt.docs";

export const swaggerOptions = {
    openapi: "3.0.3",
    info: {
        title: "PharmaCore API",
        version: "1.0.0",
        description: "API para gestión de pacientes, médicos y ventas en farmacias.",
        contact: {
            name: "PharmaCore",
            email: "sebastianmejiasanchez1030@gmail.com",
            url: "https://github.com/marcelaW40k/PharmaCore-TS/tree/main",
        }
    },

    servers: [{
        url: "http://localhost:3000",
        description: "Local development server"
    },
    {
        url: "https://pharmacore-ts-production.up.railway.app",
        description: "Production server"
    }],
    paths:{
        "/api/v1/medicine":medicineDoc,
        "/api/v1/patients/":patientDoc,
        "/api/v1/patients/{id}":patientIdDoc,
        "/api/v1/users/":Users,
        "/api/v1/users/{id}":userId,
        "/api/v1/medicine/{id}": medicineIdDoc,
        "/api/v1/medicine/name/{name}": medicineNameDoc,
        "/api/v1/prescriptions": prescriptionDoc,
        "/api/v1/prescriptions/{id}": prescriptionIdDoc,
        "/api/v1/prescriptionitems": prescriptionItemDoc,
        "/api/v1/prescriptionitems/{id}": prescriptionItemIdDoc,
        "/api/v1/sales/": saleDoc,
        "/api/v1/sales/{id}": saleIdDoc,
        "/api/v1/sale_items/": saleItemDoc,
        "/api/v1/sale_items/{id}": saleItemIdDoc,
        "/api/v1/doctors/": doctorDoc,
        "/api/v1/doctors/{id}": doctorIdDoc,
        "/api/v1/notificacion/correo/{id}": notificationDoc,
        "/api/v1/images": ocrImgDocs,
        "/api/v1/pdf": ocrPdfDocs,
        "/api/v1/chatgpt": chatgptDocs
    },

    components: {
        schemas: {
            Medicine: {
                type: "object",
                properties: {
                    id_medicine: { type: "number" },
                    name_medicine: { type: "string" },
                    form: { type: "string" },
                    prescription: { type: "boolean" },
                    quantity_stock: { type: "number" },
                    unit_cost: { type: "number" }
                },
                required: ["id_medicine", "name_medicine", "form", "prescription", "quantity_stock", "unit_cost"]
            },

        }

    }


}