import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";

function CommunitySearch() {
  const { search } = useParams()
  const [searchId, setSearchId] = useState('')
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0);
  const [currentpage, setCurrentpage] = useState(1);

  async function getElements(path) {
    await axios(path, { method: 'get' })
    .then((res) => {
      setItems(res.data.posts)
      setTotal(res.data.post_cnt)
    })
  }

  const setPage = (e) => {
    setCurrentpage(e);
  };

  useEffect(() => {
    getElements(`${process.env.REACT_APP_BASE_URL}/api/community/search/post?offset=${currentpage}&limit=10&type=Normal&search=${search}`)
  }, [currentpage])

  return (
    <div>
      <div className="SectionList">
        <section className="ContentBox" id="Community">
          <div className="inner">          
            <div className="Community_List">
              <a href="./CommunityForm" className="review_pop_head_menuItem">
                <i class="fa-solid fa-pencil"></i> 
                &nbsp;&nbsp;Write new
              </a>
              {items.length > 0 ? 
                <>
                  <div className="Community_List_head">
                    <div className="Community_List_item_textHead">Brackets</div>
                    <div className="Community_List_item_title">Title</div>
                    <div className="Community_List_item_d">Comments</div>
                    <div className="Community_List_item_d">Poster</div>
                    <div className="Community_List_item_d">Views</div>
                    <div className="Community_List_item_dateTime">Date</div>
                  </div>
                  {Object.values(items).map((value, index) => (
                    <a href={`/Community/${value.id}`} className="Community_List_item" key={index}>
                      <div className="Community_List_item_textHead">{value.category}</div>
                      <div className="Community_List_item_title">{value.title}</div>
                      <div className="Community_List_item_d">{value.comment}</div>
                      <div className="Community_List_item_d">{value.author.nickname}</div>
                      <div className="Community_List_item_d">{value.views}</div>
                      <div className="Community_List_item_dateTime">{moment(value.createdAt).format('YYYY-MM-DD hh:mm:ss')}</div>
                    </a>
                  ))}              
                </>
              :
                <h1 style={{ textAlign: 'center' }}>게시물이 없습니다.</h1>
              }
            </div>
            <div className="list_under_input">
              
            <form action={"/Community/search/" + searchId}>
              <input id="search" autoComplete="false" onChange={(e) => setSearchId(e.target.value)} />
              <button type="submit" id="PrimaryButton">search</button>
            </form>
            </div>
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
        </section>
      </div>
    </div>
  );
}

export default CommunitySearch;
