import { Button } from "@material-ui/core";
import { Container, Titulo, InputContainer } from "./styles";
import { Input, InputLabel, InputAdornment } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { UserContext } from "common/context/User";
import { useContext } from "react";

const Login = () => {
  const history = useHistory();
  const { name, setName, balance, setBalance } = useContext(UserContext);

  return (
    <Container>
      <Titulo>Insira o seu nome</Titulo>
      <InputContainer>
        <InputLabel>Nome</InputLabel>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>Saldo</InputLabel>
        <Input
          type="number"
          value={balance}
          onChange={(event) => setBalance(Number.parseFloat(event.target.value))}
          startAdornment={<InputAdornment position="start">R$</InputAdornment>}
        />
      </InputContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/fair")}
        disabled={name.length < 4 || parseFloat(balance) <= 0}
      >
        Avançar
      </Button>
    </Container>
  );
};

export default Login;
