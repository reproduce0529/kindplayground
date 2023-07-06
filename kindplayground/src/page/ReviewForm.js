import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../util/cookies";
import { Editor } from "@tinymce/tinymce-react";

function ReviewForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('K-Star');
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [score, setScore] = useState('');

  function onChange(e) {
    setContent(e.target.getContent())
  }

  async function onSubmit(e) {
    e.preventDefault();
    await axios(`${process.env.REACT_APP_BASE_URL}/api/community/post/insert`, {
      method: 'post',
      headers: {
        Authorization: `bearer ${getCookie('token')}`
      },
      data: {
        type: 'Review',
        hashtags,
        title, 
        content, 
        category, 
        score
      }
    }).then((res) => {
      window.location.href = '/Review'
    }).catch((err) => {
      alert(err.response.data.message)
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
              <h2>Review</h2>
              <div className="review-inner">
                <div className="form-inputGroup">
                  <label className="form-namelLabel" htmlFor="reviewTitle">
                    <div className="form-dot"></div> &nbsp;&nbsp; Title
                  </label>
                  <input
                    autoComplete="false"
                    type="text"
                    id="reviewTitle"
                    name="reviewTitle"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-inputGroup">
                  <label className="form-namelLabel" htmlFor="CommBrackets">
                    <div className="form-dot"></div> &nbsp;&nbsp; Brackets
                  </label>
                  <select id="CommBrackets"
                    name="CommBrackets"
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Title">

                      <option value="K-Star" selected>K-Star</option>
                      <option value="K-Contents" >K-Content</option>

                    </select>
                </div>

                <div className="form-inputGroup">
                  <label className="form-namelLabel" htmlFor="reviewContent">
                    <div className="form-dot"></div> &nbsp;&nbsp; Content
                  </label>

                  <Editor
                    apiKey="y7gnmtbsaxnjbgh3405ioqbdm24eit5f0ovek49w8yvq5r9q"
                    initialValue=""
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
              <label className="form-namelLabel" htmlFor="score">
                    <div className="form-dot"></div> &nbsp;&nbsp; Score
                  </label>
                  <input title=" Score must be 100 or less" type="number" name="score" id="score" max={100} onChange={(e) => setScore(e.target.value)} />
              </div>

              <div className="form-inputGroup">
              <label className="form-namelLabel" htmlFor="hashtag">
                    <div className="form-dot"></div> &nbsp;&nbsp; Hashtag (Detach using the space bar)
                  </label>
                  <input  type="text" name="hashtag" id="hashtag" onChange={(e) => setHashtags(e.target.value)} />
              </div>

                <button className="form-button" type="submit">SUBMIT</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ReviewForm;
