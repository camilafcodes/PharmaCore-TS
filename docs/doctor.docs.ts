export const doctorDoc = {

    post: {
        tags: ["Doctores"],
        summary: "Registra un nuevo doctor",
        description: "Registra un nuevo doctor en el sistema",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id_doctor: {
                                type: "integer",
                            },
                            name: {
                                type: "string",
                            },
                            last_name: {
                                type: "string",

                            }
                        }
                    }
                }
            }
        },
        responses: {
            "200": {
                description: "Doctor Registrado"
            },
            "400": {
                description: "Error en la creación"
            },
            "500": {
                description: "Error de servidor"
            },
            "304": {
                description: "El doctor ya existe"
            },
            "409": {
                description: "Error en la validación del payload"
            }
        }
    },
    get: {
        summary: "Obtiene todos los registros de doctores",
        tags: ["Doctores"],
        responses: {
            "200": {
                description: "Lista de doctores",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id_doctor: {
                                        type: "number"
                                    },
                                    name: {
                                        type: "string",
                                    },
                                    last_name: {
                                        type: "string",

                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    put: {
        summary: "Actualiza un Doctor",
        tags: ["Doctores"],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id_doctor: {
                                type: "integer"
                            },
                            name: {
                                type: "string"
                            },
                            last_name: {
                                type: "string"
                            }

                        }
                    }
                }
            }
        },
        responses: {
            "200": {
                description: "Doctor actualizado correctamente"
            },
            "400": {
                description: "Error en la actualización"
            }
        }
    }
}

export const doctorIdDoc = {

    get: {
        summary: "Obtiene un doctor por ID",
        tags: ["Doctores"],
        parameters: [
            {
                in: "path",
                name: "id",
                required: true,
                schema: {
                    type: "integer"
                },
                description: "ID del doctor"
            }
        ],
        responses: {
            "200": {
                description: "Información del doctor",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                id_doctor: {
                                    type: "integer"
                                },
                                name: {
                                    type: "string"
                                },
                                last_name: {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            },
            "404": {
                description: "Doctor no encontrado"
            }
        }
    },
    delete: {
        summary: "Elimina un doctor por ID",
        tags: ["Doctores"],
        parameters: [
            {
                in: "path",
                name: "id",
                required: true,
                schema: {
                    type: "integer"
                },
                description: "ID del doctor a eliminar"
            }
        ],
        responses: {
            "200": {
                description: "Doctor eliminado correctamente",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "Doctor eliminado correctamente"
                                }
                            }
                        }
                    }
                }
            },
            "400": {
                description: "Error en la eliminación",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                error: {
                                    type: "string",
                                    example: "Error en la eliminación de la venta"
                                }
                            }
                        }
                    }
                }
            },
            "500": {
                description: "Error de servidor",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                error: {
                                    type: "string",
                                    example: "Error interno del servidor"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


