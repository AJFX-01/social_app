
import './App.css';
// import Login from './pages/login/login';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';

import './style.scss';
import Register from './pages/register/register';
import Login from './pages/login/login';
import NavBar from './components/navBar/navBar';
import LeftBar from './components/leftBar/leftBar';
import RightBar from './components/RightBar/RightBar';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

function App() {

  const {currentUser} = useContext(AuthContext);

  const { darkMode }  = useContext(DarkModeContext);

  const queryClient = new QueryClient()

  const Layout = () => {
    return(
      <QueryClientProvider client={queryClient}>  
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <NavBar/>
          <div style={{ display: 'flex'}}>
            <LeftBar/>
            <div style={{ flex: 6 }}>
              <Outlet/>
            </div>
            <RightBar/>
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login"/>
    }

    return children 
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element:(
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>
      ),
      children :
      [{
        path: '/',
        element: <Home/>
      },

      {
        path:'/profile/:id',
        element: <Profile/>
      }]
    },

    {
      path: '/login',
      element: <Login/>,
    },

    {
      path: '/register',
      element : <Register/>
    }
  ]);
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
