import * as Yup from "yup";

export const signUpSchema = Yup.object({
    username: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter your password"),
    confirm_password: Yup.string()
        .required("Please enter the password")
        .oneOf([Yup.ref("password"), null], "Password does't match"),
});

export const createCategroySchem = Yup.object({
    categoryName: Yup.string()
        .min(2)
        .max(100)
        .required("Please enter a category name"),
    categoryDescription: Yup.string()
        .min(10)
        .max(250)
        .required("Please enter the description"),
});
