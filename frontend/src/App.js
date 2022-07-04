import LoginPage from './Screens/loginPage';
import LandingPage from './Screens/landingPage';
import RegisterPage from './Screens/registerPage';
import MyNotes from './Screens/myNotes';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/myEvents' element={<MyNotes/>}/>
        </Routes>
    </Router>
  );
}

export default App;
