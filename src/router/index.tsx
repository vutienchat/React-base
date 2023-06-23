import { createBrowserRouter } from 'react-router-dom';

// Routes
import Auth from './Auth';
import Main from './Main';

const router = createBrowserRouter([
  Auth,
  Main,
  // Fallback
]);

export default router;
