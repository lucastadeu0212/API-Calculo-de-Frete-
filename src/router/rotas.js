const express = require("express");

const { listaDeProdutos, detalharProduto, calcularFrete } = require("../controller/produtos");

const rotas = express();

rotas.get("/produtos", listaDeProdutos);
rotas.get("/produtos/:idProduto", detalharProduto);
rotas.get("/produtos/:idProduto/frete/:cep", calcularFrete);

module.exports = rotas;