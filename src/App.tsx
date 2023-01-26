
import AppRoutes from './components/AppRoutes';
import { AuthProvider } from './context-providers/AuthProvider';
import ChatsProvider from './context-providers/ChatsContextProvider';
import { DeviceContextProvider } from './context-providers/DeviceContextProvider';
import { UserContextProvider } from './context-providers/UserContextProvider';



function App() {
  
  return (
    <AuthProvider>
      <UserContextProvider>
        <DeviceContextProvider>
          <ChatsProvider>
            <AppRoutes/>
          </ChatsProvider>
        </DeviceContextProvider>
      </UserContextProvider>
    </AuthProvider>

  );
}

export default App;
