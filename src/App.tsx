
import AppRoutes from './components/AppRoutes';
import { AuthProvider } from './context-providers/AuthProvider';
import { DeviceContextProvider } from './context-providers/DeviceContextProvider';
import { UserContextProvider } from './context-providers/UserContextProvider';



function App() {
  
  return (
    <AuthProvider>
      <UserContextProvider>
        <DeviceContextProvider>
          <AppRoutes/>
        </DeviceContextProvider>
      </UserContextProvider>
    </AuthProvider>

  );
}

export default App;
