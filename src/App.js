//mui theme
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

//router
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//main page
import Navbar from "./components/Navbar/Navbar";
import Menu from "./components/Main/Menu/Menu";
import Footer from "./components/Footer/Footer";
import Order from './components/Main/Order/Order';
import Bill from './components/Main/Bill/Bill'

//admin page
import Admin from './admin/Admin';
import AdminMenu from './admin/AdminMenu/AdminMenu';
import AddForm from './admin/AdminMenu/AddForm/AddForm';
import Deliveries from './admin/ShowBill/Deliveries/Deliveries';
import RoleChange from './admin/RoleChange/RoleChange';
import Staff from './admin/Member/Staff/Staff';
import User from './admin/Member/User/User';
import Total from './admin/Total/Total';
import Seat from './admin/Seat/Seat';

//firebase auth
import { useAuthState } from "react-firebase-hooks/auth";
import { projectAuth } from './firebase/config';

//provider
import PizzaProvider from './context/PizzaContext';
import AdminProvider from './context/AdminContext';


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
          {/* main page routes */}
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
          </Switch>

          {/* admin page routes */}
          <Switch>
            {JSON.parse(localStorage.getItem('currentUser')) && (JSON.parse(localStorage.getItem('currentUser')).role === 'admin' || JSON.parse(localStorage.getItem('currentUser')).role === 'staff') ?
              <AdminProvider>
                <Route exact path={['/admin', '/admin/dine-in']}>
                  <Admin />
                </Route>
                <Route exact path="/admin/deliveries">
                  <Deliveries />
                </Route>
                <Route exact path="/admin/menu">
                  <AdminMenu />
                </Route>
                <Route exact path="/admin/add-menu">
                  <AddForm />
                </Route>
                <Route exact path="/admin/staff">
                  <Staff />
                </Route>
                <Route exact path="/admin/users">
                  <User />
                </Route>
                <Route exact path="/admin/role-change">
                  <RoleChange />
                </Route>
                <Route exact path="/admin/total">
                  <Total />
                </Route>
                <Route exact path="/admin/seat">
                  <Seat />
                </Route>
              </AdminProvider>
              : null
            }
          </Switch>
          <Footer />
        </ThemeProvider>
      </Router>
    </PizzaProvider>
  );
}

export default App;
