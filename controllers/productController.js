import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {

    if (!isAdmin(req)) {     
        res.json({           
            message: "only admin can create a product."
        });
        return;
    }

    try {
        const productData = req.body;

        const product = new Product(productData);
        await product.save();

        res.json({
            message: "product create successfully.",
            product: product
        });

    } catch (err) {
        res.status(500).json({
            message: "failed to create product."
        });
    }
}

export async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.json(products);

    } catch (err) {
        res.json({
            message: "failed to retrive products."
        });
    }
}




export async function deleteProduct(req, res) {

    if (!isAdmin(req)) {
        res.json({
            message: "only admin can delete a product."
        });
        return;
    }

    const productId = req.params.productId;

    try {
        const deleted = await Product.findByIdAndDelete(productId);

        if (!deleted) {
            res.json({
                message: "product not found."
            });
            return;
        }

        res.json({
            message: "product deleted successfully.",
            deletedProduct: deleted
        });

    } catch (err) {
        res.status(500).json({
            message: "failed to delete product."
        });
    }
}

export async function updateProduct(req, res) {

    if (!isAdmin(req)) {
        return res.json({
            message: "only admin can update a product."
        });
    }

    const productId = req.params.productId;
    const { name, altnames, discription, images, price, labledPrice, category } = req.body;

    const updatedData = { name, altnames, discription, images, price, labledPrice, category };

    // Remove undefined fields (only update provided fields)
    Object.keys(updatedData).forEach(key => updatedData[key] === undefined && delete updatedData[key]);

    try {
        const result = await Product.updateOne(
            { _id: productId },
            { $set: updatedData }
        );

        if (result.matchedCount === 0) {
            return res.json({ message: "product not found." });
        }

        res.json({
            message: "product updated successfully.",
            updatedProduct: updatedData
        });

    } catch (err) {
        res.status(500).json({
            message: "failed to update product."
        });
    }
}

export async function getProductbyId(req,res) {
    try{
        const productId = req.params.productId
        const product = await product.findOne(
            {
                productId:productId
            }
        )
        if(Product==null){
            res.json(
                {
                    message:"product not found."
                }
            )
        }else{
            res.json(product)
        }


    }catch(err){

    }
    
}