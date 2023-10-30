import Header from '../Components/Header';
import '../styles/main.css';
import like from '../images/like.png';

const Home = () => {
  return (
    <div>
      <Header />

      <div className='wrap'>
        <select className='sort'>
          <option>인기순</option>
          <option>최신순</option>
          <option>가나다순</option>
        </select>

        <section className='stamp_book'>
          <div>
            <div className='stamp_book_img'></div>
            <div className='stamp_book_txt'>
              <div className='stamp_book_title'>스탬프북1</div>
              <div className='stamp_book_like'>
                <div className='like_btn'>
                  <img src={like} alt='좋아요' />
                </div>
                <div>30</div>
              </div>
              <div className='stamp_book_btn'>
                <button className='pick_btn'>담기</button>
                <button className='delete_btn'>삭제</button>
              </div>
            </div>
          </div>
          <div>
            <div className='stamp_book_img'></div>
            <div className='stamp_book_txt'>
              <div className='stamp_book_title'>스탬프북2</div>
              <div className='stamp_book_like'>
                <div className='like_btn'>
                  <img src={like} alt='좋아요' />
                </div>
                <div>22</div>
              </div>
              <div className='stamp_book_btn'>
                <button className='pick_btn'>담기</button>
                <button className='delete_btn'>삭제</button>
              </div>
            </div>
          </div>
          <div>
            <div className='stamp_book_img'></div>
            <div className='stamp_book_txt'>
              <div className='stamp_book_title'>스탬프북3</div>
              <div className='stamp_book_like'>
                <div className='like_btn'>
                  <img src={like} alt='좋아요' />
                </div>
                <div>20</div>
              </div>
              <div className='stamp_book_btn'>
                <button className='pick_btn'>담기</button>
                <button className='delete_btn'>삭제</button>
              </div>
            </div>
          </div>
          <div>
            <div className='stamp_book_img'></div>
            <div className='stamp_book_txt'>
              <div className='stamp_book_title'>스탬프북4</div>
              <div className='stamp_book_like'>
                <div className='like_btn'>
                  <img src={like} alt='좋아요' />
                </div>
                <div>13</div>
              </div>
              <div className='stamp_book_btn'>
                <button className='pick_btn'>담기</button>
                <button className='delete_btn'>삭제</button>
              </div>
            </div>
          </div>
          <div>
            <div className='stamp_book_img'></div>
            <div className='stamp_book_txt'>
              <div className='stamp_book_title'>스탬프북5</div>
              <div className='stamp_book_like'>
                <div className='like_btn'>
                  <img src={like} alt='좋아요' />
                </div>
                <div>5</div>
              </div>
              <div className='stamp_book_btn'>
                <button className='pick_btn'>담기</button>
                <button className='delete_btn'>삭제</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer></footer>
    </div>
  );
};

export default Home;
