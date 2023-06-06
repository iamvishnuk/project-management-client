import React from "react";

const PlanPricingPage = () => {
    return (
        <>
            <div className="p-10">
                <div className="md:px-20 py-5">
                    <h1 className="font-bold text-5xl text-black">
                        Simple, Transparent Pricing
                    </h1>
                </div>
                <div className="md:py-20 md:px-40">
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="border-2 rounded-lg border-blue-600 text-center py-6">
                            <h1 className="font-bold text-5xl my-3">₹0</h1>
                            <h1 className="font-bold text-2xl ">Free plan</h1>
                            <h1 className="font-semibold text-1xl ">
                                No billing
                            </h1>
                            <div>
                                <ul className="mt-7 text-left ml-10 mb-5">
                                    <li className="font-semibold text-gray-600 my-1">
                                        <i className="fa-regular fa-circle-check mr-2 text-blue-500 text-2xl"></i>
                                        Access to all basic features
                                    </li>
                                    <li className="font-semibold text-gray-600 my-1">
                                        <i className="fa-regular fa-circle-check mr-2 text-blue-500 text-2xl"></i>
                                        5 Project at a time
                                    </li>
                                    <li className="font-semibold text-gray-600">
                                        <i className="fa-regular fa-circle-check mr-2 text-blue-500 text-2xl"></i>
                                        10 Members only
                                    </li>
                                </ul>
                            </div>
                            <button className="bg-blue-600 w-[300px] text-white font-semibold py-3 rounded-lg">
                                Get Started
                            </button>
                        </div>
                        <div className="border-2 rounded-lg border-blue-600 text-center py-6 px-2">
                            <h1 className="font-bold text-5xl my-3">₹1999</h1>
                            <h1 className="font-bold text-2xl ">Basic plan</h1>
                            <h1 className="font-semibold text-1xl ">
                                One time Billig
                            </h1>
                            <div>
                                <ul className="mt-7 text-left ml-10 mb-5">
                                    <li className="font-semibold text-gray-600 my-1">
                                        <i className="fa-regular fa-circle-check mr-2 text-blue-500 text-2xl"></i>
                                        Access to all basic features
                                    </li>
                                    <li className="font-semibold text-gray-600 my-1">
                                        <i className="fa-regular fa-circle-check mr-2 text-blue-500 text-2xl"></i>
                                        20 Project at a time
                                    </li>
                                    <li className="font-semibold text-gray-600">
                                        <i className="fa-regular fa-circle-check mr-2 text-blue-500 text-2xl"></i>
                                        50 Members only
                                    </li>
                                </ul>
                            </div>
                            <button className="bg-blue-600 w-[300px] text-white font-semibold py-3 rounded-lg">
                                Get Started
                            </button>
                        </div>
                        <div className="border-2 rounded-lg border-blue-600 text-center py-6">
                            <h1 className="font-bold text-5xl my-3">₹10999</h1>
                            <h1 className="font-bold text-2xl ">Enterprise plan</h1>
                            <h1 className="font-semibold text-1xl ">
                                One time billing
                            </h1>
                            <div>
                                <ul className="mt-7 text-left ml-10 mb-5">
                                    <li className="font-semibold text-gray-600 my-1">
                                        <i className="fa-regular fa-circle-check mr-2 text-blue-500 text-2xl"></i>
                                        Access to all basic features
                                    </li>
                                    <li className="font-semibold text-gray-600 my-1">
                                        <i className="fa-regular fa-circle-check mr-2 text-blue-500 text-2xl"></i>
                                        50 Project only
                                    </li>
                                    <li className="font-semibold text-gray-600">
                                        <i className="fa-regular fa-circle-check mr-2 text-blue-500 text-2xl"></i>
                                        Unlimited Members
                                    </li>
                                </ul>
                            </div>
                            <button className="bg-blue-600 w-[300px] text-white font-semibold py-3 rounded-lg">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default PlanPricingPage;
