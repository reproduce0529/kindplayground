import axios from "axios";
import { useEffect, useState } from "react";

function PopReview() {
  const [category, setCategory] = useState('weekBest');
  const [order1, setOrder1] = useState({});
  const [order2, setOrder2] = useState({});

  useEffect(() => {
    setCategory('weekBest');
  }, [])

  async function fetcher(path) {
    const res = await axios(path, {
      method: 'get'
    })
    console.log(res.data.order1) 
    setOrder1(res.data.order1)
    setOrder2(res.data.order2)
  }

  useEffect(() => {
    fetcher(`${process.env.REACT_APP_BASE_URL}/api/community/get/top10?type=Review&category=${category}`)
  }, [category])

    return (
      <div>
       <section className="mainpage_pop">
        <div className="inner">
          <div className="mainpage_pop_head">
            <div className="mainpage_pop_head_inner">
              <p className="section-title">WEEKLY TOP REVIEW</p>
              <div className="mainpage_pop_head_menuBox">
              <p onClick={() => { setCategory('weekBest') }} className={`mainpage_pop_head_menuItem ${category === "weekBest" ? "active" : ""}`}>Weekly Best</p>
                <p onClick={() => { setCategory('syrup') }} className={`mainpage_pop_head_menuItem ${category === "syrup" ? "active" : ""}`}>Syrups</p>
                <p onClick={() => { setCategory('comment') }} className={`mainpage_pop_head_menuItem ${category === "comment" ? "active" : ""}`}>Comments</p>
                <p onClick={() => { setCategory('like') }} className={`mainpage_pop_head_menuItem ${category === "like" ? "active" : ""}`}>Likes</p>
                <p onClick={() => { setCategory('save') }} className={`mainpage_pop_head_menuItem ${category === "save" ? "active" : ""}`}>Saves</p>
                <p onClick={() => { setCategory('share') }} className={`mainpage_pop_head_menuItem ${category === "share" ? "active" : ""}`}>Shares</p>
              </div>
            </div>
          </div>
          <div className="mainpage_popList mainpage_popList_ac" id="popPost-best">
            <div className="mainpage_popList_inner">
              <div className="mainpage_popList_left">
                {order1 ? 
                  Object.values(order1).map((value, index) => (
                    <a href={`/Review/${value.id}`} className="mainpage_popList_item">
                      <p className="mainpage_popList_Num">{index+1}</p>
                      <div className="mainpage_popList_title">{value.title}</div>
                      <div className="mainpage_popList_ComCount">{value.comment > 0 ? `[${value.comment}+]` : ""}</div>
                    </a>
                  ))
                :
                  <></>
                }
              </div>
              <div className="mainpage_popList_right">
                {order2 ? 
                  Object.values(order2).map((value, index) => (
                    <a href={`/Review/${value.id}`} className="mainpage_popList_item">
                      <p className="mainpage_popList_Num">{index+6}</p>
                      <div className="mainpage_popList_title">{value.title}</div>
                      <div className="mainpage_popList_ComCount">{value.comment > 0 ? `[${value.comment}+]` : ""}</div>
                    </a>
                  ))
                :
                  <></>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    );
  }
  
  export default PopReview;
  
