
import NavigationPanel from '../components/Navigation/NavigationPanel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RegistrationPage from '../pages/RegistrationPage';
import LoginPage from '../pages/LoginPage';

import { useUserContext } from '../hooks/useUserContext';
import UserAccountPage from '../pages/UserAccountPage';
import ProfileIdPage from '../pages/ProfileIdPage';




function AppRoutes() {
  const userContext = useUserContext();
 
  return (
    <div className="App">
      <BrowserRouter basename='/social-network-app-client'>
        <NavigationPanel />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
          {
            userContext.isUserAuthenticated &&
            <Route path='/user-account' element={<UserAccountPage />} />
          }
          <Route path='/:userId' element={<ProfileIdPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
