import PopPost from '../com/PopPost';
import PopReview from '../com/PopReview';
import GoogleAd from '../inc/GoogleAd';

import useSWR from 'swr'
import axios from 'axios';

async function fetcher(url) {
  const res = await axios(url, {
    method: 'GET'
  })

  return {
    data: res.data,
    status: res.status
  }
}

function Main() {
  const { data, error, isLoading } = useSWR(process.env.REACT_APP_BASE_URL + '/api/file/get/banners', fetcher)

  if (error || isLoading || !data) {
    return (
      <div>
        <GoogleAd />
        <div className="SectionList">
          <section className="section" id="main-section01">
            <div className="inner">
              <div className="visual_board">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-indicators">
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active" style={{ width: "100%", height: '100%', background: '#ddd' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <PopPost />
          <PopReview />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <GoogleAd />
        <div className="SectionList">
          <section className="section" id="main-section01">
            <div className="inner">
              <div className="visual_board">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-indicators">
                    {Object.values(data.data.banners).map((value, index) => (
                      <button type='button' data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? "active" : ''} aria-current="true" aria-label={'Slide ' + index + 1}></button>
                    ))}
                  </div>
                  <div className="carousel-inner">
                    {Object.values(data.data.banners).map((value, index) => (
                      <a href={value.url} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img src={process.env.REACT_APP_BASE_URL + "/api/file/get/banner?uuid=" + value.uuid} className="d-block w-100" alt="..." />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <PopPost />
          <PopReview />
        </div>
      </div>
    );
  }

}

export default Main;
