import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Editor } from "@tinymce/tinymce-react";
import {getCookie} from '../util/cookies'
import { useParams } from "react-router-dom";
function CommunityEditForm() {
  const { id } = useParams();

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/api/community/get/post?id=${id}`, {
      method: 'get',
      headers: {
        Authorization: `bearer ${getCookie('token')}`
      }
    }).then((res) => {
      setTitle(res.data.post.title);
      setContent(res.data.post.content);
      setCategory(res.data.post.category);
      setHashtags(res.data.post.hashtag);
    }).catch((err) => {
      window.location.href = '/Review'
    });
  }, []);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('TIPS');
  const [content, setContent] = useState('');
  const [hashtag, setHashtags] = useState('');

  function onChange(e) {
    setContent(e.target.getContent())
  }

  async function onSubmit(e) {
    e.preventDefault();
    await axios(`${process.env.REACT_APP_BASE_URL}/api/community/post/update`, {
      method: 'post',
      headers: {
        Authorization: `bearer ${getCookie('token')}`
      },
      data: {
        id,
        type: 'Normal',
        hashtag,
        title, 
        content, 
        category, 
      }
    }).then((res) => {
      window.location.href = '/Community'
    }).catch(err => {
      alert(err.response.data.message);
    })
  }

  return (
    <div>
      <div className="SectionList">
        <section className="ContentBox">
          <div className="inner">
            <form
              onSubmit={onSubmit}
              className="review-form"
              id="SignUpForm"
              autoComplete="false"
              method="post"
            >
              <h2>Community</h2>
              <div className="review-inner">
                <div className="form-inputGroup">
                  <label className="form-namelLabel" htmlFor="CommTitle">
                    <div className="form-dot"></div> &nbsp;&nbsp; Title
                  </label>
                  <input
                    autoComplete="false"
                    type="text"
                    id="CommTitle"
                    name="CommTitle"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-inputGroup">
                  <label className="form-namelLabel" htmlFor="CommBrackets">
                    <div className="form-dot"></div> &nbsp;&nbsp; Brackets
                  </label>
                  <select 
                    id="CommBrackets"
                    name="CommBrackets"
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Title"
                    value={category}  
                  >
                    
                    <option value="TIPS" selected>TIPS</option>
                    <option value="Q&A" >Q&A</option>
                    <option value="Free talk" >Free talk</option>

                  </select>
                </div>

                <div className="form-inputGroup">
                  <label className="form-namelLabel" htmlFor="reviewContent">
                    <div className="form-dot"></div> &nbsp;&nbsp; Content
                  </label>

                  <Editor
                    apiKey="y7gnmtbsaxnjbgh3405ioqbdm24eit5f0ovek49w8yvq5r9q"
                    initialValue={content}
                    init={{
                      branding: false,
                      height: 400,
                      menubar: true,
                      plugins:
                        "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
                      toolbar:
                        "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                      image_advtab: true,
                    }}
                    onChange={onChange}
                  />
                </div>

            
                  <div className="form-inputGroup">
                  <label className="form-namelLabel" htmlFor="hashtag">
                    <div className="form-dot"></div> &nbsp;&nbsp; Hashtag (Detach using the space bar)
                  </label>
                  <input  type="text" name="hashtag" id="hashtag" value={hashtag} onChange={(e) => setHashtags(e.target.value)}/>
                </div>
                <button className="form-button">SUBMIT</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CommunityEditForm;
