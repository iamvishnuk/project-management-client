import SignUpForm from "./SignUpForm";

function SignUp() {
    return (
        <>
            <div className="flex flex-col flex-auto w-full h-screen">
                <div className="h-full">
                    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-full">
                        <div className="hidden lg:block bg-blue-900 max-h-screen">
                            <img
                                className="object-cover w-screen h-screen"
                                src="../../../../Images/login-signup.png"
                                alt=""
                            />
                        </div>
                        <div className="flex justify-center items-center">
                            <SignUpForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
