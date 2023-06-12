import Sidebar from "../Components/User/Sidebar/Sidebar";
import CreateProjectForm from "../Components/User/forms/CreateProjectForm";

const CreateProject = () => {
    return (
        <>
            <div className="flex">
                <Sidebar/>
                <div className="p-10 h-screen overflow-auto flex-1">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold">Create Project</h1>
                    </div>
                    <div>
                        <CreateProjectForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateProject;
