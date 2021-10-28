import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";

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
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Switch>
            <Route exact path={['/','/Pizzahouse/:category']}>
              <Menu />
            </Route>  
          </Switch>
          <Footer />
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
