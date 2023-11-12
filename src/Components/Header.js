import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import styled from 'styled-components';
import { useContext } from 'react';
import { AppContext } from '../App';

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 120px;
  box-shadow: 1px 1px 5px var(--gray1);
  padding: 0 50px;
  box-sizing: border-box;
`;

const Logo = styled.img`
  width: 200px;
`;

const GNB = styled.div`
  display: inline-block;
  font-size: var(--small);
  padding-bottom: 10px;
  cursor: pointer;
`;

const LNB = styled.div`
  dispaly: flex;
`;

const StyledLink = styled(Link)`
  margin-right: 30px;
  &:last-child {
    margin-right: 0;
  }
`;

const Header = () => {
  const { isLogin, setIsLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    setIsLogin(false);
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <HeaderBox>
      <Link to='/'>
        <Logo src={logo} alt='로고 이미지' />
      </Link>

      {isLogin ? (
        <div className='menu' style={{ textAlign: 'right' }}>
          <GNB onClick={logout}>로그아웃</GNB>

          <LNB>
            <StyledLink to='/my'>내 스탬프북</StyledLink>
            <StyledLink to='/boogiBook'>부기 도감</StyledLink>
            <StyledLink to='/makeStampBook'>스탬프북 만들기</StyledLink>
          </LNB>
        </div>
      ) : (
        <div className='menu'>
          <div className='menu'>
            <LNB>
              <StyledLink to='/login'>로그인</StyledLink>
              <StyledLink to='/join'>회원가입</StyledLink>
            </LNB>
          </div>
        </div>
      )}
    </HeaderBox>
  );
};

export default Header;
