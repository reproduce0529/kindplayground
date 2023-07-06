function Footer() {
  function gototop(){
    window.scrollTo({
      top : 0,
      behavior : 'smooth'
    })
  }

  return (
    <div>
      <footer className="footer">
        <div className="inner">
          <div className="footer_top">
            <div className="footer_logo_img_box">
              <img src="/src/logo.png" className="footer_logo_img"></img>
            </div>

            <div className="footer_top_box1">
              <div className="footer_top_box1_title">Company</div>
              <div className="footer_top_box1_text">neez.n Corp <br />
#1404, 14F CKL Business Center <br /> 40, Cheonggyecheon-ro, Jung-gu <br /> Seoul, Republic of Korea
04521</div>
            </div>

            <div className="footer_top_box1">
              <div className="footer_top_box1_title">Contact</div>
              <div className="footer_top_box1_text">CEO: Oh Jaehwan</div>
              <div className="footer_top_box1_text">E-mail: teamkind@neezn.com</div>
            </div>

            <div className="GotoTopButton" onClick={gototop}>
              <img className="GotoTopButton_img" src="/src/top.svg"></img>
            </div>
          </div>
          <div className="footer_body">
            <p className="Copyright">
            © 2023 neezncorp. All rights reserved.
            </p>

            <div className="footer_linkbox">
            <a href="#" className="footer_link"></a>
            <a href="#" className="footer_link"></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
  
export default Footer;
