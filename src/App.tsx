import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { FCMHandler } from './components/fcm/FCMHandler';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <FCMHandler />
    </BrowserRouter>
  );
}

export default App;
