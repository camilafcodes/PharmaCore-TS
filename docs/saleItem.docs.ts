export const saleItemDoc = {

    post: {
        tags: ["Item"],
        summary: "Crear un item",
        description: "Crea un nuevo item en el sistema",
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
                            id_medicine: {
                                type: "integer",
                            },
                            quantity: {
                                type: "integer"
                            }

                        }
                    }
                }
            }
        },
        responses: {
            "200": {
                description: "Item creado"
            },
            "400": {
                description: "Error en la creación"
            },
            "500": {
                description: "Error de servidor"
            },
            "304": {
                description: "El Item ya existe"
            },
            "409": {
                description: "Error en la validación del payload"
            }
        }
    },
    get: {
        summary: "Obtiene todos los registros de Items",
        tags: ["Item"],
        responses: {
            "200": {
                description: "Lista de Items",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id_item: {
                                        type: "number"
                                    },
                                    id_sale: {
                                        type: "number",
                                    },
                                    id_meedicine: {
                                        type: "number",
                                    },
                                    quantity: {
                                        type: "number"
                                    },
                                    total_cost_item: {
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
    put: {
        summary: "Actualiza un item de venta",
        tags: ["Item"],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id_item: {
                                type: "integer"
                            },
                            id_sale: {
                                type: "integer"
                            },
                            id_medicine: {
                                type: "number"
                            },
                            quantity: {
                                type: "number"
                            },
                            total_cost_item: {
                                type: "number",
                                format: "float",

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

export const saleItemIdDoc = {

    get: {
        summary: "Obtiene un item por ID",
        tags: ["Item"],
        parameters: [
            {
                in: "path",
                name: "id",
                required: true,
                schema: {
                    type: "integer"
                },
                description: "ID del item"
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
                                id_sale: {
                                    type: "number",
                                },
                                id_meedicine: {
                                    type: "number",
                                },
                                quantity: {
                                    type: "number"
                                },
                                total_cost_item: {
                                    type: "number",
                                    format: "float"
                                },

                            }
                        }
                    }
                }
            },
            "404": {
                description: "item no encontrado"
            }
        }
    },
    delete: {
        summary: "Elimina un item por ID",
        tags: ["Item"],
        parameters: [
            {
                in: "path",
                name: "id",
                required: true,
                schema: {
                    type: "integer"
                },
                description: "ID del item a eliminar"
            }
        ],
        responses: {
            "200": {
                description: "item eliminado correctamente",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "item eliminado correctamente"
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
                                    example: "Error en la eliminación del item"
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
