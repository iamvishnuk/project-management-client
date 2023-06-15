import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getMembers, createTeam } from "../../../Services/userApi";
import { toast } from "react-toastify";

const CreateTeamModal = ({ onClose, getTeam }) => {
    const [member, setMembers] = useState([]);
    const [teamMembers, setTeamMembers] = useState(null);
    const [teamName, setTeamName] = useState("");

    // for changing the members state for the select method
    const options = member.map((data) => {
        return { value: data._id, label: data.userName };
    });

    useEffect(() => {
        getMembers()
            .then((res) => {
                setMembers(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const create = () => {
        createTeam({ member: teamMembers, teamName: teamName })
            .then((res) => {
                console.log(res);
                toast.success(res.data.message);
                getTeam();
                onClose();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="w-[700px] p-4">
            <h1 className="font-medium text-xl">Create Team</h1>
            <div className="grid grid-cols-2">
                <div className="flex items-center">
                    <img
                        src="../../../../public/Images/create-team.jpeg"
                        alt=""
                    />
                </div>
                <div className="p-4">
                    <p className="font-light">
                        Get everyone working in one place by adding them to a
                        team. Stay connected with @mentions, collaborate on work
                        together, and efficiently manage everything from the
                        team profile page
                    </p>
                    <div className="mt-5 mb-3">
                        <label htmlFor="">Team name</label>
                        <input
                            className="w-full border rounded-md bg-transparent border-gray-400"
                            type="text"
                            placeholder="Enter your team name"
                            value={teamName}
                            onChange={(e) => {
                                setTeamName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mt-5 mb-3">
                        <label htmlFor="">Members</label>
                        <Select
                            options={options}
                            placeholder="Search for userName"
                            isMulti
                            isSearchable
                            noOptionsMessage={() => "No users found!"}
                            className="border rounded-md border-gray-400"
                            onChange={setTeamMembers}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="rounded-md font-medium hover:bg-gray-300 py-2 px-3"
                            onClick={() => onClose()}
                        >
                            Cancel
                        </button>
                        <button
                            className="rounded-md font-medium py-2 px-3 bg-blue-600 text-white hover:bg-blue-700"
                            onClick={create}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTeamModal;
