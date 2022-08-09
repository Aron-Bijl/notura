import React, { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import HomeScreen from "./screens/HomeScreen";
import { Routes, Route } from "react-router-dom"
import RecipeScreen from "./screens/RecipeScreen";
import SigninScreen from "./screens/SigninScreen";
import { Store } from './Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarUser from "./components/Navbar/NavbarUser";
import ProfileScreen from "./screens/ProfileScreen";
import { useEffect } from "react";
import RegisterScreen from "./screens/RegisterScreen";
import RecipeListScreen from "./screens/RecipeListScreen";
import RecipeEditScreen from "./screens/RecipeEditScreen";
import AdminRoute from "./components/AdminRoute";
import PopCatRecipeCards from "./components/PopCatRecipeCards";
import DashboardScreen from "./screens/DashboardScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserRoute from "./components/UserRoute";
import RecipeListScreenUser from "./screens/RecipeListScreenUser";

function App() {
 
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
  }, [userInfo]);

  return (
    <div>
      <ToastContainer position="bottom-center" limit={1}></ToastContainer>
      <header>
        <React.Fragment>
        {userInfo ? (
            <NavbarUser/> //logged-in
        ) : (
          <Navbar/>
        )}
        </React.Fragment>
      </header>
      <main>
        <Routes>
          <Route path="/recipe/:slug" element={<RecipeScreen/>} />
          <Route path="/login" element={<SigninScreen/>} />
          <Route path="/register" element={<RegisterScreen/>} />
          <Route
            path="/profile/:id"
            element={
              <UserRoute>
                <ProfileScreen/>
              </UserRoute>
            }
          ></Route>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/recipe/category/:category" element={<PopCatRecipeCards/>} />
          <Route
            path="/recipies/admin/"
            element={
              <AdminRoute>
                <RecipeListScreen/>
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/recipe/admin/:id"
            element={
              <AdminRoute>
                <RecipeEditScreen/>
              </AdminRoute>
            }
          ></Route>
            <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <DashboardScreen/>
              </AdminRoute>
            }
          ></Route>
            <Route
            path="/admin/user/:id"
            element={
              <AdminRoute>
                <UserEditScreen/>
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/recipies/user"
            element={
              <UserRoute>
                <RecipeListScreenUser/>
              </UserRoute>
            }
          ></Route>
            <Route
            path="/recipe/user/:id"
            element={
              <UserRoute>
                <RecipeEditScreen/>
              </UserRoute>
            }
          ></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
