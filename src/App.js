import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AccessDenied from "./admin/AccessDenied";
import AdminCampaignsList from "./admin/AdminCampaignsList";
import AdminDashBoard from "./admin/AdminDashBoard";
import AdminLogin from "./admin/AdminLogin";
import UsersList from "./admin/UsersList";
import PrivateRoute from "./components/PrivateRoute";
import AboutUs from "./components/footer/AboutUs";
import ContactUs from "./components/footer/ContactUs";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import CampaignDetails from "./pages/campaigns/CampaignDetails";
import CampaignsList from "./pages/campaigns/CampaignsList";
import CreateCampaign from "./pages/campaigns/CreateCampaign";
import DonationsList from "./pages/campaigns/DonationsList";
import MyCampaignsList from "./pages/campaigns/MyCampaignsList";
import UpdateCampaign from "./pages/campaigns/UpdateCampaign";
import Home from "./pages/home/Home";
import NotFound from "./pages/home/NotFound";
import Login from "./pages/login/Login";
import Logout from "./pages/login/Logout";
import Register from "./pages/login/Register";
import Dashboard from "./pages/users/DashBaord";
import UserProfile from "./pages/users/UserProfile";

import "moment-timezone";
import moment from "moment";

moment.tz.setDefault("UTC");

const theme = createTheme({
  palette: {
    primary: {
      main: "#04AA6D",
    },
    secondary: {
      main: "#FFC107",
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about-us" element={<AboutUs />} />
              <Route exact path="/contact-us" element={<ContactUs />} />
              <Route exact path="/user/login" element={<Login />} />
              <Route exact path="/user/register" element={<Register />} />
              <Route
                exact
                path="/user/dashboard"
                element={
                  <PrivateRoute path="/user/dashboard" element={Dashboard} />
                }
              />
              <Route
                exact
                path="/user/campaigns"
                element={
                  <PrivateRoute
                    path="/user/campaigns"
                    element={MyCampaignsList}
                  />
                }
              />
              <Route
                exact
                path="/user/campaigns/:id"
                element={
                  <PrivateRoute
                    path="/user/campaigns/:id"
                    element={CampaignDetails}
                  />
                }
              />
              <Route
                exact
                path="/user/donations"
                element={
                  <PrivateRoute
                    path="/user/donations"
                    element={DonationsList}
                  />
                }
              />
              <Route exact path="/campaigns" element={<CampaignsList />} />
              <Route
                exact
                path="/campaigns/:id"
                element={<CampaignDetails />}
              />
              <Route
                exact
                path="/user/profile"
                element={
                  <PrivateRoute path="/user/profile" element={UserProfile} />
                }
              />
              <Route
                exact
                path="/user/campaigns/create-campaign"
                element={
                  <PrivateRoute
                    path="/user/campaigns/create-campaign"
                    element={CreateCampaign}
                  />
                }
              />
              <Route
                exact
                path="/user/campaigns/:id/update-campaign"
                element={
                  <PrivateRoute
                    path="/user/campaigns/:id/update-campaign"
                    element={UpdateCampaign}
                  />
                }
              />
              <Route exact path="/profile" element={<Dashboard />} />
              <Route exact path="/logout" element={<Logout />} />
              <Route exact path="/access-denied" element={<AccessDenied />} />

              {/* admin urls */}
              <Route exact path="/admin/login" element={<AdminLogin />} />
              <Route
                exact
                path="/admin/dashboard"
                element={
                  <PrivateRoute
                    path="/admin/dashboard"
                    element={AdminDashBoard}
                  />
                }
              />
              <Route
                exact
                path="/admin/users-list"
                element={
                  <PrivateRoute path="/admin/users-list" element={UsersList} />
                }
              />
              <Route
                exact
                path="/admin/campaigns"
                element={
                  <PrivateRoute
                    path="/admin/campaigns"
                    element={AdminCampaignsList}
                  />
                }
              />
              <Route
                exact
                path="/admin/campaigns/:id/update-campaign"
                element={
                  <PrivateRoute
                    path="/admin/campaigns/:id/update-campaign"
                    element={UpdateCampaign}
                  />
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
