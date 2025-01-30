const CartRepo = require('../repos/cart.repo');
const Product = require('../models/product.model');

class CartService {
    // Add item to cart
    static async addToCart(customerId, productId, quantity) {
        try {
            // 1. Check if product exists
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('Product not found');
            }

            // 2. Check if requested quantity is available in stock
            if (quantity > product.stockQuantity) {
                throw new Error(`Requested quantity exceeds available stock. Available stock: ${product.stockQuantity}`);
            }

            // 3. Retrieve the cart or create it if it doesn't exist
            let cart;
            try {
                cart = await CartRepo.findCartByCustomerId(customerId);
            } catch (error) {
                if (error.message === 'Cart not found') {
                    cart = await CartRepo.createCart({
                        customerId,
                        items: [],
                        totalAmount: 0,
                    });
                } else {
                    throw new Error("Failed to retrieve or create cart");
                }
            }

            // 4. Check if the product is already in the cart
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                // 4.1 If quantity is reduced
                if (quantity < cart.items[itemIndex].quantity) {
                    cart.items[itemIndex].quantity = quantity;
                } else {
                    // 4.2 If quantity is increased
                    if (cart.items[itemIndex].quantity + quantity > product.stockQuantity) {
                        throw new Error(`Requested quantity exceeds available stock. Available stock: ${product.stockQuantity}`);
                    }
                    cart.items[itemIndex].quantity += quantity;
                }
            } else {
                // 4.3 Add new item to the cart
                cart.items.push({
                    productId,
                    sellerId: product.sellerinfo.id, 
                    quantity,
                    price: product.price,
                });
            }

            // 5. Update total amount
            cart.totalAmount = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

            // 6. Save the updated cart
            const updatedCart = await CartRepo.updateCart(customerId, {
                items: cart.items,
                totalAmount: cart.totalAmount,
            });

            return updatedCart;
        } catch (error) {
            console.error("Error in addToCart:", error.message);
            throw new Error('Error adding item to cart: ' + error.message);
        }
    }
}

module.exports = CartService;
