import { post } from "axios";

export const notificationDoc = {
    post: {
        tags: ["Notificaciones"],
        summary: "Envio de correos electronicos",
        description: "Envia un correo electronico a un destinatario",
        parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                schema: {
                    type: "string"
                },
                description: "ID del destinatario"
            }
        ],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            to: {
                                type: "string",
                                format: "email",
                                description: "Correo electrónico del destinatario"
                            }
                        },
                        required: ["to"]
                    },
                    "examples": {
                    "correo": {
                    "value": {
                        "to": "ardilamarcela42@gmail.com"
                    }
                    }
              }
                }
            }
        },
        responses: {
            "200": {
                description: "Correo enviado correctamente",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                ok: {
                                    type: "boolean"
                                },
                                message: {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            },
            "400": {
                description: "Error en la solicitud",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                ok: {
                                    type: "boolean"
                                },
                                message: {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}