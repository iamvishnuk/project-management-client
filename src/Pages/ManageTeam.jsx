import React, { useEffect, useState } from "react";
import Sidebar from "../Components/User/Sidebar/Sidebar";
import Modal from "../Components/User/Modal/Modal";
import { toast } from "react-toastify";
import { getAllPeople, sendInviteMail } from "../Services/userApi";

const ManageTeam = () => {
    const [addPeopleModal, setAddPeopleModal] = useState(false);
    const [email, setEmail] = useState("");
    const [people, setPeople] = useState([]);

    const getPeople = async () => {
        getAllPeople()
            .then((res) => {
                setPeople(res.data.peopleData);
            })
            .catch((errror) => {
                console.log(errror.message);
            });
    };
    useEffect(() => {
        getPeople();
    }, []);

    // for adding new people to team
    const addPeople = async () => {
        sendInviteMail({ email: email })
            .then((res) => {
                toast.success(res.data.message);
                setAddPeopleModal(false);
                getPeople()
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="p-10 h-screen overflow-auto flex-1">
                    <div className="">
                        <h1 className="text-2xl font-bold">People and Teams</h1>
                    </div>
                    <div className="mt-8">
                        <h1 className="text-xl font-semibold">People</h1>
                        <div className="grid grid-cols-6 gap-5 px-2 py-3">
                            {/* add people to your team */}
                            <div
                                onClick={() => setAddPeopleModal(true)}
                                className="w-[160px] bg-white border-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl"
                            >
                                <div className="flex flex-col items-center py-5">
                                    <img
                                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                        src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                                        alt="Bonnie image"
                                    />
                                    <h1>Your teammate</h1>
                                    <button className="bg-gray-300 py-2 px-4 rounded-md font-medium mt-1">
                                        Add people
                                    </button>
                                </div>
                            </div>
                            {/* people in your team */}
                            {people.map((user, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="w-[160px] bg-white border-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl"
                                    >
                                        <div className="flex flex-col items-center py-5">
                                            <img
                                                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                                src={
                                                    user.image
                                                        ? user.image
                                                        : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                                                }
                                            />

                                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                                {user.userName}
                                            </h5>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {/* add people Modal */}
            <Modal
                isVisible={addPeopleModal}
                onClose={() => setAddPeopleModal(false)}
            >
                <div className="w-[450px] p-5">
                    <h1 className="font-medium text-xl mb-5">
                        Add People to you team
                    </h1>
                    <label
                        for="input-group-1"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email
                    </label>
                    <div class="relative mb-6">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                aria-hidden="true"
                                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="input-group-1"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@flowbite.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() => setAddPeopleModal(false)}
                            className="rounded-md font-medium hover:bg-gray-300 py-2 px-3"
                        >
                            Cancel
                        </button>
                        <button
                            className="rounded-md font-medium py-2 px-3 bg-blue-600 text-white hover:bg-blue-700"
                            onClick={addPeople}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ManageTeam;
