import { Nav } from "./styles";
import { ReactComponent as Logo } from "assets/logo.svg";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { useCartContext } from "common/context/Cart";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = () => {
  const { productsQuantatiy } = useCartContext();
  const history = useHistory();

  return (
    <Nav>
      <Logo />
      <IconButton disabled={productsQuantatiy === 0} onClick={() => history.push("/cart")}>
        <Badge color="primary" badgeContent={productsQuantatiy}>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  );
};

export default NavBar;
