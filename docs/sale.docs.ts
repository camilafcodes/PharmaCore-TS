export const saleDoc = {

    post: {
        tags: ["Venta"],
        summary: "Crear una venta",
        description: "Crea una nueva venta en el sistema",
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
                            date_time: {
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
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "examples": {
                        "ejemplo venta": {
                            "value": {
                                "id_patient": "263637",
                                "date_time": "2024-11-28",
                                "items": [
                                    {
                                        "id_medicine": 2,
                                        "quantity": 20
                                    },
                                    {
                                        "id_medicine": 4,
                                        "quantity": 10
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        },
        responses: {
            "200": {
                description: "Venta creada"
            },
            "400": {
                description: "Error en la creación"
            },
            "500": {
                description: "Error de servidor"
            },
            "304": {
                description: "La venta ya existe"
            },
            "409": {
                description: "Error en la validación del payload"
            }
        }
    },
    get: {
        summary: "Obtiene todos los registros de ventas",
        tags: ["Venta"],
        responses: {
            "200": {
                description: "Lista de ventas",
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
                                    date_time: {
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
    put: {
        summary: "Actualiza una venta",
        tags: ["Venta"],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id_sale: {
                                type: "integer"
                            },
                            id_patient: {
                                type: "string"
                            },
                            date_time: {
                                type: "string",
                                format: "date"
                            },
                            sale_total_cost: {
                                type: "number",
                                format: "float"
                            },
                            items: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id_item: {
                                            type: "integer"
                                        },
                                        id_sale: {
                                            type: "number"
                                        },
                                        id_medicine: {
                                            type: "integer"
                                        },
                                        quantity: {
                                            type: "integer"
                                        },
                                        item_total_cost: {
                                            type: "number",
                                            format: "float"
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
            "200": {
                description: "Venta actualizada correctamente"
            },
            "400": {
                description: "Error en la actualización"
            }
        }
    }
}

export const saleIdDoc = {

    get: {
        summary: "Obtiene una venta por ID",
        tags: ["Venta"],
        parameters: [
            {
                in: "path",
                name: "id",
                required: true,
                schema: {
                    type: "integer"
                },
                description: "ID de la venta"
            }
        ],
        responses: {
            "200": {
                description: "Información de la venta",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "integer"
                                },
                                id_patient: {
                                    type: "string"
                                },
                                date_time: {
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
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "404": {
                description: "Venta no encontrada"
            }
        }
    },
    delete: {
        summary: "Elimina una venta por ID",
        tags: ["Venta"],
        parameters: [
            {
                in: "path",
                name: "id",
                required: true,
                schema: {
                    type: "integer"
                },
                description: "ID de la venta a eliminar"
            }
        ],
        responses: {
            "200": {
                description: "Venta eliminada correctamente",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "Venta eliminada correctamente"
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


