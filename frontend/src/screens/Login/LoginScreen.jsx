import "./login.css";
import metaMaskLogo from "../../assets/metamask-icon.webp";
import quizImage from "../../assets/quiz.png";
import useContract from "../../hooks/useContract.js";

function LoginScreen() {
  const { handleLogin } = useContract();

  return (
    <div className="login">
      <div className="left-panel">
        <img src={quizImage} alt="Logo" />
      </div>
      <div className="right-panel">
        <button onClick={handleLogin} className="metamask-button">
          <img src={metaMaskLogo} alt="MetaMask" className="metamask-icon" />{" "}
          Login with MetaMask
        </button>
        <p className="get-metamask">
          Dont have MetaMask ? <br />
          <a className="get-metamask-link" href="https://metamask.io/">
            {" "}
            Get the extension.
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginScreen;
