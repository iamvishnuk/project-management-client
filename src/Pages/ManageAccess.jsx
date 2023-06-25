import React, { useEffect } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "../Components/User/Modal/Modal";
import Select from "react-select";
import {
    getMembers,
    giveAccessToProject,
    getAccessMembersList,
} from "../Services/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ManageAccessTable from "../Components/User/Table/ManageAccessTable";

const ManageAccess = () => {
    const [modal, showModal] = useState(false);
    const [members, setMembers] = useState([]); // storing the members data
    const [access, setAccess] = useState(null);
    const [accessMemberList, setAcessMemberList] = useState([]);
    const { _id, projectLead } = useSelector((state) => state.project.value);

    // for changing members array for the select method
    const options = members
        .filter((item) => {
            const accessMemberIds = accessMemberList.map(
                (member) => member._id
            );
            return (
                !accessMemberIds.includes(item._id) &&
                item._id !== projectLead._id
            );
        })
        .map((data) => {
            return { value: data._id, label: data.userName };
        });

    // for gettin the memeber how have access to the project
    const getAccessMember = () => {
        getAccessMembersList(_id)
            .then((res) => {
                setAcessMemberList(res.data.accessMemberList);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getMembers()
            .then((res) => {
                setMembers(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getAccessMember();
    }, []);

    // for adding people to the project
    const add = () => {
        giveAccessToProject(_id, access)
            .then((res) => {
                toast.success(res.data.message);
                showModal(false);
                getAccessMember();
            })
            .catch((error) => {
                console.log(error);
                showModal(false);
            });
    };

    return (
        <>
            <div className="flex justify-between">
                <h1 className="font-medium text-2xl">Access</h1>
                <button
                    className="bg-btn-green text-white font-medium px-3 py-1 rounded-md flex items-center"
                    onClick={() => showModal(true)}
                >
                    <FaPlus className="mr-1" />
                    Add people
                </button>
            </div>
            <div>
                <ManageAccessTable
                    accessMemberList={accessMemberList}
                    getData={getAccessMember}
                />
            </div>
            <Modal isVisible={modal} onClose={() => showModal(false)}>
                <div className="w-[400px] p-5">
                    <h1 className="font-medium text-xl">Add people</h1>
                    <div className="my-9">
                        <Select
                            options={options}
                            placeholder="Search for username"
                            isMulti
                            isSearchable
                            noOptionsMessage={() => "No users found"}
                            onChange={setAccess}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() => showModal(false)}
                            className="rounded-md font-medium hover:bg-gray-300 py-2 px-3"
                        >
                            Cancel
                        </button>
                        <button
                            className="rounded-md font-medium py-2 px-3 bg-blue-600 text-white hover:bg-blue-700"
                            onClick={add}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ManageAccess;
