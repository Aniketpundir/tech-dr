import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { appRoutes } from './routes';
import './App.css';

const router = createBrowserRouter(appRoutes);
const App = () => <RouterProvider router={router} />;
export default App;
