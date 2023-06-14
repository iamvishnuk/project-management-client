import React from "react";
import Select from "react-select"

const CreateTeamModal = ({ onClose }) => {
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
                        />
                    </div>
                    <div className="mt-5 mb-3">
                        <label htmlFor="">Members</label>
                        <Select className="border rounded-md border-gray-400" />
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="rounded-md font-medium hover:bg-gray-300 py-2 px-3"
                            onClick={() =>onClose()}
                        >
                            Cancel
                        </button>
                        <button className="rounded-md font-medium py-2 px-3 bg-blue-600 text-white hover:bg-blue-700">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTeamModal;
