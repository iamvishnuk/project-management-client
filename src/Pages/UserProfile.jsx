import { useSelector } from "react-redux";
import {
    getUserProfile,
    editUserDetails,
    uploadImage,
} from "../Services/userApi";
import { useState } from "react";
import { useEffect } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { RotatingSquare } from "react-loader-spinner"

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState({});
    const [value, setValue] = useState("");
    const [fieldName, setFieldName] = useState("");
    const { userId } = useSelector((state) => state.user);
    const [uploading, setUploading] = useState(false);
    const [showLabel, setShowLabel] = useState(false)

    // for getting the user details
    const getData = () => {
        getUserProfile(userId)
            .then((res) => {
                setUserDetails(res.data.userDetails);
            })
            .catch((error) => console.log(error));
    };

    // for editing the user details
    const edit = () => {
        const data = {
            value,
            fieldName,
        };
        editUserDetails(data)
            .then((res) => {
                getData();
            })
            .catch((error) => console.log(error));
    };

    // for handling the image change
    const handleImageChange = (e) => {
        setUploading(true)
        const file = e.target.files[0];
        if(!file) {
            return
        }
        const formData = new FormData();
        formData.append("image",file)
        uploadImage(formData)
            .then((res) => {
                getData()
                setUploading(false)
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="">
                <div className="mb-5">
                    <div
                        className="border-2 shadow-lg w-40 relative"
                        onMouseEnter={() => setShowLabel(true)}
                        onMouseLeave={() => setShowLabel(false)}
                    >
                        {uploading ? (
                            <div className="flex justify-center items-center w-40 h-40">
                                <RotatingSquare
                                    height="100%"
                                    width="100%"
                                    color="#9AC5F4"
                                    ariaLabel="rotating-square-loading"
                                    strokeWidth="4"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </div>
                        ) : (
                            <>
                                <img
                                    className="object-cover w-40 h-40"
                                    src={
                                        userDetails && userDetails?.image
                                            ? userDetails?.image
                                            : "../../../../public/images/profile.png"
                                    }
                                    alt=""
                                />
                                {showLabel && (
                                    <label
                                        htmlFor="img"
                                        className="absolute top-[40%] left-[40%] backdrop:blur"
                                    >
                                        <MdAddAPhoto size={30} color="white" />
                                    </label>
                                )}
                            </>
                        )}
                    </div>
                    <input
                        className="hidden"
                        type="file"
                        id="img"
                        onChange={handleImageChange}
                    />
                </div>

                <div className="mt-10">
                    <h1 className="uppercase font-medium text-xl">
                        Account Infromation
                    </h1>
                    <div className="mt-6 grid gap-6">
                        <div className="flex items-center">
                            <h1 className="text-lg font-medium min-w-[20rem]">
                                Username
                            </h1>
                            <h1
                                className="text-lg font-medium border-2 border-gray-300 py-1 pl-5 min-w-[20rem]"
                                contentEditable="true"
                                suppressContentEditableWarning={true}
                                onInput={(e) => {
                                    setValue(e.currentTarget.textContent);
                                }}
                                onClick={() => setFieldName("userName")}
                                onBlur={edit}
                            >
                                {userDetails && userDetails?.userName}
                            </h1>
                        </div>
                        <div className="flex items-center">
                            <h1 className="text-lg font-medium min-w-[20rem]">
                                Email
                            </h1>
                            <h1 className="text-lg font-medium border-2 border-gray-300 py-1 pl-5 min-w-[20rem]">
                                {userDetails && userDetails?.email}
                            </h1>
                        </div>
                        <div className="flex items-center">
                            <h1 className="text-lg font-medium min-w-[20rem]">
                                Your job title
                            </h1>
                            <h1
                                className="text-lg font-medium border-2 border-gray-300 py-1 pl-5 min-w-[20rem]"
                                contentEditable="true"
                                suppressContentEditableWarning={true}
                                onInput={(e) =>
                                    setValue(e.currentTarget.textContent)
                                }
                                onClick={() => setFieldName("your_job_title")}
                                onBlur={edit}
                            >
                                {userDetails && userDetails?.your_job_title}
                            </h1>
                        </div>
                        <div className="flex items-center">
                            <h1 className="text-lg font-medium min-w-[20rem]">
                                Your orgnization
                            </h1>
                            <h1
                                className="text-lg font-medium border-2 border-gray-300 py-1 pl-5 min-w-[20rem]"
                                contentEditable="true"
                                suppressContentEditableWarning={true}
                                onInput={(e) =>
                                    setValue(e.currentTarget.textContent)
                                }
                                onClick={() =>
                                    setFieldName("your_orgainzation")
                                }
                                onBlur={edit}
                            >
                                {userDetails && userDetails?.your_orgainzation}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default UserProfile;
