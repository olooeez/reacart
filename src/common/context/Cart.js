import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();
CartContext.displayName = "Cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [productsQuantatiy, setProductsQuantatiy] = useState(0);

  return (
    <CartContext.Provider value={{ cart, setCart, productsQuantatiy, setProductsQuantatiy }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const { cart, setCart, productsQuantatiy, setProductsQuantatiy } = useContext(CartContext);

  const changeUnit = (id, unit) => {
    return cart.map((cartItem) => {
      if (cartItem.id === id) {
        cartItem.unit += unit;
      }

      return cartItem;
    });
  };

  const addProduct = (newProduct) => {
    const hasProduct = cart.some((cartItem) => cartItem.id === newProduct.id);

    if (!hasProduct) {
      newProduct.unit = 1;
      return setCart((lastCart) => [...lastCart, newProduct]);
    }

    setCart(changeUnit(newProduct.id, 1));
  };

  const removeProduct = (id) => {
    const product = cart.find((cartItem) => cartItem.id === id);
    const isLast = product.unit === 1;

    if (isLast) {
      return setCart((lastCart) =>
        lastCart.filter((cartItem) => cartItem.id !== id)
      );
    }

    setCart(changeUnit(id, -1));
  };

  useEffect(() => {
    const newProductsQuantatiy = cart.reduce((counter, cartItem) => counter + cartItem.unit, 0);
    setProductsQuantatiy(newProductsQuantatiy);
  }, [cart, setProductsQuantatiy])

  return { cart, setCart, addProduct, removeProduct, productsQuantatiy, setProductsQuantatiy };
};
