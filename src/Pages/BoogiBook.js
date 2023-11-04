import styled from 'styled-components';
import Header from '../Components/Header';
import Stamp from '../Components/Stamp';

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1280px;
  background-color: var(--gray1);
  border-radius: 12px;
  padding: 60px 0 20px 75px;
  box-sizing: border-box;
  margin: 50px auto;
  > div:nth-child(6n) {
    margin-right: 0px;
  }
`;

const BoogiBook = () => {
  const stampList = [
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222164810529_thumbL',
      title: '흰여울문화마을',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222171209005_thumbL',
      title: '깡깡이 예술마을',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222175627506_thumbL',
      title: '국립해양박물관',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222180829962_thumbL',
      title: '태종대',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222181829937_thumbL',
      title: '죽성성당',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222185645736_thumbL',
      title: '아홉산 숲',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222190823385_thumbL',
      title: '해동용궁사',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191224093809621_thumbL',
      title: '임랑해수욕장',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191224171115847_thumbL',
      title: '문화공감 수정, 초량1941',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20230525134753245_thumbL',
      title: '영도, 태종대, 자동차극장, 흰여울문화마을, 깡깡이예술마을',
    },
    {
      imgSrc:
        'https://www.visitbusan.net/uploadImgs/files/cntnts/20191225145805369_thumbL',
      title: '구 백제병원',
    },
  ];

  return (
    <div>
      <Header />

      <Wrap>
        {stampList.map((stamp, i) => {
          return (
            <Stamp
              imgSrc={stamp.imgSrc}
              imgAlt={stamp.title + ' 이미지'}
              title={stamp.title}
              key={i}
            />
          );
        })}
      </Wrap>
    </div>
  );
};

export default BoogiBook;
