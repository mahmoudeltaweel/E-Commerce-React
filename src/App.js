import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Website/Homepage';
import Users from './pages/Dashboard/Users/Users';
import GoogleCallBack from './pages/Auth/AuthOperations/GoogleCallBack';
import Dashboard from './pages/Dashboard/Dashboard';
// import UpdateUser from './pages/Dashboard/Users/UpdateUser';
import CreateUsers from './pages/Dashboard/Users/CreateUsers';
import Writer from './pages/Dashboard/Writer';
import Err404 from './pages/Auth/Errors/404';
import RequirBack from './pages/Auth/Protecting/RequirBack';
import Categories from './pages/Dashboard/Category/Categories';
import CreateCategory from './pages/Dashboard/Category/CreateCategory';
import UpdateCategory from './pages/Dashboard/Category/UpdateCategory';
import TestRef from './pages/Website/Test';
import Products from './pages/Dashboard/Product/Products';
import CreateProduct from './pages/Dashboard/Product/CreateProduct';
import UpdateProduct from './pages/Dashboard/Product/UpdateProduct';
import RequireAuth from './pages/Auth/Protecting/RequireAuth';
import Register from './pages/Auth/AuthOperations/Register';
import Login from './pages/Auth/AuthOperations/Login';
import UpdateUser from './pages/Dashboard/Users/UpdateUser';

function App() {
  return (
    <>
        {/* public Route */}
        

      <Routes>
        <Route path='/' element={<HomePage/>}  />
        <Route path='/test' element={<TestRef />} />
          <Route element={<RequirBack />} >
        <Route path='login' element={<Login />}  />
        <Route path='register' element={<Register />}  />
        </Route>
        <Route path='/auth/google/callback' element={<GoogleCallBack />}  />
        <Route path='/*' element={<Err404 />}  />

        {/* protected Route  */}
        <Route element={<RequireAuth allowedRole={["1995","1996","1999"]} />}>
        <Route path='/dashboard' element={<Dashboard />} >
        <Route element={<RequireAuth allowedRole={"1995"} />}>
          <Route path='users' element={<Users />} />
          <Route path='users/:id' element={<UpdateUser />} />
          <Route path='user/add' element={<CreateUsers />} />
        </Route>
          <Route element={<RequireAuth allowedRole={["1999" , "1995"]}  />}>
          <Route path='Categories' element={<Categories />} />
          <Route path='Category/add' element={<CreateCategory />} />
          <Route path='Categories/:id' element={<UpdateCategory />} />

          <Route path='products' element={<Products />} />
          <Route path='product/add' element={<CreateProduct />} />
          <Route path='products/:id' element={<UpdateProduct />} />
        </Route>
          <Route element={<RequireAuth allowedRole={["1996" , "1995"]}  />}>
          <Route path='writer' element={<Writer />} />
        </Route>
        </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
