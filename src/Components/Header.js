import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import styled from 'styled-components';

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
  font-size: var(--small);
  text-align: right;
  padding-bottom: 10px;
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
  return (
    <HeaderBox>
      <Link to='/'>
        <Logo src={logo} alt='로고 이미지' />
      </Link>

      <div className='menu'>
        <GNB>로그아웃</GNB>

        <LNB>
          <StyledLink to='/my'>내 스탬프북</StyledLink>
          <StyledLink to='/boogiBook'>부기 도감</StyledLink>
          <StyledLink to='/makeStampBook'>스탬프북 만들기</StyledLink>
        </LNB>
      </div>
    </HeaderBox>
  );
};

export default Header;
