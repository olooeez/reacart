import { Button } from "@material-ui/core";
import { Container, Titulo, InputContainer } from "./styles";
import { Input, InputLabel, InputAdornment } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Login = ({ name, setName, balance, setBalance }) => {
  const history = useHistory();
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
          onChange={(event) => setBalance(event.target.value)}
          startAdornment={<InputAdornment position="start">R$</InputAdornment>}
        />
      </InputContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/fair")}
      >
        Avançar
      </Button>
    </Container>
  );
};

export default Login;
