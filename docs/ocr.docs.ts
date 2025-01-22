export const ocrImgDocs = {
    post: {
        tags: ["Reconocimiento texto (Imagen)"],
        summary: "Procesar un archivo de imagen",
        description: "Se hace un procesado de un archivo de imagen para extraer información o realizar operaciones sobre la imagen.",
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  image: {
                    type: "string",
                    format: "binary",
                    description: "Archivo de imagen a procesar (formato .jpg, .png, etc.)."
                  }
                },
                required: ["image"]
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Imagen procesada correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: {
                        type: "string"
                      },
                      description: "Resultado del procesamiento de la imagen (por ejemplo, texto extraído o resultado de la operación)."
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Error al procesar el archivo de imagen."
          },
          "500": {
            description: "Error interno del servidor."
          }
        }
      }
}

export const ocrPdfDocs = {
    post: {
        tags: ["Reconocimiento texto (PDF)"],
        summary: "Procesar un archivo PDF",
        description: "Se hace un procesado de un archivo PDF para extraer información.",
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  pdf: {
                    type: "string",
                    format: "binary",
                    description: "Archivo PDF a procesar."
                  }
                },
                required: ["pdf"]  // Corregí el nombre del campo requerido de "file" a "pdf"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "PDF procesado correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: {
                        type: "string"
                      },
                      description: "El contenido extraído del PDF."
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Error al procesar el archivo PDF."
          },
          "500": {
            description: "Error interno del servidor."
          }
        }
      }
}