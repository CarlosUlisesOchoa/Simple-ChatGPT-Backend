import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple ChatGPT Backend API',
      version: '1.0.0',
      description: 'API documentation for the Simple ChatGPT Backend',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/api/*.ts', './src/index.ts'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export default specs;
