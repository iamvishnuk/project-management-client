import React from "react";
import { useNavigate } from "react-router-dom";

const TeamCard = ({ team }) => {
    const navigate = useNavigate()
    return (
        <>
            { team && team.map((data, index) => {
                return (
                    <div
                        key={index}
                        className="w-[160px] bg-white border-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl hover:cursor-pointer"
                        onClick={() => navigate(`/manage-team/${data._id}`)}
                    >
                        <div className="flex flex-col items-center pb-5">
                            <div className="bg-gradient-to-r from-green-400 to-green-200 w-full h-24 mb-5 rounded-t-lg"></div>
                            <h1>{data.teamName}</h1>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default TeamCard;
