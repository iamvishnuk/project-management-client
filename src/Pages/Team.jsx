import React, { useEffect, useState } from "react";
import Modal from "../Components/User/Modal/Modal";
import { toast } from "react-toastify";
import { getAllPeople, sendInviteMail, getAllTeam } from "../Services/userApi";
import PeopleCard from "../Components/User/cards/PeopleCard";
import CreateTeamModal from "../Components/User/Modal/CreateTeamModal";
import TeamCard from "../Components/User/cards/TeamCard";
import { Link } from "react-router-dom";

const ManageTeam = () => {
    const [addPeopleModal, setAddPeopleModal] = useState(false);
    const [createTeamModal, showCreateTeamModal] = useState(false);
    const [email, setEmail] = useState("");
    const [people, setPeople] = useState([]);
    const [team, setTeam] = useState([]);

    const getPeople = async () => {
        getAllPeople()
            .then((res) => {
                setPeople(res.data.peopleData);
            })
            .catch((errror) => {
                console.log(errror.message);
            });
    };
    const getTeam = () => {
        getAllTeam()
            .then((res) => {
                setTeam(res.data.teamData);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        getPeople();
        getTeam();
    }, []);

    // for adding new people to team
    const addPeople = async () => {
        sendInviteMail({ email: email })
            .then((res) => {
                toast.success(res.data.message);
                setAddPeopleModal(false);
                getPeople();
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };
    return (
        <>
            <div className="">
                <h1 className="text-2xl font-bold">People and Teams</h1>
            </div>
            <div className="my-8">
                <div className="flex justify-between">
                    <h1 className="text-xl font-semibold">People</h1>
                    <h1 className="text-blue-500 hover:underline">
                        <Link to={"/manage-team/manage-people"}>Manage people</Link>
                    </h1>
                </div>
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
                    <PeopleCard people={people} />
                </div>
            </div>

            <div>
                <div className="">
                    <h1 className="text-xl font-semibold">Your Teams</h1>
                </div>
                <div className="grid grid-cols-6 gap-5 px-2 py-3">
                    <div className="w-[160px] bg-white border-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl">
                        <div className="flex flex-col items-center pb-5">
                            <div className="bg-gradient-to-r from-green-400 to-green-200 w-full h-24 mb-5 rounded-t-lg"></div>
                            <h1>Your new team</h1>
                            <button
                                className="bg-gray-300 py-2 px-4 rounded-md font-medium mt-1"
                                onClick={() => showCreateTeamModal(true)}
                            >
                                Create Team
                            </button>
                        </div>
                    </div>
                    <TeamCard team={team} />
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
                        htmlFor="input-group-1"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email
                    </label>
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            {/* Create team modal */}
            <Modal
                isVisible={createTeamModal}
                onClose={() => showCreateTeamModal(false)}
            >
                <CreateTeamModal
                    onClose={() => showCreateTeamModal(false)}
                    getTeam={getTeam}
                />
            </Modal>
        </>
    );
};

export default ManageTeam;
