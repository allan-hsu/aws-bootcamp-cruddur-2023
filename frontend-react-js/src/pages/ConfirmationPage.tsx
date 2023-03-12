import "./ConfirmationPage.css";
import React from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as Logo } from "../components/svg/logo.svg";
import { Auth } from "aws-amplify";
import { useAuth } from "../store/authentication";

export default function ConfirmationPage() {
  const [username, setUsername] = React.useState("");
  const [code, setCode] = React.useState("");
  const [errors, setErrors] = React.useState("");
  const [codeSent, setCodeSent] = React.useState(false);
  const { setAuthToken } = useAuth();

  const params = useParams();

  const code_onchange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCode(event.target.value);
  };
  const username_onchange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };

  const resend_code = async (event: any) => {
    setErrors('')
    try {
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
      setCodeSent(true)
    } catch (err: any) {
      console.log(err)
      if (err.message == 'Username cannot be empty') {
        setErrors("You need to provide an email in order to send Resend Activiation Code")
      } else if (err.message == "Username/client id combination not found.") {
        setErrors("Email is invalid or cannot be found.")
      }
    }
  }


  const onsubmit = async (event: any) => {
    event.preventDefault();
    setErrors('')
    try {
      await Auth.confirmSignUp(username, code);

      window.location.href = "/";
    } catch (error: any) {
      setErrors(error.message)
    }
    return false
  }

  let code_button;
  if (codeSent) {
    code_button = (
      <div className="sent-message">
        A new activation code has been sent to your email
      </div>
    );
  } else {
    code_button = (
      <button className="resend" onClick={resend_code}>
        Resend Activation Code
      </button>
    );
  }

  React.useEffect(() => {
    if (params.email) {
      setUsername(params.email);
    }
  }, []);

  // Unhandled Promise rejection: – "This URL is invalid" – "; Zone:" – "<root>" – "; Task:" – "Promise.then" – "; Value:" (2)
  return (
    <article className="confirm-article">
      <div className="recover-info">
        <Logo className="logo" />
      </div>
      <div className="recover-wrapper">
        <form className="confirm_form" onSubmit={onsubmit}>
          <h2>Confirm your User</h2>
          <div className="fields">
            <div className="field text_field email">
              <label>User name</label>
              <input type="text" value={username} onChange={username_onchange} />
            </div>
            <div className="field text_field code">
              <label>Confirmation Code</label>
              <input type="text" value={code} onChange={code_onchange} />
            </div>
          </div>
          {errors && <div className="errors">{errors}</div>}
          <div className="submit">
            <button type="submit">Confirm User</button>
          </div>
        </form>
      </div>
      {code_button}
    </article>
  );
}
