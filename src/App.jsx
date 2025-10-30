import { 
  createBrowserRouter,  
  RouterProvider,
} from 'react-router-dom';
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import ComingSoonPage from './pages/ComingSoonPage.jsx';
import CreateTaskPage from './pages/CreateTaskPage.jsx';
import EditJobPage from './pages/EditJobPage.jsx';
import { taskLoader } from './api.js';

const App = () => {

  const router = createBrowserRouter([
    { 
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/categories',
          element: <CategoriesPage />
        },
        {
          path: '/create',
          element: <CreateTaskPage />,
          loader: taskLoader
        },
        {
          path: '/edit/:id',
          element: <EditJobPage />,
          loader: taskLoader
        },
        {
          path: '*',
          element: <ComingSoonPage />
        } 
      ]
    }]
  );
  return <RouterProvider router={router} />
};
export default App;