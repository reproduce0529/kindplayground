import React from "react";
import useSWR from 'swr'
import axios from 'axios';
import { getCookie } from '../util/cookies';

async function fetcher(path) {
  console.log("hi")
  console.log(getCookie('token'));
  const res = await axios(path, {
    method: 'post',
    headers: {
      Authorization: `bearer ${getCookie('token')}`
    }
  })

  return res.data
} 

function genderSet(gender) {
  if (gender === "M") {
    return "Male"
  } else if (gender === "F") {
    return "Female"
  } else {
    return "알수없음"
  }
}

const Mypage = () => {
  const { data, error, isLoading } = useSWR(`${process.env.REACT_APP_BASE_URL}/api/auth/info`, fetcher)
  if (error) {
    window.location.href = "/SignIn"
    return (
      <></>
    )
  }

  if (isLoading) {
    return (
      <></>
    )
  } else {
    return (
      <div>
        <section className="ContentBox">
          <div className="profile-box">
            <div className="profile-head">
              <div className="profile-head-left">
                <img src={`${process.env.REACT_APP_BASE_URL}/api/file/get/profile?uuid=${data.user.uuid}`} alt="" />
              </div>
              <div className="profile-head-right">
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Nickname</th>
                      <td>{data.user.nickname}</td>
                    </tr>
  
                    <tr>
                      <th>Syrup</th>
                      <td>{data.user.syrup}ml</td>
                    </tr>
  
                    <tr>
                      <th>Attendance</th>
                      <td> {data.user.attendance} Days</td>
                    </tr>
                    <tr>
                      <th>E-Mail</th>
                      <td>{data.user.email}</td>
                    </tr>
  
                    <tr>
                      <th>Birthday</th>
                      <td>{data.user.birth}</td>
                    </tr>
  
                    <tr>
                      <th>Gender</th>
                      <td>{genderSet(data.user.gender)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
  
            <div className="profile-body">
              <div className="profile-body-textBox">
                {data.user.introduction}
              </div>
  
              <a href="./UserModify" className="btn btn-warning">Modify</a>
            </div>
          </div>
  
        </section>
      </div>
    );
  }
}

export default Mypage;
