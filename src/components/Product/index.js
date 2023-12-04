import { Container } from "./styles";
import { memo, useContext } from "react";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useCartContext } from "common/context/Cart";

const Product = ({ name, photo, id, value, unit }) => {
  const { cart, addProduct, removeProduct } = useCartContext();
  const productInCart = cart.find(cartItem => cartItem.id === id);

  return (
    <Container>
      <div>
        <img src={`/assets/${photo}.png`} alt={`foto de ${name}`} />
        <p>
          {name} - R$ {value?.toFixed(2)} <span>Kg</span>
        </p>
      </div>
      <div>
        <IconButton color="secondary" onClick={() => removeProduct(id)} disabled={!productInCart}>
          <RemoveIcon />
        </IconButton>
        {productInCart?.unit || 0}
        <IconButton color="primary" onClick={() => addProduct({ name, photo, id, value, unit })}>
          <AddIcon />
        </IconButton>
      </div>
    </Container>
  );
};

export default memo(Product);
