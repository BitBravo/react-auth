import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Seo from "../components/Seo";
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../utils/validate";
import { RoutePaths } from "../config/routes";
import { LoginPayload } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loading, login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate(RoutePaths.Profile);
  }, [isAuthenticated, navigate]);

  const handleLogin = (values: LoginPayload) => {
    login(values.email, values.password);
  };

  return (
    <div>
      <Seo title="Sign In" />
      <Formik initialValues={{ email: "", password: "" }} validationSchema={loginSchema} onSubmit={handleLogin}>
        {({ isValid }) => {
          console.log("isValid", isValid);
          return (
            <Form>
              <div className="mb-6 mt-5">
                <label className="text-slate-600" htmlFor="email">
                  Email Address
                </label>
                <Field
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="mb-2 mt-1 block min-w-96 rounded-lg border px-3 py-1.5"
                />
                <div className="text-sm text-gray-500">{`We'll never share your email with anyone else.`}</div>
                <ErrorMessage name="email" component="div" className="text-xs text-rose-500" />
              </div>
              <div className="mb-6">
                <label className="text-slate-600" htmlFor="password">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-2 mt-1 block min-w-96 rounded-lg border px-3 py-1.5"
                />
                <ErrorMessage name="password" component="div" className="text-xs text-rose-500" />
              </div>
              <button
                type="submit"
                disabled={loading || !isValid}
                className="rounded-lg border bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-400"
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default LoginPage;
