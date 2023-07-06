import axios from "axios";
import React, { useEffect, useState } from "react";
import { getCookie } from "../util/cookies";
import { useParams } from "react-router-dom";
import moment from "moment";
import xss from "xss";
import getHashTag from "../util/getHashTag";
import TextComment from '../com/TextComponent'

export default function ReviewSeeMore() {
  const { id } = useParams()
  const [syrup, setSyrup] = useState(0);
  const [comment, setComment] = useState('');
  const [user, setUser] = useState(undefined);
  const [data, setPost] = useState(undefined);
  const [like_childrens, setLike] = useState([]);

  async function commentSubmit(e) {
    e.preventDefault();
  
    await axios(`${process.env.REACT_APP_BASE_URL}/api/community/comment/insert`, {
      method: 'post',
      headers: {
        Authorization: `bearer ${getCookie('token')}`
      },
      data: {
        id,
        content: comment
      }
    })
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      alert(err.response.data.message)
    })
  }

  async function commentDeleteSubmit(id) {
    await axios(`${process.env.REACT_APP_BASE_URL}/api/community/comment/delete`, {
      method: 'delete',
      headers: {
        Authorization: `bearer ${getCookie('token')}`
      },
      data: {
        id
      }
    })
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      alert(err.response.data.message)
    })
  }

  async function likeSubmit(e) {
    e.preventDefault();
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
      window.location.reload();
    }).catch((err) => {
      alert(err.response.data.message)
    })
  }

  async function shareSubmit(e) {
    e.preventDefault();
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

  async function saveSubmit(e) {
    e.preventDefault();
    await axios(`${process.env.REACT_APP_BASE_URL}/api/community/save`, {
      method: 'post',
      headers: {Authorization: `bearer ${getCookie('token')}`},
      data: {
        id
      }
    }).then((res) => {
      alert(res.data.message)
      window.location.reload();
    }).catch((err) => {
      alert(err.response.data.message)
    })
  }

  async function deleteSubmit(e) {
    e.preventDefault();
    await axios(`${process.env.REACT_APP_BASE_URL}/api/community/post/delete`, {
      method: 'delete',
      headers: {
        Authorization: `bearer ${getCookie('token')}`
        },
        data: {
          id
        }
      }).then(() => {
        window.location.href = '/Review';
      }).catch((err) => {
        alert(err.response.data.message)
      })
  }

  async function reportSubmit(e) {
    e.preventDefault();
  
    await axios(`${process.env.REACT_APP_BASE_URL}/api/community/report`, {
      method: 'post',
      data: {
        id
      }
    }).then((res) => {
      if(window.confirm(" Do you want to report this post?")){
        alert('It was reported normally.')
        window.location.href = '/'
      }
    }).catch((err) => {
      alert(err.response.data.message)
    })
  }
  
  async function givesyrup() {
    await axios(`${process.env.REACT_APP_BASE_URL}/api/community/give/syrup`, {
      method: 'post',
      headers: {
        Authorization: `bearer ${getCookie('token')}`
      },
      data: {
        id,
        syrup 
      }
    }).then((res) => {
      if (res.data.success) {
        alert('Syrup was supplied normally.')
      }
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
      setUser(err.response.data)
    })
  }

  async function getPost() {
    const res = await axios(`${process.env.REACT_APP_BASE_URL}/api/community/get/post?id=${id}`, {
      method: 'GET'
    })

    if (res.data.post.category.type !== "Review") {
      window.location.href = '/'
      alert('알맞지 않는 페이지로 들어와서 메인페이지로 이동 합니다.')
    }
    
    setLike(res.data.post.like_childrens)
    setPost(res.data)
  }

  useEffect(() => {
    getUser();
    getPost();
  }, [])

  if (!data || (!getCookie('token') && !user)) return <></>
  else {
    return (
      <div>
        <div className="SectionList">
          <section className="ContentBox">
            <div className="inner">
              <div className="ReviewSeeMoreContentBox">
                <div className="ReviewSeeMoreContentBox_head">
                  <div className="ReviewSeeMoreContentBox_title">
                    [{data.post.score}점] {data.post.title}
                    <div>
                        <a href={`/ReviewForm/${id}`}>Edit </a>
                        <a onClick={deleteSubmit} href="#">| Delete</a>
                      </div>
                  </div>
                  <div className="SeeMore_profileBox">
                      <div className="SeeMore_profileBox_imgBox">
                        <img className="SeeMore_profileBox_img" src={`${process.env.REACT_APP_BASE_URL}/api/file/get/profile?uuid=${data.post.author}`} />
                      </div>
                      <p className="SeeMore_profileBox_username">{data.post.nickname}</p>
                    </div>
                  <div className="ReviewSeeMoreContentBox_date">
                    {moment(data.post.createdAt).format('YYYY-MM-DD HH:mm')}
                    
            <div className="review_contentItem_bottom_item" onClick={reportSubmit}><i class="fa-regular fa-flag"></i></div>
                  </div>
                </div>

                <div className="ReviewSeeMoreContentBox_Mainbox" dangerouslySetInnerHTML={{ __html: data.post.content }}></div>

                <div className="review-hashtag">
                  {data.post.hashtag ? 
                    Object.values(getHashTag(data.post.hashtag).map((value, index) => (
                      <div className="hashtag-item" key={index}>{value}</div>
                    )))
                  :
                    <></>
                  }
                  </div>
                <div className="ReviewSeeMoreContentBox_bottomBox">
                <div className="review_contentItem_bottom_left">
                <div className="review_contentItem_bottom_item"><i class={`${user && like_childrens.includes(user.uuid) ? "Like_Active" : ""} fa-regular fa-heart`} onClick={likeSubmit}></i> {data.post.like}</div>
                <div className="review_contentItem_bottom_item"><i class="fa-regular fa-comment"></i> {data.post.comment} </div>
                <div className="review_contentItem_bottom_item" onClick={shareSubmit}><i class="fa-regular fa-share-from-square"></i> {data.post.share}</div>
              <div className="review_contentItem_bottom_item" onClick={saveSubmit}><i class="fa-regular fa-floppy-disk"></i> {data.post.save}</div>
            </div>
            <div className="review_contentItem_bottom_right">
            <div className="review_contentItem_bottom_item">view {data.post.views} <span> | Syrup received : {data.post.syrup}ml</span></div>
            </div>
                </div>
              </div>

            
            </div>

            <div className="inner">
                <div className="commentBox">
                  <label className="form-namelLabel" htmlFor="reviewContent">
                    <div className="form-dot"></div> &nbsp;&nbsp; Comment
                  </label>

                  <div className="commentBox-head">
                    <input type="text" name="comment" id="comment" className="comment-input" placeholder="write comment" onChange={(e) => setComment(e.target.value)} />
                    <button className="comment-button" onClick={commentSubmit}><i class="fa-solid fa-paper-plane"></i></button>
                  </div>
                    {Object.values(data.comments).map((value, index) => (
                      <div className="commentBox-item" key={index}>
                        <div className="commentBox-item-head">
                          <div className="commentBox-item-username">
                            {xss(value.author.nickname)}님
                          </div>
                          <div className="commentBox-item-dateTime">
                            {moment(value.createdAt).format('YYYY-MM-DD HH-mm')}
                          </div>
                        </div>
                        <div className="commentBox-item-body">
                          <div className="commentBox-item-content">
                            <TextComment text={xss(value.comment)} />
                            <button class="btn btn-danger" onClick={() => commentDeleteSubmit(value.id)}>delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <button className="giveSilupButton" data-bs-toggle="modal" data-bs-target="#exampleModal">Pour Syrup</button>
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: '20%' }}>
                <div class="modal-dialog">
                  <div class="modal-content" style={{ padding: '24px' }}>
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Pour Syrup</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" style={{ padding: 0, width: 'calc(100% - 26px)' }}>
                      <input type="number" min="1" class="form-control" placeholder="ml" id="giveSyrupInput" onChange={(e) => setSyrup(e.target.value)} />
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancle</button>
                      <button type="button" class="btn btn-primary" style={{ backgroundColor: '#ffbc15', border: '1px solid #ffbc15' }} onClick={givesyrup}>Pour Syrup</button>
                    </div>
                  </div>
                </div>
              </div>
          </section>
        </div>
      </div>
    );
  }
}
