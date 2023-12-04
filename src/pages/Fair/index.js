import { Container, Header, List } from "./styles";
import fair from "./fair.json";
import NavBar from "./NavBar";
import Product from "components/Product";
import { UserContext } from "common/context/User";
import { useContext } from "react";

const Fair = () => {
  const { name, balance } = useContext(UserContext);

  return (
    <Container>
      <NavBar />
      <Header>
        <div>
          <h2>Olá, {name}!</h2>
          <h3>Saldo: R$ {balance}</h3>
        </div>
        <p>Encontre os melhores produtos orgânicos!</p>
      </Header>
      <List>
        <h2>Produtos:</h2>
        {fair.map((product) => (
          <Product {...product} key={product.id} />
        ))}
      </List>
    </Container>
  );
}

export default Fair;
