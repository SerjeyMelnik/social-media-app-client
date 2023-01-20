
import NavigationPanel from '../components/Navigation/NavigationPanel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RegistrationPage from '../pages/RegistrationPage';
import LoginPage from '../pages/LoginPage';
import UserAccountPage from '../pages/UserAccountPage';
import ProfileIdPage from '../pages/ProfileIdPage';
import { useAuthProvider } from '../context-providers/AuthProvider';
import SetUserInfoPage from '../pages/SetUserInfoPage';




function AppRoutes() {
  const {isUserAuthenticated} = useAuthProvider()
 
  return (
    <div className="App">
      <BrowserRouter basename='/social-network-app-client'>
        <NavigationPanel />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
          {
            isUserAuthenticated &&
            <Route path='/user-account' element={<UserAccountPage />} />
          }
          <Route path='/:userId' element={<ProfileIdPage/>} />
          {
            isUserAuthenticated &&
          <Route path='/setuserinfo' element={<SetUserInfoPage/>} />
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
