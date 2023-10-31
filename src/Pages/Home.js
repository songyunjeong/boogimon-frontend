import StampBook from '../Components/StampBook';
import Header from '../Components/Header';
import '../styles/main.css';

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
          <StampBook title={'스탬프북1'} like={'30'} />
          <StampBook title={'스탬프북2'} like={'22'} />
          <StampBook title={'스탬프북3'} like={'20'} />
          <StampBook title={'스탬프북4'} like={'13'} />
          <StampBook title={'스탬프북5'} like={'5'} />
        </section>
      </div>
    </div>
  );
};

export default Home;
