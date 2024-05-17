const express = require('express');
const axios = require('axios');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Receita Federal - Consulta de CNPJ',
      version: '1.0.0',
      description: 'API para consultar dados de CNPJ na Receita Federal',
      contact: {
        name: 'Seu Nome',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
  },
  apis: ['./index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para JSON
app.use(express.json());

/**
 * @swagger
 * /receita/{cnpj}:
 *   get:
 *     summary: Retorna dados de uma empresa pelo CNPJ
 *     parameters:
 *       - in: path
 *         name: cnpj
 *         required: true
 *         description: CNPJ da empresa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados da empresa
 *       404:
 *         description: Empresa não encontrada
 */
app.get('/receita/:cnpj', async (req, res) => {
  const cnpj = req.params.cnpj;
  try {
    // Substitua pela URL real do endpoint da Receita Federal
    const response = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: 'Empresa não encontrada' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
