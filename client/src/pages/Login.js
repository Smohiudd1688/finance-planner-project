import React, {useState} from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Login({setIsLogged}) {
    const [on, setOn] = useState(false);

    return (
        <div>
            {on ? <SignUp setIsLogged={setIsLogged} setOn={setOn} /> : <SignIn setIsLogged={setIsLogged} setOn={setOn} />}
        </div>
    )
}

export default Login;