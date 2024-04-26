import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import InfoPage from "./pages/InfoPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import { GlobalProvider } from "./context/GlobalContext";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import { RoutePaths } from "./config/routes";

const App = () => {
  return (
    <Router>
      <GlobalProvider>
        <AuthProvider>
          <ProfileProvider>
            <Layout>
              <Routes>
                <Route path={RoutePaths.Info} element={<InfoPage />} />
                <Route path={RoutePaths.SignIn} element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path={RoutePaths.Profile} element={<ProfilePage />} />
                </Route>
              </Routes>
            </Layout>
          </ProfileProvider>
        </AuthProvider>
      </GlobalProvider>
    </Router>
  );
};

export default App;
