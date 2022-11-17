
import AppRoutes from './components/AppRoutes';
import { DeviceContextProvider } from './context-providers/DeviceContextProvider';
import { UserContextProvider } from './context-providers/UserContextProvider';



function App() {
  
  return (
    <UserContextProvider>
      <DeviceContextProvider>
        <AppRoutes/>
      </DeviceContextProvider>
    </UserContextProvider>

  );
}

export default App;
