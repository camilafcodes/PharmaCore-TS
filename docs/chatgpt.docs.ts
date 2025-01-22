export const chatgptDocs = {
    post: {
      "summary": "Realiza una pregunta al modelo ChatGPT para obtener información acerca de los productos de la tienda Pharmacore.",
      "tags": ["Consultas chatGPT"],
      "description": "Recibe una pregunta en formato JSON y devuelve la respuesta generada por la API de ChatGPT.",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "question": {
                  "type": "string",
                  "description": "La pregunta que se le envía al modelo ChatGPT.",
                  "example": "¿Cuáles son los efectos secundarios del uso del paracetamol?"
                },
                "productContext": {
                  "type": "string",
                  "description": "Contexto adicional para el modelo ChatGPT.",
                  "example": "El Paracetamol es un medicamento que se utiliza para tratar enfermedades relacionadas con el sistema nervioso."
                }
              }
            },
            "examples": {
              "ejemploPregunta": {
                "value": {
                  "question": "¿Cuáles son los efectos secundarios del uso del paracetamol?",
                  "productContext": "El Paracetamol es un medicamento que se utiliza para tratar enfermedades relacionadas con el sistema nervioso."
                }
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Respuesta generada por ChatGPT",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "answer": {
                    "type": "string",
                    "description": "Respuesta generada por ChatGPT.",
                    "example": "El paracetamol puede causar efectos secundarios como náuseas, vómitos, dolor de cabeza, mareos y somnolencia."
                  }
                }
              },
              "examples": {
                "ejemploRespuesta": {
                  "value": {
                    "answer": "El paracetamol puede causar efectos secundarios como náuseas, vómitos, dolor de cabeza, mareos y somnolencia."
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Error en la solicitud ({ error: 'La pregunta es requerida' }).",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "La pregunta es requerida"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Error del servidor ({ error: 'Error interno del servidor' }).",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "Error interno del servidor"
                  }
                }
              }
            }
          }
        }
      }
    }
  };