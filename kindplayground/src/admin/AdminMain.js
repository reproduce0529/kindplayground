import axios from 'axios';
import useSWR from 'swr'
import { getCookie } from '../util/cookies';

async function fetcher(path) {
  const res = await axios(path, {
    method: 'post',
    headers: {
      Authorization: `bearer ${getCookie('token')}`
    }
  }).catch((err) => {
    alert('어드민이 아닌 경우 사용할 수 없습니다.')
    window.location.href = '/'
  })

  return res.data
}

function AdminMain() {
  const { data, error } = useSWR(`${process.env.REACT_APP_BASE_URL}/api/auth/info`, fetcher)

  return (
    <div>
      <div className="contentBox">
        <h1>ADMIN</h1>


        <div className="Content-ButtonBox">
          <a href="./AdminImg" className="Content-Button">배너 이미지 관리하기</a>
          <a href="./AdminKeyword" className="Content-Button">금지어 설정하기</a>
        </div>
      </div>
    </div>
  );
}
  
export default AdminMain;