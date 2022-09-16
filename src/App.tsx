
import NavigationPanel from './components/Navigation/NavigationPanel';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import useFetchData from './fakeAPI/useFetchData';



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavigationPanel />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
