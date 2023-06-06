import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { signUpSchema } from "../../../yup";
import { userAxiosInstance } from "../../../axios/AxiosInstance";
import { Link } from "react-router-dom";

const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
};

function SignUpForm() {
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: initialValues,
            validationSchema: signUpSchema,
            onSubmit: (values, action) => {
                registerUser();
                action.resetForm();
            },
        });

    const registerUser = async () => {
        try {
            const { data } = await userAxiosInstance.post("/signup", values, {
                withCredentials: true,
            });
            if (data) {
                if (data.exist) {
                    toast.warn("Email is already used");
                }
                if (data.created) {
                    toast.success("Verification like send to email");
                }
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <div className="lg:px-8 w-4/6">
                <h1 className="text-5xl font-extrabold font-sans my-5">
                    Sign Up
                </h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label htmlFor="">User Name</label>
                        <input
                            className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                            type="text"
                            placeholder="Enter your user name"
                            autoComplete="off"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.username && touched.username ? (
                            <label className="text-red-500">
                                {errors.username}
                            </label>
                        ) : null}
                    </div>
                    <div className="my-5">
                        <label htmlFor="">Email</label>
                        <input
                            className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                            type="text"
                            placeholder="Enter your email"
                            autoComplete="off"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                            <label className="text-red-500">
                                {errors.email}
                            </label>
                        ) : null}
                    </div>
                    <div className="my-5">
                        <label htmlFor="">Password</label>
                        <input
                            className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="off"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? (
                            <label className="text-red-500">
                                {errors.password}
                            </label>
                        ) : null}
                    </div>
                    <div className="my-5">
                        <label htmlFor="">Confirm password</label>
                        <input
                            className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="off"
                            name="confirm_password"
                            value={values.confirm_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.confirm_password && touched.confirm_password ? (
                            <label className="text-red-500">
                                {errors.confirm_password}
                            </label>
                        ) : null}
                    </div>
                    <button
                        type="submit"
                        className=" bg-blue-700 w-full h-11 border rounded-md text-white font-semibold"
                    >
                        Register
                    </button>
                    <div id="recaptcha" className="w-full"></div>
                </form>
                <label className="my-3" htmlFor="">
                    Already have a account?{" "}
                    <Link className="text-blue-700 font-semibold" to={"/"}>
                        Log in
                    </Link>
                </label>
            </div>
            <ToastContainer />
        </>
    );
}

export default SignUpForm;
