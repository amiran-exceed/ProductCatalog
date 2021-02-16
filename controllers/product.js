const Product = require('../models/Product');
const errorHandler = require('../utils/errorHandler');

module.exports.getAllProducts = (req, res) => {
    Product.find().then(products => {
        res.status(200).json(products);
    }).catch(err => {
        errorHandler(res, err);
    });
};

module.exports.addNewProduct = (req, res) => {
    Product({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
    }).save().then(product => {
        res.status(200).json(product);
    }).catch(err => {
        errorHandler(res, err);
    })

};

module.exports.updateProductById = (req, res) => {
    Product.findOneAndUpdate({_id: req.params.id}, {
        $set: {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
        }
    }, {new: true}).then(product => {
        res.status(200).json(product);
    }).catch(err => {
        errorHandler(res, err);
    });
};

module.exports.deleteProductById = (req, res) => {
    Product.remove({_id: req.params.id}).then(() => {
        res.status(200).json({isDeleted: true, message: 'Product was successfully deleted'});
    }).catch(err => {
        errorHandler(res, err);
    });
};
