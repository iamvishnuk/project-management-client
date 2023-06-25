import { useEffect, useState } from "react";
import Modal from "../Components/User/Modal/Modal";
import MangeCategoryTable from "../Components/User/Table/ManageCategoryTable";
import { useFormik } from "formik";
import { createCategroySchem } from "../yup";
import { toast } from "react-toastify";
import { getCategory, createCategory } from "../Services/userApi";

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
                create();
                action.resetForm();
            },
        });

    const create = async () => {
        createCategory(values)
            .then((res) => {
                setShowModal(false);
                toast.success(res.data.message);
            })
            .catch((error) => {
                toast.warning(error.response.data.message);
            });
    };

    const getCategoryDetail = async () => {
        getCategory()
            .then((response) => {
                setCategoryData(response.data.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getCategoryDetail();
    }, [showModal]);

    return (
        <>
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
        </>
    );
};

export default ManageCeteogry;
