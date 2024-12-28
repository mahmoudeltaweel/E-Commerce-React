import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Website/Homepage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Users from './pages/Dashboard/Users';
import GoogleCallBack from './pages/Auth/GoogleCallBack';
import Dashboard from './pages/Dashboard/Dashboard';
import RequireAuth from './pages/Auth/RequireAuth';
import UpdateUser from './pages/Dashboard/UpdateUser';

function App() {
  return (
    <>
        {/* public Route */}

      <Routes>
        <Route path='/' element={<HomePage/>}  />
        <Route path='login' element={<Login />}  />
        <Route path='register' element={<Register />}  />
        <Route path='/auth/google/callback' element={<GoogleCallBack />}  />

        {/* protected Route  */}
        <Route element={<RequireAuth />} >
        <Route path='/dashboard' element={<Dashboard />} >
          <Route path='users' element={<Users />} />
          <Route path='users/:id' element={<UpdateUser />} />
        </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
