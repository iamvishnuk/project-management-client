import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoIosRemoveCircle } from "react-icons/io";
import { useParams } from "react-router-dom";
import {
    getSingleTeam,
    removeTeamMember,
    getMembers,
    addTeamMember,
} from "../Services/userApi";
import { toast } from "react-toastify";
import Modal from "../Components/User/Modal/Modal";
import Select from "react-select";

export const ViewTeam = () => {
    const [team, setTeam] = useState(null);
    const [modal, showModal] = useState(false);
    const [member, setMembers] = useState([]);
    const [newMember, setNewMember] = useState(null);
    const params = useParams();

    // for changing the members state for the select method
    const options = member.map((data) => {
        return { value: data._id, label: data.userName };
    });

    const getData = () => {
        getSingleTeam(params.id)
            .then((res) => {
                console.log(res.data);
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

    const removeMember = (memberId) => {
        removeTeamMember(params.id, memberId)
            .then((res) => {
                toast.success(res.data.message);
                getData();
            })
            .catch((error) => console.log(error.message));
    };

    const addMember = () => {
        addTeamMember(params.id, {member: newMember})
            .then((res) => {
                showModal(false);
                getData();
            })
            .catch((error) => console.log(error.message));
    };

    return (
        <>
            <div className="flex">
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
                        <div className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer">
                            <AiFillDelete />
                        </div>
                    </div>
                    <div className="p-1">
                        <div className="border-2 shadow rounded-md">
                            <h1 className="font-medium my-3 ml-3">Members</h1>
                            <hr className=" mx-auto h-0.5 bg-gray-300" />
                            <div className="p-2">
                                {team &&
                                    team.members.map((value,index) => {
                                        return (
                                            <div key={index} className="flex items-center text-center">
                                                <div className="w-5/6 py-1 m-1 font-medium rounded-md hover:bg-gray-200 hover:cursor-pointer">
                                                    {value.userName}
                                                </div>
                                                <div
                                                    className="p-2 rounded-md hover:bg-gray-200 hover:cursor-pointer"
                                                    onClick={() =>
                                                        removeMember(value._id)
                                                    }
                                                >
                                                    <IoIosRemoveCircle />
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full p-3">
                    <h1 className="font-medium">Team Activity</h1>
                    <div className="w-full border-2 rounded-md shadow ">
                        There is no work to see
                    </div>
                </div>
            </div>
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
        </>
    );
};
