import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PrimeTrade Task Manager API',
      version: '1.0.0',
      description: 'A scalable REST API with authentication and role-based access control',
      contact: {
        name: 'API Support',
        email: 'support@primetrade.ai'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            name: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin']
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            title: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            status: {
              type: 'string',
              enum: ['pending', 'in-progress', 'completed']
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high']
            },
            dueDate: {
              type: 'string',
              format: 'date-time'
            },
            createdBy: {
              type: 'string'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Auth',
        description: 'Authentication and user management endpoints'
      },
      {
        name: 'Tasks',
        description: 'Task management endpoints'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };