import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const adminUrls = [
  "/admin/dashboard",
  "/admin/users-list",
  "/admin/campaigns",
  "/admin/campaigns/:id/update-campaign",
];

const userUrls = [
  "/user/dashboard",
  "/user/profile",
  "/user/campaigns",
  "/user/campaigns/:id",
  "/user/donations",
  "/user/campaigns/create-campaign",
  "/user/campaigns/:id/update-campaign",
];

function PrivateRoute({ path, element: Component }) {
  const { isAuthenticated, isAdmin } = useAuth();

  let hasAccess = false;
  if (adminUrls.includes(path)) {
    hasAccess = isAuthenticated() && isAdmin();
  } else if (userUrls.includes(path)) {
    hasAccess = isAuthenticated() && !isAdmin();
  }
  return <>{hasAccess ? <Component /> : <Navigate to="/access-denied" />}</>;
}

export default PrivateRoute;
