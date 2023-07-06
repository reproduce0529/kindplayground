import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { getCookie } from "../util/cookies";
import getHashTag from '../util/getHashTag'

function Review() {
  const [category, setCategory] = useState('K-Star')
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0);
  const [currentpage, setCurrentpage] = useState(1);
  const [user, setUser] = useState(undefined);
  const [like_childrens, setLike] = useState([]);

  async function getElements(path) {
    await axios(path, { method: 'get' })
      .then((res) => {
        setItems(res.data.posts)
        setTotal(res.data.post_cnt)
      })
  }

  const setPage = (e) => {
    setCurrentpage(e);

    setItems([])
  };

  useEffect(() => {
    getElements(`${process.env.REACT_APP_BASE_URL}/api/community/get/posts?offset=${currentpage}&limit=10&type=Review&category=${category}`)
  }, [currentpage, category])

  async function likeSubmit(id) {
    await axios(`${process.env.REACT_APP_BASE_URL}/api/community/like`, {
      method: 'post',
      headers: {
        Authorization: `bearer ${getCookie('token')}`
      },
      data: {
        id
      }
    }).then((res) => {
      alert(res.data.message)
    }).catch((err) => {
      alert(err.response.data.message)
    })
  }

  async function shareSubmit(id) {
    const res = await axios(`${process.env.REACT_APP_BASE_URL}/api/community/post/share`, {
      method: 'post',
      headers: {
        Authorization: `bearer ${getCookie('token')}`
      },
      data: {
        id
      }
    })
    
    if (!res.data.success) return alert("복사에 실패하였습니다.")
    else {
      const textarea = document.createElement("textarea");
      textarea.value = res.data.url;
      textarea.style.top = 0;
      textarea.style.left = 0;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.focus();
      // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
      textarea.select();
      // 흐름 5.
      document.execCommand("copy");
      // 흐름 6.
      document.body.removeChild(textarea);
      alert("Copied successfully.");
    }
  }

  async function saveSubmit(id) {
    await axios(`${process.env.REACT_APP_BASE_URL}/api/community/save`, {
      method: 'post',
      headers: {Authorization: `bearer ${getCookie('token')}`},
      data: {
        id
      }
    }).then((res) => {
      alert(res.data.message)
    }).catch((err) => {
      alert(err.response.data.message)
    })
  }

  async function getUser() {
    await axios(`${process.env.REACT_APP_BASE_URL}/api/auth/info`, {
      method: 'get',
      headers: {
        Authorization: `bearer ${getCookie('token')}`
      }
    }).then((res) => {
      setUser(res.data.user)
    }).catch((err) => {
      console.error(err)
    })
  }

  useEffect(() => {
    getUser();
  }, [])
  console.log(!items || !getCookie('token') && !user)
  
  if (!items || (!getCookie('token') && !user)) return <></>
  else {
    return (
      <div>
        <div className="review_head_menuBox">
          <p onClick={() => { setCategory("K-Star"); }} className={`review_pop_head_menuItem ${category === "K-Star" ? 'active' : ""}`}>K-Star</p>
          <p onClick={() => { setCategory("K-Contents"); }} className={`review_pop_head_menuItem ${category === "K-Contents" ? "active" : ""}`}>K-Contents</p>
          <a href="./ReviewForm" className="review_pop_head_menuItem"><i class="fa-solid fa-pencil"></i>&nbsp;&nbsp; Write new</a>
        </div>
  
  
        <div className="review_contentBox">
          {items.length > 0 ? 
            <>
              {Object.values(items).map((value, index) => (
                <a className="review_contentItem">
                  <div className="review_contentItem_top" onClick={() => window.location.href = `/Review/${value.id}`}>
                    <div className="review_contentItem_top_left">
                      <div className="review_contentItem_top_img" style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/api/file/get/profile?uuid=${value.author.uuid})`, backgroundSize: 'cover' }}></div>
                      <div className="review_contentItem_top_textbox">
                        <div className="review_contentItem_top_name">{value.author.nickname}</div>
                        <div className="review_contentItem_top_silup">{value.syrup}ml</div>
                      </div>
                    </div>
                  </div>
                  <div className="review_contentItem_body" onClick={() => window.location.href = `/Review/${value.id}`}>
                    {value.banner ? 
                      <img src={value.banner} alt="" />
                    :
                      <img alt="" />
                    }
                    <div className="review-title">{value.title}</div>
                    <div className="review-hashtag">
                      {Object.values(getHashTag(value.hashtag)).map((value, index) => (
                        <div className="hashtag-item">{value}</div>
                      ))}
                    </div>
                  </div>
                  <div className="review_contentItem_bottom">
                    <div className="review_contentItem_bottom_left">
                      <div className="review_contentItem_bottom_item" onClick={() => likeSubmit(value.id)}><i class={`${user && value.like_childrens.includes(user.uuid) ? "Like_Active": ""} fa-regular fa-heart`}></i> {value.like} </div>
                      <div className="review_contentItem_bottom_item"><i class="fa-regular fa-comment"></i> {value.comment} </div>
                      <div className="review_contentItem_bottom_item" onClick={() => shareSubmit(value.id)}><i class="fa-regular fa-share-from-square"></i> {value.share} </div>
                      <div className="review_contentItem_bottom_item" onClick={() => saveSubmit(value.id)}><i class="fa-regular fa-floppy-disk"></i> {value.save} </div>
                    </div>
                    <div className="review_contentItem_bottom_item">views {value.views}</div>
                  </div>
                </a>
              ))}
            </>
          :
            <h1 style={{ textAlign: 'center' }}>There are no posts.</h1>
          }
  
          <Pagination
            activePage={currentpage}
            totalItemsCount={total}
            itemsCountPerPage={10}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={setPage}
          />
        </div>
      </div>
    );
  }
}

export default Review;
