import React from "react";

const PeopleCard = ({ people }) => {
    return (
        <>
            {people.map((user, index) => {
                return (
                    <div
                        key={index}
                        className="w-[160px] bg-white border-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl"
                    >
                        <div className="flex flex-col items-center py-5">
                            <img
                                className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
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
        </>
    );
};

export default PeopleCard;
