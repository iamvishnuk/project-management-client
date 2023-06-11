import Sidebar from "../Components/User/Sidebar/Sidebar";
import CreateProjectFrom from "../Components/User/forms/CreateProjectFrom";


const CreateProject = () => {


    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="p-10 h-screen overflow-auto flex-1">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold">Create Project</h1>
                    </div>
                    <div>
                        <CreateProjectFrom />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateProject;
