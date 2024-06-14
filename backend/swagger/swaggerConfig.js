// swagger/swaggerConfig.js
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My Clothing Store API",
      version: "1.0.0",
      description: "API documentation for My Clothing Store",
    },
    servers: [
      {
        url: "http://localhost:7777",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
