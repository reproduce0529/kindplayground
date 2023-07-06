
import axios from "axios";
import React, { useState } from "react";

function SignUp() {

	const [file, setFile] = useState();
	const [urlFile, setUrlFile] = useState('');
	const [code, setCode] = useState('');
	const [email, setEmail] = useState('');
	const [codeStatus, setStatus] = useState(false);
	const [id, setId] = useState('');
	const [pw, setPw] = useState('');
	const [gender, setGender] = useState('M');
	const [birth, setBirth] = useState('');
	const [introduce, setIntroduce] = useState('');

	function handleChange(e) {
		console.log(e.target.files);
		if (!e.target.files) return
		document.getElementById("fileName").innerHTML = e.target.files[0]['name'];
		setFile(e.target.files[0]);
		setUrlFile(URL.createObjectURL(e.target.files[0]));
	}

	const sendCode = async (e) => {
		e.preventDefault();
		const registEmail = document.getElementById("registEmail");

		if (email.length <= 0) {
			alert("Enter your E-mail Address and check it")
			registEmail.focus()
		}

		await axios(process.env.REACT_APP_BASE_URL + `/api/system/sendCode`, {
			method: 'post',
			data: {
				email
			}
		})

		setStatus(true);
	}

	const returnFalse = async (e) => {
		e.preventDefault();

		const registEmail = document.getElementById("registEmail");
		const registId = document.getElementById("registId");
		const registPW = document.getElementById("registPW");
		const registBD = document.getElementById("registBD");
		const Introduce =  document.getElementById("Introduce");

		if (email.length <= 0) {
			alert("Enter your E-mail Address and check it")
			registEmail.focus()
		}
		
		if (id.length <= 0) {
			alert("Enter your ID")
			registId.focus()
		}
		
		if (pw.length <= 0) {
			alert("Enter your Password")
			registPW.focus()
		}
		
		if (birth.length <= 0) {
			alert("Enter your birthday")
			registBD.focus()
		}
		
		if (introduce.length <= 0) {
			alert("Enter your Introduce")
			Introduce.focus()
		}

		const formData = new FormData();

		formData.append("nickname", id)
		formData.append("introduction", introduce)
		formData.append("email", email)
		formData.append("gender", gender)
		formData.append("birth", birth)
		formData.append("password", pw)
		formData.append("file", file)

		const res = await axios.post(process.env.REACT_APP_BASE_URL+"/api/auth/signUp?code=" + code, formData , {
			method: "post",
			headers: {
				"Content-Type": "multipart/form-data"
			},
		}).catch((err) => {
			alert(err.response.data.message)
		})

		if (res.data.success) {
			alert('Sign Up Completed ')
			window.location.href = "/SignIn"
		}
	}

	return (
		<div>
			<div className="SectionList">
				<section className="ContentBox">
					<div className="inner">
						<form className="ContentBox-form" id="SignUpForm" onSubmit={returnFalse} autoComplete="false" method="post" action="#">
							<h2>Sign Up</h2>
							<div className="form-inner">
								<div className="form-imggroup">
									<label htmlFor="profileImg" id="profileImg-label">
										<img src={urlFile} alt="" />
									</label>
									<label htmlFor="profileImg" id="fileName">Profile Img(Click)</label>
									<input type="file" id="profileImg" onChange={handleChange} name="profileImg" className="hidden" accept="image/gif, image/jpeg, image/png" />
								</div>

								<div className="form-inputGroup">
									<label className="form-namelLabel" htmlFor="registEmail">
									<div className="form-dot"></div> &nbsp;&nbsp; Email</label>
									<input autoComplete="false" type="email" id="registEmail" name="registEmail" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
									
									{codeStatus ? 
										<input autoComplete="false" type="text" id="registCode" name="registCode" placeholder="Enter your Code" style={{ marginTop: "10px" }} onChange={(e) => setCode(e.target.value)} />
									:
										<button type="button" className="form-out-button" onClick={sendCode}>activate</button>
									}

								</div>

								<div className="form-inputGroup">
									<label className="form-namelLabel" htmlFor="registId"><div className="form-dot"></div> &nbsp;&nbsp; Nick name</label>
									<input autoComplete="false" type="text" id="registId" name="registId" placeholder="Enter your Nick Name" onChange={(e) => setId(e.target.value)} />
								</div>

								<div className="form-inputGroup">
									<label className="form-namelLabel" htmlFor="registPW"><div className="form-dot"></div> &nbsp;&nbsp; Password</label>
									<input autoComplete="false" type="password" id="registPW" name="registPW" placeholder="Enter your Password" onChange={(e) => setPw(e.target.value)} />
								</div>

								<label className="form-namelLabel" htmlFor="checkbox1"><div className="form-dot"></div> &nbsp;&nbsp; Gender</label>
								<div className="form-genderGroup">
									<input type="button" value="M" id={`form-gender-${gender === "M" ? "true" : "false"}`} name="registGender" onClick={() => setGender('M')} />
									<input type="button" value="F" id={`form-gender-${gender === "F" ? "true" : "false"}`} name="registGender" onClick={() => setGender('F')} />
								</div>

								<div className="form-inputGroup">
									<label className="form-namelLabel" htmlFor="registBD"><div className="form-dot"></div> &nbsp;&nbsp; Birthday</label>
									<input autoComplete="false" type="date" id="registBD" name="registBD" onChange={(e) => setBirth(e.target.value)} />
								</div>

								<div className="form-inputGroup">
									<label className="form-namelLabel" htmlFor="Introduce"><div className="form-dot"></div> &nbsp;&nbsp; Introduce</label>
									<textarea autoComplete="false" id="Introduce" name="Introduce" placeholder="Enter your Introduce" onChange={(e) => setIntroduce(e.target.value)}></textarea>
								</div>

								<button type="submit" className="form-button">Sign Up</button>

								<a className="noticeText" href="/SignIn">If you already have an account, please log in</a>
							</div>
						</form>
					</div>
				</section>
			</div>
		</div>
	);
}

export default SignUp;
