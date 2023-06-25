import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoIosRemoveCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import {
    getSingleTeam,
    removeTeamMember,
    getMembers,
    addTeamMember,
    deleteTeam,
} from "../Services/userApi";
import { toast } from "react-toastify";
import Modal from "../Components/User/Modal/Modal";
import Select from "react-select";
import { BiExit } from "react-icons/bi";
import { useSelector } from "react-redux";
import { TeamDiscussion } from "../Components/User/Chat/TeamDiscussion";

export const ViewTeam = () => {
    const [team, setTeam] = useState(null);
    const [modal, showModal] = useState(false);
    const [deleteModal, showDeleteModal] = useState(false);
    const [member, setMembers] = useState([]);
    const [newMember, setNewMember] = useState(null);
    const params = useParams();
    const navigate = useNavigate();
    const { userId } = useSelector((state) => state.user);

    // for changing the members state for the select method
    const options = member.map((data) => {
        return { value: data._id, label: data.userName };
    });

    // for getting team data
    const getData = () => {
        getSingleTeam(params.id)
            .then((res) => {
                setTeam(res.data.team);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
        getMembers()
            .then((res) => {
                setMembers(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // for removing members from the team
    const removeMember = (memberId) => {
        removeTeamMember(params.id, memberId)
            .then((res) => {
                toast.success(res.data.message);
                getData();
            })
            .catch((error) => console.log(error.message));
    };

    // for leaving from the team for members in the team
    const leaveTeam = () => {
        removeTeamMember(params.id, userId)
            .then((res) => {
                toast.success("You exited the team");
                navigate("/manage-team");
            })
            .catch((error) => console.log(error.message));
    };

    //for adding memeber to team for team admin
    const addMember = () => {
        addTeamMember(params.id, { member: newMember })
            .then((res) => {
                showModal(false);
                toast.success(res.data.message);
                getData();
            })
            .catch((error) => console.log(error.message));
    };

    // for deleting the team
    const teamDelete = () => {
        deleteTeam(params.id)
            .then((res) => {
                toast.success(res.data.message);
                navigate("/manage-team");
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div className="flex h-full">
                <div className="md:w-2/6 lg:w-1/4">
                    <h1 className="font-bold text-xl">
                        {team && team.teamName}
                    </h1>
                    <div className="flex items-center text-center p-2">
                        <div
                            className="w-5/6 bg-gray-200 py-1 m-1 font-medium rounded-md hover:bg-gray-300 hover:cursor-pointer"
                            onClick={() => {
                                showModal(true);
                            }}
                        >
                            Add People
                        </div>
                        {team && userId === team.admin ? (
                            <div
                                className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
                                onClick={() => showDeleteModal(true)}
                            >
                                <AiFillDelete />
                            </div>
                        ) : (
                            <div
                                className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
                                onClick={leaveTeam}
                            >
                                <BiExit />
                            </div>
                        )}
                    </div>
                    <div className="p-1">
                        <div className="border-2 shadow rounded-md">
                            <h1 className="font-medium my-3 ml-3">Members</h1>
                            <hr className=" mx-auto h-0.5 bg-gray-300" />
                            <div className="p-2">
                                {team &&
                                    team.members
                                        .filter((value) => {
                                            return value._id != userId;
                                        })
                                        .map((value, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex items-center text-center"
                                                >
                                                    <div className="w-5/6 py-1 m-1 font-medium rounded-md hover:bg-gray-200 hover:cursor-pointer">
                                                        {value.userName}
                                                    </div>
                                                    {team &&
                                                    team.admin === userId ? (
                                                        <div
                                                            className="p-2 rounded-md hover:bg-gray-200 hover:cursor-pointer"
                                                            onClick={() =>
                                                                removeMember(
                                                                    value._id
                                                                )
                                                            }
                                                        >
                                                            <IoIosRemoveCircle />
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            );
                                        })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full p-3">
                    <h1 className="font-medium">Team Discussion</h1>
                    <TeamDiscussion />
                </div>
            </div>
            {/* ADD MEMBERS MODAL */}
            <Modal isVisible={modal} onClose={() => showModal(false)}>
                <div className="w-[400px] p-3 mb-3">
                    <h1 className="font-medium mb-3">Add People</h1>
                    <div className="my-5">
                        <label htmlFor="">Name</label>
                        <Select
                            options={options}
                            placeholder="Search for userName"
                            isMulti
                            isSearchable
                            noOptionsMessage={() => "No users found!"}
                            onChange={setNewMember}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="rounded-md font-medium hover:bg-gray-300 py-2 px-3"
                            onClick={() => showModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="rounded-md font-medium py-2 px-3 bg-blue-600 text-white hover:bg-blue-700"
                            onClick={addMember}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </Modal>
            {/* DELETE TEAM MODAL */}
            <Modal
                isVisible={deleteModal}
                onClose={() => showDeleteModal(false)}
            >
                <div className="w-[600px] p-7">
                    <div className="text-center py-6">
                        <i className="fa-solid fa-trash text-red-600 text-5xl"></i>
                        <h2 className="text-4xl text-gray-500 font-normal mt-10 mb-8">
                            Are you sure ?
                        </h2>
                        <h2 className="font-light text-2xl my-8">
                            You won't be able to revert Team!
                        </h2>
                        <button
                            onClick={teamDelete}
                            className="bg-sky-500 py-2 px-4 border-gray border-opacity-30 text-white font-light text-xl rounded-lg border-4 mr-2"
                        >
                            Yes, delete it!
                        </button>
                        <button
                            onClick={() => showDeleteModal(false)}
                            className="bg-red-600 py-2 px-4 border-gray border-opacity-30 text-white font-light text-xl rounded-lg border-4 ml-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
