import axios from "axios";
import useSWR from 'swr'
import { getCookie } from "../util/cookies";
import { useEffect, useState } from "react";

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

function AdminImg() {
  const { data } = useSWR(`${process.env.REACT_APP_BASE_URL}/api/auth/info`, fetcher)
  const [items, setItems] = useState();
  const [file, setFile] = useState();
  const [url, setUrl] = useState('');

  async function getElements(path) {
    const res = await axios(path, {
      method: 'GET'
    })

    setItems(res.data)
  }

  function handleChange(e) {
		if (!e.target.files) return
    console.log(e.target.files)
		setFile(e.target.files[0]);
	}

  async function addImage(e) {
    e.preventDefault();

    const formData = new FormData();

    if (!file) return alert("이미지를 넣어주세요")

		formData.append("file", file)
    formData.append("url", url)
    
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/file/add/banner`, formData, {
      method: 'post',
      headers:{
        Authorization: `bearer ${getCookie('token')}`
      }
    }).then((res) => {
      console.log(res.data.message)
      window.location.reload();
    }).catch((err) => {
      console.log(err)
      console.log(err.response.data.message)
      alert(err.response.data.message)
    })
  }

  async function deleteImage(uuid) {
    await axios(`${process.env.REACT_APP_BASE_URL}/api/file/del/banner`, {
      method: 'delete',
      headers: {
        Authorization: `bearer ${getCookie('token')}`
      },
      data: {
        uuid
      }
    }).then((res) => {
      window.location.reload();
    }).catch((err) => {
      alert(err.response.data.message)
    })
  }

  useEffect(() => {
    getElements(process.env.REACT_APP_BASE_URL + '/api/file/get/banners')
  }, [])

  return (
    <div>
      <div className="contentBox">
        <a href="./AdminMain">/Admin/</a>
        <h1>Banner Img</h1>
        <div className="BennerBox">
          <form method="post" id="BennerBox" onSubmit={addImage}>
            <p className="BennerAdminTitle">이미지 추가</p>
            <input
              name="bennerImg"
              id="bennerImg"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />

            <input
              name="bennerLink"
              id="bennerLink"
              type="url" placeholder="링크를 입력하세요."
              onChange={(e) => setUrl(e.target.value)}/>


            <label htmlFor="bennerImg">
              <div className="dot"></div>9:4비율의 이미지만 업로드하세요
            </label>

        <button className="btn btn-primary">이미지 등록하기</button>
          </form>
          <p className="BennerAdminTitle">이미지 목록</p>

          <div className="BennerList">
            {items ? 
              Object.values(items.banners).map((value, index) => (
                <div className="BennerItem" key={index}>
                  <div className="BennerItem-Num">{index+1}</div>
                  <div className="BennerItem-img"><img src={process.env.REACT_APP_BASE_URL + "/api/file/get/banner?uuid=" + value.uuid} alt="" /></div>
                  <div className="BennerItem-Num">{value.url}</div>
                  <div className="BennerItem-del"><button className="btn btn-danger" onClick={() => deleteImage(value.uuid)}>삭제</button></div>
                </div>
              ))
            :
              <></>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminImg;
