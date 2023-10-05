const produtos = require("../database/produtos");
const { getStateFromZipcode } = require("utils-playground");


const listaDeProdutos = async (req, res) => {
    return res.status(200).json(produtos);
};

const detalharProduto = async (req, res) => {
    const idProduto = Number(req.params.idProduto);

    if (isNaN(idProduto)) {
        return res.status(401).json({ mensagem: "O id não é válido." });
    }

    const produto = produtos.find((produto) => {
        return produto.id === idProduto;
    })

    if (!produto) {
        return res.status(404).json({ mensagem: "O produto não está na lista." });
    }

    return res.status(200).json(produto);


};

const calcularFrete = async (req, res) => {

    const idProduto = Number(req.params.idProduto);
    const cep = req.params.cep;


    if (isNaN(idProduto)) {
        return res.status(401).json({ mensagem: "O id não é válido." });
    };

    const produto = produtos.find((produto) => {
        return produto.id === idProduto;
    });

    if (!produto) {
        return res.status(404).json({ mensagem: "O produto não está na lista." });
    };

    try {
        const estado = await getStateFromZipcode(cep);

        let valorDoFrete = 0;

        if (estado === "BA" || estado === "SE" || estado === "AL" || estado === "PE" || estado === "PB") {
            valorDoFrete = produto.valor * 0.10;
            return res.json({
                produto,
                estado,
                frete: valorDoFrete
            })
        }

        if (estado === "RJ" || estado === "SP") {
            valorDoFrete = produto.valor * 0.15;
            return res.json({
                produto,
                estado,
                frete: valorDoFrete
            })
        }

        valorDoFrete = produto.valor * 0.12;
        return res.json({
            produto,
            estado,
            frete: valorDoFrete
        });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }

}


module.exports = {
    listaDeProdutos,
    detalharProduto,
    calcularFrete
}