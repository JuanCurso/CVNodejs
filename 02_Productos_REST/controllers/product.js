
const Product = require("../models/product");

function getProducts(req, res) {
    console.log("GET /api/product");

    Product.find({}, (err, products) => {
        if (err)
           return res.status(500).send({message: `Error al obtener productos en la BD: ${err}`});

        if (!products)
           return res.status(404).send({message: "Productos inexistes en la BD"});
        
        res.status(200).send({products: products});
    });
}

function getProduct(req, res) {
    console.log("GET /api/product/id");

    Product.findById(req.params.id, (err, product) => {
        if (err)
           return res.status(500).send({message: `Error al obtener producto en la BD: ${err}`});

        if (!product)
           return res.status(404).send({message: "Producto inexiste en la BD"});
        
        res.status(200).send({product: product});
    });
}

function addProduct(req, res) {
    console.log("POST /api/product");

    const product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    product.save((err, productSave) => {
        if (err)
            return res.status(500).send({message: `Error al salvar en la BD: ${err}`});
        
        res.status(200).send({product: productSave});
    });
}

function updateProduct(req, res) {
    console.log("PUT /api/product/id");

    Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, product) => {
        if (err)
        return res.status(500).send({message: `Error al actualizar el producto en la BD: ${err}`});

     if (!product)
        return res.status(404).send({message: "Producto inexiste en la BD"});
     
     res.status(200).send({message: "El producto ha sido actualizado"});
    });
}

function deleteProduct(req, res) {
    console.log("DELETE /api/product/id");

    Product.findByIdAndDelete(req.params.id, (err, product) => {
        if (err)
           return res.status(500).send({message: `Error al borrar el producto en la BD: ${err}`});

        if (!product)
           return res.status(404).send({message: "Producto inexiste en la BD"});
        
        res.status(200).send({message: "El producto ha sido eliminado"});
    });
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}