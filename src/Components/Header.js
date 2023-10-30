import logo from '../images/logo.png';

const Header = () => {
  return (
    <div className='header'>
      <a href='./index.html'>
        <img className='logo' src={logo} alt='로고 이미지' />
      </a>

      <div className='menu'>
        <div className='gnb'>로그아웃</div>

        <ul className='lnb'>
          <li>내 스탬프북</li>
          <li>부기 도감</li>
          <li>스탬프북 만들기</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
