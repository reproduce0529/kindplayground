import useSWR from 'swr'
import { getCookie } from '../util/cookies'
import axios from 'axios'

async function fetcher(path) {
  const res = await axios(path, {
    method: 'post',
    headers: {
      Authorization: `bearer ${getCookie('token')}`
    }
  })

  return res.data
}

async function checkDay(){
  await axios(`${process.env.REACT_APP_BASE_URL}/api/auth/attendance`, {
    method: 'post',
    headers: {
      Authorization: `bearer ${getCookie('token')}`
    }
  })
  .then((res) => {
    alert("[NOTICE] Attendance Check has been completed. Syrup 30ml is filled.")
  })
  .catch((err) => {
    alert(err.response.data.message)
  })

}

function Header() {
  const { data, error } = useSWR(`${process.env.REACT_APP_BASE_URL}/api/auth/info`, fetcher)

  return (
    <div>
      <header className="header">
        <div className="inner header_inner">
          
          <div className="header-inner-left">
            <a href="/" className="header_logo_box">
              <img src="../src/logo.png"></img>
            </a>

            <div className="menu_list_box">
              <a href="/Community" className="menu_atag">Community</a>
              <a href="/Review" className="menu_atag">Review</a>
              <a onClick={checkDay} className="menu_atag">Attendance Check</a>
            </div>
          </div>


          <div className="header-inner-right">
            <a href={error ? "/SignIn" : "/Mypage"}>
              <img src="../src/user.svg" alt="" />
              <div className="User-menu">
                {error ?
                  <>
                    <a href="/SignIn" className="userMenu-item">Sign In / Sign Out</a>
                    <a href="/SignUp" className="userMenu-item">Sign Up</a>
                  </>
                :
                  <>
                    <a href='/logOut' className='userMenu-item'>LogOut</a>
                    <a href="/Mypage" className="userMenu-item">Mypage</a>
                    {data && data.user.type !== 'user' ? 
                      <a href="/AdminMain" className="userMenu-item">Admin</a>
                    :
                      <></>
                    }
                  </>
                }
              </div>
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
