import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Menu from "./components/Main/Menu/Menu";
import Footer from "./components/Footer/Footer";

import PizzaProvider from './context/PizzaContext';
import Admin from './components/Admin/Admin';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <PizzaProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Switch>
            <Route exact path={['/','/Pizzahouse/:category']}>
              <Menu />
            </Route>  
            <Route exact path='/admin'>
              <Admin />
            </Route>
          </Switch>
          <Footer />
        </ThemeProvider>
      </Router>
    </PizzaProvider>
  );
}

export default App;
