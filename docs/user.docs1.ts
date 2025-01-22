export const Users = {
  post: {
    tags: ["Usuarios"],
    summary: "Crear una usuario",
    description: "Crea una nuevo usuario en el sistema",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
              },
              password: {
                type: "string",
                minLength: 3,
                maxLength: 20,
              },
              id_role: {
                type: "integer",
              }
              
            },
          },
        },
      },
    },
    responses: {
      "200": {
        description: "usuario creado",
      },
      "400": {
        description: "Error en la creación",
      },
      "500": {
        description: "Error de servidor",
      },
      "304": {
        description: "El usuario ya existe",
      },
      "409": {
        description: "Error en la validación del payload",
      },
    },
  },
  get: {
    summary: "Obtiene todos los registros de usuarios",
    tags: ["Usuarios"],
    responses: {
      "200": {
        description: "Lista de usuarios",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                  },
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                    minLength: 3,
                    maxLength: 20,
                  },
                  id_role: {
                    type: "integer",
                    
                  },
                  
                },
              },
            },
          },
        },
      },
    },
  },
  put: {
    summary: "Actualiza una usuario",
    tags: ["Usuarios"],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id_user: {
                type: "integer",
              },
              email: {
                type: "string",
              },
              password: {
                type: "string",
                minLength: 3,
                maxLength: 20,
              },
              id_role: {
                type: "integer",
        
              },
              
            },
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Usuario  actualizado correctamente",
      },
      "400": {
        description: "Error en la actualización",
      },
    },
  },
};

export const userId = {
  get: {
    summary: "Obtiene una usuario por ID",
    tags: ["Usuarios"],
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "integer",
        },
        description: "ID del usuario",
      },
    ],
    responses: {
      "200": {
        description: "Información del usuario",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                },
                email: {
                  type: "string",
                },
                password: {
                    type: "string",
                    minLength: 3,
                    maxLength: 20,
                  },
              },
            },
          },
        },
      },
      "404": {
        description: "Usuario no encontrado",
      },
    },
  },
  delete: {
    summary: "Elimina una usuario por ID",
    tags: ["Usuarios"],
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "integer",
        },
        description: "ID del usuario a eliminar",
      },
    ],
    responses: {
      "200": {
        description: "usuario eliminado correctamente",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: " Usuario eliminado correctamente",
                },
              },
            },
          },
        },
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
                  example: "Error en la eliminación ",
                },
              },
            },
          },
        },
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
                  example: "Error interno del servidor",
                },
              },
            },
          },
        },
      },
    },
  },
};
