
import NavigationPanel from '../components/Navigation/NavigationPanel';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RegistrationPage from '../pages/RegistrationPage';
import LoginPage from '../pages/LoginPage';
import { auth , app} from '../firebase/firebase';
import { useUserContext } from '../hooks/useUserContext';
import UserAccountPage from '../pages/UserAccountPage';




function AppRoutes() {
  const userContext = useUserContext();
 
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationPanel />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
          {
            userContext.isUserAuthenticated &&
            <Route path='/user-account' element={<UserAccountPage />} />
          }
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
