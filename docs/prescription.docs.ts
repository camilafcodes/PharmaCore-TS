

export const prescriptionDoc = {
    post:{
        tags:["Recetas"],
        summary: "Obtener lista de recetas",
        description: "Obtener una lista de todos las recetas ingresadas",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id_patient: {
                                type: "string"
                            },
                            id_doctor: {
                                type: "string"
                            },
                            issue_date: {
                                type: "string",
                                format: "date"
                            },
                            items: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id_medicine: {
                                            type: "integer"
                                        },
                                        quantity: {
                                            type: "integer"
                                        },
                                        usage_instructions: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        responses: {
            "201": {
                description: "Receta creada"
            },
            "400": {
                description: "Error en la creación"
            },
            "500": {
                description: "Error de servidor"
            },
            "304": {
                description: "La receta ya existe"
            },
            "409": {
                description: "Error en la validación del payload"
            }
        }
       
    },
    get: {
        summary: "Obtiene todos los registros de las recetas",
        tags: ["Recetas"],
        responses: {
            "200": {
                description: "Lista de recetas",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id_patient: {
                                        type: "string"
                                    },
                                    id_doctor: {
                                        type: "string"
                                    },
                                    issue_date: {
                                        type: "string",
                                        format: "date"
                                    },
                                    items: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                id_medicine: {
                                                    type: "integer"
                                                },
                                                quantity: {
                                                    type: "integer"
                                                },
                                                usage_instructions: {
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
            }
        }
    },
    put:{
        tags:["Recetas"],
        summary: "Actualizar una receta",
        description: "Actualiza una receta en la base de datos",
        required:true,
        requestBody:{
            content:{
                "application/json":{
                    schema:{
                        type: "object",
                        properties: {
                            id_prescription: {
                                type: "integer"
                            },
                            id_patient: {
                                type: "string"
                            },
                            id_doctor: {
                                type: "string"
                            },
                            issue_date: {
                                type: "string",
                                format: "date"
                            },
                            items: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id_item: {
                                            type: "integer"
                                        },
                                        id_prescription: {
                                            type: "integer"
                                        },
                                        id_medicine: {
                                            type: "integer"
                                        },
                                        quantity: {
                                            type: "integer"
                                        },
                                        usage_instructions: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        responses:{
            "200":{
                description: "Receta actualizada correctamente"
            },
            "400":{
                description: "Error en la actualización"
            },
            "500":{
                description: "Error interno del servidor"
            }
        }
    }
    
}

export const prescriptionIdDoc = {
    delete:{
        tags:["Recetas"],
        summary: "Eliminar una receta",
        description: "Elimina una receta de la base de datos",
        parameters:[
            {
                in: "path",
                name: "id",
                required: true,
                schema:{
                    type:"integer"
                },
                description: "Id de la receta a eliminar"
            }
        ],
        responses:{
            "200":{
                description: "Receta eliminada correctamente"
            },
            "404":{
                description: "Receta no encontrada"
            },
            "500":{
                description: "Error interno del servidor"
            }
        }
    },
    //buscar por id
    get:{
        tags:["Recetas"],
        summary: "Buscar una receta ",
        description: "Obtiene una receta por su id",
        parameters:[
            {
                name: "id",
                in: "path",
                required: true,
                schema:{
                    type:"string"
                }
            }
        ],
        responses:{
            "200":{
                description: "Receta obtenida correctamente",
                content:{
                    "application/json":{
                        schema:{
                            $ref: "#/components/schemas/Prescription"
                        }
                    }
                }
            },
            "404":{
                description: "Receta no encontrada"
            },
            "500":{
                description: "Error interno del servidor"
            }
        }
    }
}