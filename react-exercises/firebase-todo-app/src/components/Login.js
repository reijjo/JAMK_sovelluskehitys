import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  const navigate = useNavigate();

  const loginUser = (event) => {
    event.preventDefault();

    // const auth = getAuth();
    signInWithEmailAndPassword(auth, email, passwd)
      .then((userCredential) => {
        const user = userCredential.user;
        // setUser(user);
        console.log("user", user);
        navigate("/todos");
      })
      .catch((error) => {
        console.log("error code", error.code);
        console.log("error message", error.message);
      });
  };

  return (
    <form className="login" onSubmit={loginUser}>
      {/* <form> */}
      <div className="email-input">
        <div>Email:</div>
        <div>
          <input
            type="text"
            id="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </div>
      <div className="passwd-input">
        <div>Password:</div>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          onChange={(event) => setPasswd(event.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {/* </form> */}
    </form>
  );
};

export default Login;
