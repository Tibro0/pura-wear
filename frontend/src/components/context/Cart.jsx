import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (product, size = null) => {
    let updatedCart = [...cartData];

    // if cart is empty
    if (cartData.length == 0) {
      updatedCart.push({
        id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
        product_id: product.id,
        size: size,
        title: product.title,
        price: product.price,
        qty: 1,
        image_url: product.image_url,
      });
    } else {
      // if size is not empty
      if (size != null) {
        const isProductExist = updatedCart.find(
          (item) => item.product_id == product.id && item.size == size
        );

        // if product and size combination exist then increase qty
        if (isProductExist) {
          updatedCart = updatedCart.map((item) =>
            item.product_id == product.id && item.size == size
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        } else {
          // If product and size combination not exist then add new item
          updatedCart.push({
            id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
            product_id: product.id,
            size: size,
            title: product.title,
            price: product.price,
            qty: 1,
            image_url: product.image_url,
          });
        }
      } else {
        // When size is null
        const isProductExist = updatedCart.find(
          (item) => item.product_id == product.id
        );

        if (isProductExist) {
          // where product found in cart then increase qty
          updatedCart = updatedCart.map((item) =>
            item.product_id == product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        } else {
          // If product not exist then add new item
          updatedCart.push({
            id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
            product_id: product.id,
            size: size,
            title: product.title,
            price: product.price,
            qty: 1,
            image_url: product.image_url,
          });
        }
      }
    }

    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
