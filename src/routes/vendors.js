import express from 'express';
import Product from '../models/Product.js';
import { auth, role } from '../middleware/auth.js';

const router = express.Router();

// DELETE /api/vendors/products/:id - Allow vendors to delete their own products
router.delete('/products/:id', auth, role(['vendor']), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Ensure vendor can only delete their own products
    if (String(product.vendor) !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own products' });
    }
    
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/vendors/products - Get all products for the logged-in vendor
router.get('/products', auth, role(['vendor']), async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user.id });
    res.json(products);
  } catch (error) {
    console.error('Error getting vendor products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
