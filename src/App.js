import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Menu from "./components/Main/Menu/Menu";
import Footer from "./components/Footer/Footer";
import Order from './components/Main/Order/Order';
import PizzaProvider from './context/PizzaContext';
import Admin from './components/Admin/Admin';
import Bill from './components/Main/Bill/Bill'


import { useAuthState } from "react-firebase-hooks/auth";
import { projectAuth } from './firebase/config';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const [user] = useAuthState(projectAuth);

  return (
    <PizzaProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Switch>
            <Route exact path={['/', '/Pizzahouse/:category']}>
              <Menu />
            </Route>
            <Route exact path="/Bill">
              {user && <Bill />}
            </Route>
            <Route exact path="/Order">
              <Order />
            </Route>
            <Route exact path='/admin'>
              {user && user.uid === 'uuImkLWmCieMqZEoteIfTM2ZTz92' ?
                <Admin /> : null}
            </Route>
          </Switch>
          <Footer />
        </ThemeProvider>
      </Router>
    </PizzaProvider>
  );
}

export default App;
