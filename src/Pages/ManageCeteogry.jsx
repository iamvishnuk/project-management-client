import { useEffect, useState } from "react";
import Modal from "../Components/User/Modal/Modal";
import Sidebar from "../Components/User/Sidebar/Sidebar";
import MangeCategoryTable from "../Components/User/Table/ManageCategoryTable";
import { userAxiosInstance } from "../axios/AxiosInstance";
import { useFormik } from "formik";
import { createCategroySchem } from "../yup";
import { toast, ToastContainer } from "react-toastify";

const initialValues = {
    categoryName: "",
    categoryDescription: "",
};

const ManageCeteogry = () => {
    const [showModal, setShowModal] = useState(false);
    const [categoryData, setCategoryData] = useState([]);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: initialValues,
            validationSchema: createCategroySchem,
            onSubmit: (values, action) => {
                createCategory();
                action.resetForm();
            },
        });

    const createCategory = async () => {
        try {
            const { data, status } = await userAxiosInstance.post(
                "/create-category",
                values,
                {
                    withCredentials: true,
                }
            );
            if (status === 201) {
                setShowModal(false);
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error.response.data.message);
            if (error.response && error.response.status === 422) {
                toast.error(error.response.data.message);
            } else {
                console.log(error.message);
            }
        }
    };

    const getCategoryDetail = async () => {
        await userAxiosInstance
            .get("/get-category-data")
            .then((response) => {
                console.log(response);
                setCategoryData(response.data.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getCategoryDetail();
    }, [showModal]);

    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="bg-white p-10 font-semibold flex-1 h-screen">
                    <h1 className="text-2xl font-bold">Manage Project Category</h1>
                    <div className="mt-3 mb-3 w-full flex justify-end">
                        <button
                            className="bg-btn-green text-white font-medium px-3 py-1 rounded-md"
                            onClick={() => setShowModal(true)}
                        >
                            <i className="fa-solid fa-plus text-white mr-2"></i>
                            Create Category
                        </button>
                    </div>
                    <MangeCategoryTable
                        categoryData={categoryData}
                        onDelete={getCategoryDetail}
                    />
                </div>
            </div>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                <div className="w-[600px]">
                    <div className="p-5">
                        <h2 className="font-bold text-xl">
                            Add new Project Category
                        </h2>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="my-5">
                                <label className="" htmlFor="">
                                    Category Name
                                </label>
                                <input
                                    className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                                    type="text"
                                    placeholder="Enter your category name"
                                    name="categoryName"
                                    value={values.categoryName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.categoryName && touched.categoryName ? (
                                    <label className="text-red-500">
                                        {errors.categoryName}
                                    </label>
                                ) : null}
                            </div>
                            <div className="my-5">
                                <label className="" htmlFor="">
                                    Category Description
                                </label>
                                <textarea
                                    className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                                    type="text"
                                    placeholder="Enter description about the category"
                                    name="categoryDescription"
                                    value={values.categoryDescription}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.categoryDescription &&
                                touched.categoryDescription ? (
                                    <label className="text-red-500">
                                        {errors.categoryDescription}
                                    </label>
                                ) : null}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="flex border py-2 px-4 rounded-lg bg-blue-700 bg-opacity-75 font-medium text-white"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
            <ToastContainer />
        </>
    );
};

export default ManageCeteogry;
