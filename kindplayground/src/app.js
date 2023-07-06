import Header from './inc/Header';
import Footer from './inc/Footer';
import Home from './page/Home';
import Community from './page/Community';
import CommunityForm from './page/CommunityForm';
import CommunitySeemore from './page/CommunitySeemore';
import Review from './page/Review';
import SignUp from './page/SignUp'
import SignIn from './page/SignIn'
import Mypage from './page/Mypage'
import AdminMain from './admin/AdminMain';
import AdminKeyword from './admin/AdminKeyword';
import AdminImg from './admin/AdminImg';
import ReviewForm  from './page/ReviewForm';
import ReviewSeeMore from './page/ReviewSeeMore'
import UserModify from './page/UserModify'
import CommunityEditForm from './page/CommunityEdit';
import ReviewEditForm from './page/ReviewEdit';
import LogOut from './page/LogOut';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { getCookie, setCookie } from './util/cookies';
import CommunitySearch from './page/CommunitySearch';

const App = () => {
  useEffect(() => {
    if (!getCookie('token')) {
      setCookie('token', 'true', { path: '/' })
    }
  }, [])

  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <div className='margin-top-80'></div>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Review" element={<Review />}></Route>
          <Route path="/SignIn" element={<SignIn />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/UserModify" element={<UserModify />}></Route>
          <Route path="/Mypage" element={<Mypage />} />
          <Route path="/Review/:id" element={<ReviewSeeMore />}></Route>
          <Route path="/ReviewForm" element={<ReviewForm />}></Route>
          <Route path="/ReviewForm/:id" element={<ReviewEditForm />}></Route>
          <Route path="/Community" element={<Community />}></Route>
          <Route path="/Community/search/:search" element={<CommunitySearch />}></Route>
          <Route path="/CommunityForm" element={<CommunityForm />}></Route>
          <Route path='/CommunityForm/:id' element={<CommunityEditForm />}></Route>
          <Route path="/Community/:id" element={<CommunitySeemore />}></Route>
          <Route path="/AdminMain" element={<AdminMain />}></Route>
          <Route path="/AdminImg" element={<AdminImg />}></Route>
          <Route path="/AdminKeyword" element={<AdminKeyword />}></Route>
          <Route path='/logOut' element={<LogOut />}></Route>
          <Route path='*' element={<h1 style={{ textAlign: 'center' }}>Not Found</h1>}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App