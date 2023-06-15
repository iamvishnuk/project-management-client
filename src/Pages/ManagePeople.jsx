import React from "react";
import { ManagePeopleTable } from "../Components/User/Table/ManagePeopleTable";

const ManagePeople = () => {
    return (
        <>
            <div className="mb-4">
                <h1 className="font-bold text-2xl">Manage People</h1>
            </div>
            <ManagePeopleTable />
        </>
    );
};

export default ManagePeople;
