
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getCookie } from "../util/cookies";


function UserModify() {
	const [file, setFile] = useState();
	const [urlFile, setUrlFile] = useState('');
	const [userProfile, setProfile] = useState();
	const [code, setCode] = useState('');
	const [email, setEmail] = useState();
	const [codeStatus, setStatus] = useState(false);
	const [id, setId] = useState();
	const [introduce, setIntroduce] = useState();

	async function getUser() {
    await axios(`${process.env.REACT_APP_BASE_URL}/api/auth/info`, {
      method: 'get',
      headers: {
        Authorization: `bearer ${getCookie('token')}`
      }
    }).then((res) => {
			console.log(res.data.user.email, res.data.user.nickname, res.data.user.introduction)
      setEmail(res.data.user.email)
			setId(res.data.user.nickname)
			setIntroduce(res.data.user.introduction)
			setProfile(`${process.env.REACT_APP_BASE_URL}/api/file/get/profile?uuid=${res.data.user.uuid}`)
    }).catch((err) => {
			console.error(err)
    })
  }

	useEffect(()=> {
		getUser();
	}, [])


	function handleChange(e) {
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

		const formData = new FormData();

		formData.append("email", email)
		formData.append("nickname", id)
		formData.append("introduction", introduce)
		formData.append("file", file)

		const res = await axios.post(process.env.REACT_APP_BASE_URL+"/api/auth/update?code=" + code, formData , {
			method: "post",
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `bearer ${getCookie('token')}`
			},
		}).catch((err) => {
			alert(err.response.data.message)
		})

		if (res.data.success) {
			alert('업데이트 완료')
			window.location.href = "/"
		}
	}


	if (!email || !id || !introduce) return <></>
	else {
		return (
			<div>
				<div className="SectionList">
					<section className="ContentBox">
						<div className="inner">
							<form className="ContentBox-form" id="SignUpForm" onSubmit={returnFalse} autoComplete="false" method="post" action="#">
								<h2>Information Modify</h2>
								<div className="form-inner">
									<div className="form-imggroup">
										<label htmlFor="profileImg" id="profileImg-label">
											<img src={urlFile ? urlFile : userProfile} alt="" />
										</label>
										<label htmlFor="profileImg" id="fileName">Profile Img(Click)</label>
										<input type="file" id="profileImg" onChange={handleChange} name="profileImg" className="hidden" accept="image/gif, image/jpeg, image/png" />
									</div>
	
									<div className="form-inputGroup">
										<label className="form-namelLabel" htmlFor="registEmail"><div className="form-dot"></div> &nbsp;&nbsp; Email</label>
										<input autoComplete="false" type="email" id="registEmail" name="registEmail" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
										{codeStatus ? 
											<input autoComplete="false" type="text" id="registCode" name="registCode" placeholder="Enter your Code" style={{ marginTop: "10px" }} onChange={(e) => setCode(e.target.value)} />
										:
											<button type="button" className="form-out-button" onClick={sendCode}>activate</button>
										}
									</div>
	
									<div className="form-inputGroup">
										<label className="form-namelLabel" htmlFor="registId"><div className="form-dot"></div> &nbsp;&nbsp; Nick name</label>
										<input autoComplete="false" type="text" id="registId" name="registId" placeholder="Enter your Nick Name" value={id} onChange={(e) => setId(e.target.value)} />
									</div>
	
	
									<div className="form-inputGroup">
										<label className="form-namelLabel" htmlFor="Introduce"><div className="form-dot"></div> &nbsp;&nbsp; Introduce</label>
										<textarea autoComplete="false" id="Introduce" name="Introduce" placeholder="Enter your Introduce" value={introduce} onChange={(e) => setIntroduce(e.target.value)}></textarea>
									</div>
	
									<button className="form-button" type="submit">Information Modify</button>
	
								</div>
							</form>
						</div>
					</section>
				</div>
	
			</div>
		);
	}
}

export default UserModify;
