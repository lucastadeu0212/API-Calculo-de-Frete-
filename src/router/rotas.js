const express = require("express");

const { listaDeProdutos, detalhamentoProduto, calcularFrete } = require("../controller/produtos");

const rotas = express();

rotas.get("/produtos", listaDeProdutos);
rotas.get("/produtos/:idProduto", detalhamentoProduto);
rotas.get("/produtos/:idProduto/frete/:cep", calcularFrete);

module.exports = rotas;