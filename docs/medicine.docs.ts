
export const medicineDoc = {
    get:{
        tags:["Medicamentos"],
        summary: "Obtener lista de medicamentos",
        description: "Obtiene una lista de todos los medicamentos disponibles",
        responses:{
            "200":{
                description: "Medicamentos obtenidos correctamente",
                operationId: "getMedicines",
                content:{
                    "application/json":{
                        schemas:{
                                $ref: "#/components/schemas/Medicine"
                        },
                    }
                }
            },
            "500":{
                description: "Error interno del servidor"
            }
        }
    },
    post:{
        tags:["Medicamentos"],
        summary: "Crear un nuevo medicamento",
        description: "Crea un nuevo medicamento en la base de datos",
        requestBody:{
            content:{
                "application/json":{
                    schema:{
                        $ref: "#/components/schemas/Medicine"
                    }
                }
            }
        },
        responses:{
            "201":{
                description: "Medicamento creado correctamente",
                content:{
                    "application/json":{
                        schema:{
                            $ref: "#/components/schemas/Medicine"
                        }
                    }
                }
            },
            "400":{
                description: "Error al validar los datos"
            },
            "500":{
                description: "Error interno del servidor"
            }
        }
    },
    put:{
        tags:["Medicamentos"],
        summary: "Actualizar un medicamento",
        description: "Actualiza un medicamento en la base de datos",
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
        requestBody:{
            content:{
                "application/json":{
                    schema:{
                        $ref: "#/components/schemas/Medicine"
                    }
                }
            }
        },
    },
}

export const medicineIdDoc = {
    delete:{
        tags:["Medicamentos"],
        summary: "Eliminar un medicamento por id",
        description: "Elimina un medicamento de la base de datos",
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
        content:{
            "application/json":{
                schema:{
                    $ref: "#/components/schemas/Medicine"
                }
            }
        },
        responses:{
            "200":{
                description: "Medicamento eliminado correctamente"
            },
            "404":{
                description: "Medicamento no encontrado"
            },
            "400":{
                description: "El medicamento no puede ser eliminado debido a que tiene una venta relacionada"
            },
            "500":{ 
                description: "Error interno del servidor"
            }
        }   
    },
    get:{
        tags:["Medicamentos"],
        summary: "Obtener medicamento por id",
        description: "Obtiene el medicamento requerido",
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
                description: "Medicamento obtenido correctamente",
                operationId: "getMedicines",
                content:{
                    "application/json":{
                        schemas:{
                                $ref: "#/components/schemas/Medicine"
                        },
                    }
                }
            },
            "500":{
                description: "Error interno del servidor"
            }
        }
    },

}
export const medicineNameDoc = {
    get:{
        tags:["Medicamentos"],
        summary: "Obtener medicamento por el nombre",
        description: "Obtener el medicamento requerido con el nombre",
        parameters:[
            {
                name: "name",
                in: "path",
                required: true,
                schema:{
                    type:"string"
                }
            }
        ],
        responses:{
            "200":{
                description: "Medicamentos obtenidos correctamente",
                operationId: "getMedicines",
                content:{
                    "application/json":{
                        schemas:{
                                $ref: "#/components/schemas/Medicine"
                        },
                    }
                }
            },
            "500":{
                description: "Error interno del servidor"
            }
        }
    },

}