import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  const navigate = useNavigate();

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, passwd)
      .then((credential) => {
        const user = credential.user;
        console.log("user", user);
        navigate("/");
      })
      .catch((error) => {
        console.log("error code", error.code);
        console.log("error message", error.message);
      });
  };

  return (
    <form className="refuel-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <div className="refuel-input">
        <label htmlFor="email">Email:</label>
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          id="email"
          name="email"
          value={email}
          autoComplete="off"
          placeholder="testi@ukko.com"
        />
      </div>
      <div className="refuel-input">
        <label htmlFor="passwd">Password:</label>
        <input
          onChange={(event) => setPasswd(event.target.value)}
          type="password"
          id="passwd"
          name="passwd"
          value={passwd}
          autoComplete="off"
          placeholder="salasana"
        />
      </div>
      <div className="refuel-input refuel-buttons">
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
