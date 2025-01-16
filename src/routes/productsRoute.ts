import { Request, Response, NextFunction, Router } from 'express';
import { products as Product } from '../models/entities/products'; // Assuming you have a Product model
import { Sequelize } from 'sequelize';
import authenticateToken, { IsFarmer } from '../helpers/authenticationHelper';
export const productsRoute = Router();

// Create a new product
productsRoute.post('/products',authenticateToken,IsFarmer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
});

// Get all products
productsRoute.get('/products',authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { farmer_id } = req.query;
        const products = await Product.findAll({ where: {
            farmer_id: Number(farmer_id) 
        } });
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

// Get a product by ID
productsRoute.get('/products/:id',authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Update a product by ID
productsRoute.put('/products/:id',authenticateToken,IsFarmer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [updated] = await Product.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedProduct = await Product.findByPk(req.params.id);
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Delete a product by ID
productsRoute.delete('/products/:id',authenticateToken,IsFarmer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleted = await Product.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Product deleted' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        next(error);
    }
});