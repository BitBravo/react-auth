import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RoutePaths } from '../config/routes';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="py-4 text-black">
      <nav className="container flex gap-2">
        <Link
          to={RoutePaths.Info}
          className="rounded border border-slate-300 px-4 py-1.5 hover:bg-slate-50">
          About us
        </Link>
        {!isAuthenticated ? (
          <Link
            to={RoutePaths.SignIn}
            className="rounded border px-4 py-1.5 hover:bg-slate-50">
            Sign In
          </Link>
        ) : (
          <>
            <Link
              to={RoutePaths.Profile}
              className="rounded border px-4 py-1.5 hover:bg-slate-50">
              Profile
            </Link>
            <button
              className="rounded border px-4 py-1.5 hover:bg-slate-50"
              onClick={logout}>
              Sign out
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
