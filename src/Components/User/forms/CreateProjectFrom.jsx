import { useEffect, useState } from "react";
import { userAxiosInstance } from "../../../axios/AxiosInstance";

const CreateProjectFrom = () => {
    const [category, setCategory] = useState([]);
    const [members, setMembers] = useState([]);

    const getData = async () => {
        await userAxiosInstance
            .get("/get-member-and-category", { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setCategory(res.data.categoryDetails);
                setMembers(res.data.memberDetails);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    console.log( category)

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div>
                <form>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Project Name
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your project name"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Project Category
                        </label>
                        <select
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            defaultValue={"choose a category"}
                        >
                            {
                                category.map((items, index) => {
                                    return (

                                        <option key={index} value="US">{items.categoryName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Project URL
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Project Lead
                        </label>
                        <select
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            {/* <option selected>Choose a Category</option> */}
                            {
                                members.map((member, index) => {
                                    return (
                                        <option key={index} value="US">{member.userName}</option>
                                    )
                                })
                            }
                            {/* <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option> */}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Description
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write about your project..."
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateProjectFrom;
