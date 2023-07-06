import axios from "axios";
import { useState } from "react";
import { setCookie } from "../util/cookies";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function onSubmit(e) {
    e.preventDefault();
    
    await axios(process.env.REACT_APP_BASE_URL + "/api/auth/login", {
      method: 'post',
      data: {
        email,
        password
      }
    }).then((res) => {
      setCookie("token", res.data.token, { path: '/' })
      window.location.href="/"
    }).catch((err) => {
      alert(err.response.data.message)
    })
  }

  return (
    <div>
      <section className="ContentBox">
        <div className="inner">
          <form className="ContentBox-form" onSubmit={onSubmit} autoComplete="false" method="post">
            <h2>Sign In</h2>
            <div className="form-inner">
              <div className="form-inputGroup">
                <label className="form-namelLabel" htmlFor="loginId"><div className="form-dot"></div> &nbsp;&nbsp; Email</label>
                <input autoComplete="false" type="text" id="loginId" name="loginId" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-inputGroup">
                <label className="form-namelLabel" htmlFor="loginPW"><div className="form-dot"></div> &nbsp;&nbsp; Password</label>
                <input autoComplete="false" type="password" id="loginPW" name="loginPW" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button className="form-button">Sign In</button>
              <a className="noticeText" href="./SignUp">If you don't have an account, sign up for membership</a>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
