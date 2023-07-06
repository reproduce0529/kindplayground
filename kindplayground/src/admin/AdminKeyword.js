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

function AdminKeyword() {
  const { data, error } = useSWR(`${process.env.REACT_APP_BASE_URL}/api/auth/info`, fetcher)
  const [words, setWords] = useState();
  const [word, setWord] = useState('');

  async function getWords() {
    const res = await axios(`${process.env.REACT_APP_BASE_URL}/api/community/get/words`, {
      method: 'get'
    })

    setWords(res.data)
  }

  async function insertWord(e) {
    e.preventDefault();
    await axios(`${process.env.REACT_APP_BASE_URL}/api/community/word/insert`, {
      method: 'post',
      headers: {
        Authorization: `bearer ${getCookie('token')}`
      },
      data: {
        word
      }
    }).then((res) => {
      alert('추가 완료')
      window.location.reload()
    }).catch((Err) => {
      alert(Err.response.data.message)
    })
  }

  async function delWords(uuid) {
    await axios(`${process.env.REACT_APP_BASE_URL}/api/community/word/delete`, {
      method: 'delete',
      headers: {
        Authorization: `bearer ${getCookie('token')}`
      },
      data: {
        uuid
      }
    }).then((res) => {
      alert('삭제 완료')
      window.location.reload();
    }).catch((err) => {
      alert(err.response.data.message)
    })
  }

  useEffect(() => {
    getWords()
  }, [])

  return (
    <div>
      <div className="contentBox">
        <a href="./AdminMain">/Admin/</a>
        <h1>Forbidden word</h1>
        <div className="BennerBox">
          <form onSubmit={insertWord} id="BennerBox">
            <p className="BennerAdminTitle">금지어 추가</p>
            <input
              name="ForbiddenKeyw"
              id="ForbiddenKeyw"
              type="text"
              onChange={(e) => setWord(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">금지어 추가하기</button>
          </form>
          <p className="BennerAdminTitle">금지어 목록</p>

          <div className="BennerList">
            {words ?
              Object.values(words.words).map((value, index) => (
                <div className="BennerItem" key={index}>
                  <div className="BennerItem-Num">{index+1}</div>
                  <div className="BennerItem-text">{value.word}</div>
                  <div className="BennerItem-del"><button className="btn btn-danger" onClick={() => delWords(value.uuid)}>삭제</button></div>
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
  
export default AdminKeyword;
  