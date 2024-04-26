import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RoutePaths } from "../config/routes";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  const getClass = (isActive: boolean) => {
    let defaultCls = "rounded border px-4 py-1.5 hover:bg-slate-50";
    if (isActive) defaultCls += ` text-blue-500`;
    return defaultCls;
  };

  return (
    <header className="py-4 text-black">
      <nav className="container flex gap-2">
        <NavLink to={RoutePaths.Info} className={({ isActive }) => getClass(isActive)}>
          About us
        </NavLink>
        {!isAuthenticated ? (
          <NavLink to={RoutePaths.SignIn} className={({ isActive }) => getClass(isActive)}>
            Sign In
          </NavLink>
        ) : (
          <>
            <NavLink to={RoutePaths.Profile} className={({ isActive }) => getClass(isActive)}>
              Profile
            </NavLink>
            <button type="button" className="rounded border px-4 py-1.5 hover:bg-slate-50" onClick={logout}>
              Sign out
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
