import { Button, Snackbar, InputLabel, Select, MenuItem } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useContext, useMemo, useState } from "react";
import { Container, GoBack, TotalContainer, PaymentContainer } from "./styles";
import { useCartContext } from "common/context/Cart";
import Product from "components/Product";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { usePaymentContext } from "common/context/Payment";
import { UserContext } from "common/context/User";

const Cart = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { cart, totalValueCart, makePurchase } = useCartContext();
  const { balance = 0 } = useContext(UserContext);
  const { paymentTypes, paymentMethod, changePaymentMethod } = usePaymentContext();
  const history = useHistory();
  const total = useMemo(() => balance - totalValueCart, [balance, totalValueCart]);

  return (
    <Container>
      <GoBack onClick={() => history.goBack()} />
      <h2>Cart</h2>
      {cart.map(cartItem => (
        <Product {...cartItem} key={cartItem.id} />
      ))}
      <PaymentContainer>
        <InputLabel>Forma de Pagamento</InputLabel>
        <Select value={paymentMethod.id} onChange={(event) => changePaymentMethod(event.target.value)} >
          {paymentTypes.map(type => (
            <MenuItem value={type.id} key={type.id}>{type.name}</MenuItem>
          ))}
        </Select>
      </PaymentContainer>
      <TotalContainer>
        <div>
          <h2>Total no Cart:</h2>
          <span>R$ {totalValueCart.toFixed(2)}</span>
        </div>
        <div>
          <h2>Saldo:</h2>
          <span>R$ {balance.toFixed(2)}</span>
        </div>
        <div>
          <h2>Saldo Total:</h2>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </TotalContainer>
      <Button
        onClick={() => {
          makePurchase();
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
        disabled={total < 0 || cart.length === 0}
      >
        Comprar
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert onClose={() => setOpenSnackbar(false)} severity="success">
          Compra feita com sucesso!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Cart;
