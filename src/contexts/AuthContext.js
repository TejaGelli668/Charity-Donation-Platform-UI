import jwt_decode from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    const decodedToken = jwt_decode(token);
    setUser(decodedToken);
  };

  const logout = () => {
    console.log("logout is called");
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setCart([]);
    localStorage.removeItem("cart");
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const isAuthenticated = () => {
    return token !== null && token !== undefined;
  };

  const isAdmin = () => {
    return isAuthenticated() && user?.role === "ROLE_ADMIN";
  };

  const isUser = () => {
    return isAuthenticated() && user?.role === "ROLE_USER";
  };

  const getUser = async (userId, role) => {
    try {
      const response = await api.get(
        role === "ROLE_USER" ? `/users/${userId}` : `/admin/${userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    if (product.quantity === 0) {
      // Remove the product from the cart if the quantity is zero
      const updatedCart = cart.filter(
        (item) => item.productId !== product.productId
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const index = cart.findIndex(
        (item) => item.productId === product.productId
      );
      if (index !== -1) {
        const updatedCart = [...cart];
        updatedCart[index].quantity = product.quantity;
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        setCart([...cart, product]);
        localStorage.setItem("cart", JSON.stringify([...cart, product]));
      }
    }
  };

  const getCart = (cart) => JSON.parse(localStorage.getItem("cart")) || [];

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const setUserDetails = (userDetails) => {
    setUser(userDetails);
  };

  useEffect(() => {
    const onLoad = async () => {
      if (isAuthenticated()) {
        setIsLoading(true);
        const decodedToken = jwt_decode(token || localStorage.getItem("token"));
        const user = await getUser(decodedToken?.user_id, decodedToken?.role);
        setUser(user);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    onLoad();
    // eslint-disable-next-line
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        updateUser,
        isAuthenticated,
        isAdmin,
        isUser,
        setUser: setUserDetails,
        cart,
        addToCart,
        getCart,
        clearCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
