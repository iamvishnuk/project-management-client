import React from "react";

const ErrorPage = () => {
    return (
        <>
            <div className="flex justify-center items-center h-screen bg-[#F3F3F3]">
                <div className="text-center">
                    <h1 className="text-7xl font-extrabold mb-3">404</h1>
                    <h1 className="text-4xl font-medium my-5">Page not found</h1>
                    <button className="border-2 border-gray-300 py-2 px-8 font-medium hover:bg-blue-600 hover:text-white">Go Back</button>
                    <div>
                        <img
                            src="../../../../Images/404.webp"
                            alt=""
                            className="lg:w-2/6 m-auto"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
