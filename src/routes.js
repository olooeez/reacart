import Cart from "pages/Cart";
import Fair from "pages/Fair";
import Login from "pages/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserProvider } from "common/context/User";
import { CartProvider } from "common/context/Cart";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <Route exact path="/">
            <Login />
          </Route>
          <CartProvider>
            <Route path="/fair">
              <Fair />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
          </CartProvider>
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
