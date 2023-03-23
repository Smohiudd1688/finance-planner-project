import React, {useState} from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Login({setIsLogged, setCategories, setWantedItems}) {
    const [on, setOn] = useState(false);

    return (
        <div>
            {on ? <SignUp setIsLogged={setIsLogged} setOn={setOn} setCategories={setCategories} setWantedItems={setWantedItems} /> 
            : <SignIn setIsLogged={setIsLogged} setOn={setOn} setCategories={setCategories} setWantedItems={setWantedItems} />}
        </div>
    )
}

export default Login;