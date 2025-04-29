import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const validationSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Only letters are allowed")
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),

  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Only letters are allowed")
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),

  email: Yup.string()
    .email("Enter a valid email address")
    .matches(/^[^\s@]+@[^\s@]+\.(com|net)$/, "Only .com and .net domains are allowed")
    .required("Email is required"),

  password: Yup.string()
    .min(3, "Password must be at least 3 characters")
    .max(30, "Password must not exceed 30 characters")
    .matches(/^[a-zA-Z0-9]*$/, "Only alphanumeric characters allowed")
    .required("Password is required"),

  gender: Yup.string().oneOf(["male", "female", "other"], "Select a gender").required("Gender is required"),

  profileImage: Yup.mixed().required("Profile image is required"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="relative flex flex-col rounded-xl bg-white shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Sign Up</h2>
        <p className="text-gray-500 text-center mb-6">Welcome! Enter your details to register.</p>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            gender: "",
            profileImage: null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const formData = new FormData();

              // Append fields except profileImage
              for (const key in values) {
                if (key !== "profileImage") {
                  formData.append(key, values[key]);
                }
              }

              // Append the image with correct key name 'image'
              formData.append("image", values.profileImage);

              const response = await fetch(`${apiUrl}/auth/user`, {
                method: "POST",
                body: formData,
              });

              const data = await response.json();
              setLoading(false);

              if (response.ok) {
                toast.success(data.message);
                localStorage.setItem("username", `${values.firstName} ${values.lastName}`);
                navigate("/dashboard");
              } else {
                toast.error(data.message || "Signup failed");
              }
            } catch (error) {
              setLoading(false);
              toast.error("Error: " + error.message);
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-4">

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <Field
                    name="firstName"
                    type="text"
                    className="w-full mt-1 p-2 border rounded-md"
                    placeholder="First name"
                  />
                  <ErrorMessage name="firstName" component="p" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <Field
                    name="lastName"
                    type="text"
                    className="w-full mt-1 p-2 border rounded-md"
                    placeholder="Last name"
                  />
                  <ErrorMessage name="lastName" component="p" className="text-red-500 text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full mt-1 p-2 border rounded-md"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <Field as="select" name="gender" className="w-full mt-1 p-2 border rounded-md">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage name="gender" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                <input
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue("profileImage", event.currentTarget.files[0]);
                  }}
                  className="w-full mt-1 p-2 border rounded-md"
                />
                <ErrorMessage name="profileImage" component="p" className="text-red-500 text-sm" />
                {values.profileImage && (
                  <img
                    src={URL.createObjectURL(values.profileImage)}
                    alt="Preview"
                    className="w-20 h-20 mt-2 rounded-full object-cover"
                  />
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md transition-all duration-300 disabled:bg-gray-500"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
