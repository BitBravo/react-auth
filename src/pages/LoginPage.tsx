import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Seo from "../components/Seo";
import { useAuth } from "../hooks/useAuth";
import { RoutePaths } from "../config/routes";
import { LoginPayload } from "../types";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate(RoutePaths.Profile);
  }, [isAuthenticated, navigate]);

  const handleLogin = (values: LoginPayload, { setSubmitting }: FormikHelpers<LoginPayload>) => {
    setSubmitting(true);
    login(values.email, values.password);
  };

  return (
    <div>
      <Seo title="Sign In" />

      <Formik initialValues={{ email: "", password: "" }} validationSchema={loginSchema} onSubmit={handleLogin}>
        {({ isSubmitting }) => (
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
              disabled={isSubmitting}
              className="rounded-lg border bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-400"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
