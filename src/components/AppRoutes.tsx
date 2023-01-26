
import NavigationPanel from '../components/Navigation/NavigationPanel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RegistrationPage from '../pages/RegistrationPage';
import LoginPage from '../pages/LoginPage';
import UserAccountPage from '../pages/UserAccountPage';
import ProfileIdPage from '../pages/ProfileIdPage';
import { useAuthProvider } from '../context-providers/AuthProvider';
import SetUserInfoPage from '../pages/SetUserInfoPage';
import Chats from './Chats/Chats';
import { useChatsContext } from '../context-providers/ChatsContextProvider';




function AppRoutes() {
  const {isUserAuthenticated} = useAuthProvider()
  const {isChatOpen} = useChatsContext()
  return (
    <div className="App">
      <BrowserRouter basename='/social-network-app-client'>
        <NavigationPanel />
        <main className={`page-wrapper ${isChatOpen ? 'chat-open' : ''}`}>
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
        </main>
        
        <Chats/>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
