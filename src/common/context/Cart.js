import { createContext, useContext, useEffect, useState } from "react";
import { usePaymentContext } from "./Payment";
import { UserContext } from "./User";

export const CartContext = createContext();
CartContext.displayName = "Cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [productsQuantatiy, setProductsQuantatiy] = useState(0);
  const [totalValueCart, setTotalValueCart] = useState(0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        productsQuantatiy,
        setProductsQuantatiy,
        totalValueCart,
        setTotalValueCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const {
    cart,
    setCart,
    productsQuantatiy,
    setProductsQuantatiy,
    totalValueCart,
    setTotalValueCart,
  } = useContext(CartContext);

  const { paymentMethod } = usePaymentContext();
  const { setBalance } = useContext(UserContext);

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

  const makePurchase = () => {
    setCart([]);
    setBalance(currentBalance => currentBalance - totalValueCart);
  }

  useEffect(() => {
    const { newTotal, newProductsQuantatiy } = cart.reduce(
      (counter, cartItem) => ({
        newProductsQuantatiy: counter.newProductsQuantatiy + cartItem.unit,
        newTotal: counter.newTotal + cartItem.value * cartItem.unit,
      }),
      {
        newProductsQuantatiy: 0,
        newTotal: 0,
      }
    );
    setProductsQuantatiy(newProductsQuantatiy);
    setTotalValueCart(newTotal * paymentMethod.fees);
  }, [cart, setProductsQuantatiy, setTotalValueCart, paymentMethod]);

  return {
    cart,
    setCart,
    addProduct,
    removeProduct,
    productsQuantatiy,
    setProductsQuantatiy,
    totalValueCart,
    makePurchase,
  };
};
