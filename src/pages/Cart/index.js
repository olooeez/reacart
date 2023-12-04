import { Button, Snackbar, InputLabel } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";
import { Container, GoBack, TotalContainer, PaymentContainer } from "./styles";

const Cart = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  return (
    <Container>
      <GoBack />
      <h2>Cart</h2>
      <PaymentContainer>
        <InputLabel>Forma de Pagamento</InputLabel>
      </PaymentContainer>
      <TotalContainer>
        <div>
          <h2>Total no Cart:</h2>
          <span>R$</span>
        </div>
        <div>
          <h2>Saldo:</h2>
          <span>R$</span>
        </div>
        <div>
          <h2>Saldo Total:</h2>
          <span>R$</span>
        </div>
      </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
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
