
export const prescriptionItemDoc = {
    post:{
        tags:["Items Receta"],
        summary: "Crear un item de receta",
        description: "Crea un nuevo item receta en la base de datos",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id_prescription: {
                                type: "string"
                            },
                            id_medicine: {
                                type: "string"
                            },
                            quantity: {
                                type: "integer",
                            },
                            usage_instructions: {
                                type: "string"
                            }
                           
                        }
                    }
                }
            }
        },
        responses: {
            "201": {
                description: "Item receta creada"
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
        summary: "Obtener todos los registros en la tabla Item receta",
        tags: ["Items Receta"],
        responses: {
            "200": {
                description: "Lista de Item recetas",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id_prescription: {
                                        type: "string"
                                    },
                                    id_medicine: {
                                        type: "string"
                                    },
                                    quantity: {
                                        type: "integer",
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
    put:{
        tags:["Items Receta"],
        summary: "Actualizar el item de una receta",
        description: "Actualiza una receta en la base de datos",
        required:true,
        requestBody:{
            content:{
                "application/json":{
                    schema:{
                        type: "object",
                        properties: {
                            id_item: {
                                type: "integer"
                            },
                            id_prescription: {
                                type: "string"
                            },
                            id_medicine: {
                                type: "string"
                            },
                            quantity: {
                                type: "integer",
                            },
                            usage_instructions: {
                                type: "string"
                            }
                           
                        }
                    }
                }
            }
        },
        responses:{
            "200":{
                description: "Item de Receta actualizada correctamente"
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

export const prescriptionItemIdDoc = {
    delete:{
        tags:["Items Receta"],
        summary: "Eliminar un item de receta",
        description: "Elimina un item de una receta de la base de datos",
        parameters:[
            {
                in: "path",
                name: "id",
                required: true,
                schema:{
                    type:"integer"
                },
                description: "Id del item de la receta a eliminar"
            }
        ],
        responses:{
            "200":{
                description: "Item de Receta eliminada correctamente"
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
        tags:["Items Receta"],
        summary: "Buscar un item de una receta ",
        description: "Obtener un item de receta por su id",
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
                description: "Item de Receta obtenida correctamente",
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