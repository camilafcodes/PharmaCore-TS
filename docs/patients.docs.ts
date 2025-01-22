
// Rutas generales (POST, GET para todos los pacientes, PUT)
export const patientDoc = {
  "post": {
    "summary": "Crear paciente",
    "description": "Crea un nuevo paciente en la base de datos.",
    "tags": ["Pacientes"],
    "requestBody": {
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/Patient"
          },
          "examples": {
            "ejemploPaciente": {
              "value": {
                "id_patient": "12354",
                "name": "Juan",
                "last_name": "Pérez",
                "birth_date": "1990-01-01",
                "known_allergies": "Penicilina",
                "insurance_number": "123456789"
              }
            }
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Paciente creado exitosamente.",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/Patient"
            },
            "examples": {
              "ejemploRespuesta": {
                "value": {
                  "id_patient": "12354",
                  "name": "Juan",
                  "last_name": "Pérez",
                  "birth_date": "1990-01-01",
                  "known_allergies": "Penicilina",
                  "insurance_number": "123456789"
                }
              }
            }
          }
        }
      },
      "400": {
        "description": "Error al crear el paciente."
      },
      "500": {
        "description": "Error interno del servidor."
      }
    }
  },
  "get": {
    "summary": "Obtener todos los pacientes",
    "description": "Devuelve una lista de todos los pacientes registrados.",
    "tags": ["Pacientes"],
    "responses": {
      "200": {
        "description": "Lista de pacientes.",
        "content": {
          "application/json": {
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Patient"
              }
            },
            "examples": {
              "ejemploRespuesta": {
                "value": [
                  {
                    "id_patient": "12354",
                    "name": "Juan",
                    "last_name": "Pérez",
                    "birth_date": "1990-01-01",
                    "known_allergies": "Penicilina",
                    "insurance_number": "123456789"
                  },
                  {
                    "id_patient": "6789",
                    "name": "María",
                    "last_name": "García",
                    "birth_date": "1985-05-10",
                    "known_allergies": "Ninguna",
                    "insurance_number": "987654321"
                  }
                ]
              }
            }
          }
        }
      },
      "500": {
        "description": "Error interno del servidor."
      }
    }
  },
  "put": {
    "summary": "Actualizar paciente",
    "description": "Actualiza los datos de un paciente existente.",
    "tags": ["Pacientes"],
    "requestBody": {
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/Patient"
          },
          "examples": {
            "ejemploPaciente": {
              "value": {
                "id_patient": "12354",
                "name": "Juan",
                "last_name": "Pérez",
                "birth_date": "1990-01-01",
                "known_allergies": "Penicilina",
                "insurance_number": "123456789"
              }
            }
          }
        }
      }
    },
    "responses": {
      "201": {
        "description": "Paciente actualizado exitosamente.",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                },
                "data": {
                  "$ref": "#/components/schemas/Patient"
                }
              }
            },
            "examples": {
              "ejemploRespuesta": {
                "value": {
                  "message": "Paciente actualizado exitosamente.",
                  "data": {
                    "id_patient": "12354",
                    "name": "Juan",
                    "last_name": "Pérez",
                    "birth_date": "1990-01-01",
                    "known_allergies": "Penicilina",
                    "insurance_number": "123456789"
                  }
                }
              }
            }
          }
        }
      },
      "404": {
        "description": "Paciente no encontrado."
      },
      "500": {
        "description": "Error interno del servidor."
      }
    }
  },
  "components": {
    "schemas": {
      "Patient": {
        "type": "object",
        "properties": {
          "id_patient": {
            "type": "string",
            "description": "ID único del paciente."
          },
          "name": {
            "type": "string",
            "description": "Nombre del paciente."
          },
          "last_name": {
            "type": "string",
            "description": "Apellido del paciente."
          },
          "birth_date": {
            "type": "string",
            "format": "date",
            "description": "Fecha de nacimiento del paciente."
          },
          "known_allergies": {
            "type": "string",
            "description": "Alergias conocidas del paciente."
          },
          "insurance_number": {
            "type": "string",
            "description": "Número de seguro del paciente."
          }
        },
        "required": ["id_patient", "name", "last_name", "birth_date"]
      }
    }
  }
};

// Rutas específicas por ID (GET por ID, DELETE)
export const patientIdDoc = {
  "get": {
    "summary": "Obtener paciente por ID",
    "description": "Devuelve los datos de un paciente específico por su ID.",
    "tags": ["Pacientes"],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "integer"
        },
        "description": "ID del paciente."
      }
    ],
    "responses": {
      "200": {
        "description": "Datos del paciente.",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/Patient"
            },
            "examples": {
              "ejemploRespuesta": {
                "value": {
                  "id_patient": "12354",
                  "name": "Juan",
                  "last_name": "Pérez",
                  "birth_date": "1990-01-01",
                  "known_allergies": "Penicilina",
                  "insurance_number": "123456789"
                }
              }
            }
          }
        }
      },
      "404": {
        "description": "Paciente no encontrado."
      },
      "500": {
        "description": "Error interno del servidor."
      }
    }
  },
  "delete": {
    "summary": "Eliminar paciente",
    "description": "Elimina un paciente de la base de datos por su ID.",
    "tags": ["Pacientes"],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        },
        "description": "ID del paciente."
      }
    ],
    "responses": {
      "200": {
        "description": "Paciente eliminado exitosamente.",
        "content": {
          "application/json": {
            "examples": {
              "ejemploRespuesta": {
                "value": "Paciente eliminado exitosamente."
              }
            }
          }
        }
      },
      "404": {
        "description": "Paciente no encontrado."
      },
      "500": {
        "description": "Error interno del servidor."
      }
    }
  }
};
