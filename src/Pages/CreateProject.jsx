import Sidebar from "../Components/User/Sidebar/Sidebar";
import CreateProjectForm from "../Components/User/forms/CreateProjectForm";

const CreateProject = () => {
    return (
        <>
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Create Project</h1>
            </div>
            <div>
                <CreateProjectForm />
            </div>
        </>
    );
};

export default CreateProject;
