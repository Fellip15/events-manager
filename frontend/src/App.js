import LoginPage from './Screens/loginPage';
import LandingPage from './Screens/landingPage';
import RegisterPage from './Screens/registerPage';
import MyEvents from './Screens/myEvents';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/myEvents' element={<MyEvents/>}/>
        </Routes>
    </Router>
  );
}

export default App;
