import Header from '../Components/Header';
import '../styles/stampDetail.css';
import like from '../images/like.png';
import avatar from '../images/avatar.png';

const StampDetail = () => {
  return (
    <div>
      <Header />

      <div className='wrap'>
        <div className='stamp_detail_title'>스탬프북1</div>

        <div>
          <div className='stamp_box'>
            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222164810529_thumbL'
                  alt='스탬프 이미지1'
                />
              </div>
              <div className='stamp_txt'>흰여울문화마을</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222171209005_thumbL'
                  alt='스탬프 이미지2'
                />
              </div>
              <div className='stamp_txt'>깡깡이 예술마을</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222175627506_thumbL'
                  alt='스탬프 이미지3'
                />
              </div>
              <div className='stamp_txt'>국립해양박물관</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222180829962_thumbL'
                  alt='스탬프 이미지4'
                />
              </div>
              <div className='stamp_txt'>태종대</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222181829937_thumbL'
                  alt='스탬프 이미지5'
                />
              </div>
              <div className='stamp_txt'>죽성성당</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222185645736_thumbL'
                  alt='스탬프 이미지6'
                />
              </div>
              <div className='stamp_txt'>아홉산 숲</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191222190823385_thumbL'
                  alt='스탬프 이미지7'
                />
              </div>
              <div className='stamp_txt'>해동용궁사</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191224093809621_thumbL'
                  alt='스탬프 이미지8'
                />
              </div>
              <div className='stamp_txt'>임랑해수욕장</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191224171115847_thumbL'
                  alt='스탬프 이미지9'
                />
              </div>
              <div className='stamp_txt'>문화공감 수정, 초량1941</div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20230525134753245_thumbL'
                  alt='스탬프 이미지10'
                />
              </div>
              <div className='stamp_txt'>
                영도, 태종대, 자동차극장, 흰여울문화마을, 깡깡이예술마을
              </div>
            </div>

            <div className='stamp'>
              <div className='stamp_img'>
                <img
                  src='https://www.visitbusan.net/uploadImgs/files/cntnts/20191225145805369_thumbL'
                  alt='스탬프 이미지11'
                />
              </div>
              <div className='stamp_txt'>구 백제병원</div>
            </div>
          </div>

          <div className='stamp_map'></div>
        </div>

        <div className='btn_bar'>
          <button>공유</button>
          <button>담기</button>
          <div className='stamp_book_like'>
            <div className='like_btn'>
              <img src={like} alt='좋아요' />
            </div>
            <div>13</div>
          </div>
        </div>

        <section className='comment_area'>
          <div className='title'>댓글</div>

          <div className='comment_input'>
            <input type='text' placeholder='공백 불가, 최대 250자 작성 가능' />
            <button>등록</button>
          </div>

          <div className='comment_list'>
            <div className='comment'>
              <div className='profile'>
                <img src={avatar} alt='' />
              </div>
              <div className='contents'>
                <div className='comment_id'>부기몬 마스터</div>
                <div className='comment_txt'>스탬프북 완성했다</div>
              </div>
              <div className='comment_write_date'>2023-10-26 16:57:50</div>
            </div>
            <div className='comment'>
              <div className='profile'>
                <img src={avatar} alt='' />
              </div>
              <div className='contents'>
                <div className='comment_id'>부기부기</div>
                <div className='comment_txt'>여행 좋아</div>
              </div>
              <div className='comment_write_date'>2023-11-12 13:24:20</div>
            </div>
            <div className='comment'>
              <div className='profile'>
                <img src={avatar} alt='' />
              </div>
              <div className='contents'>
                <div className='comment_id'>부기 좋아</div>
                <div className='comment_txt'>놀러가야지</div>
              </div>
              <div className='comment_write_date'>2023-08-29 10:20:34</div>
            </div>
          </div>

          <div className='more_comment'>
            <button>더보기</button>
          </div>
        </section>

        <div className='create_user_comment'>
          <div className='title'>스탬프북 작성자</div>

          <div className='comment'>
            <div className='profile'>
              <img src={avatar} alt='' />
            </div>
            <div className='contents'>
              <div className='comment_id'>부기몬 크리에이터</div>
              <div className='comment_txt'>
                이 스탬프북을 다 모으신다면 당신은 진정한 부기몬 마스터가
                된답니다
              </div>
            </div>
            <div className='comment_write_date'>2023-10-27 11:13:12</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StampDetail;
