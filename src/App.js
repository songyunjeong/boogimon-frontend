import { Route, Routes } from 'react-router-dom';
import StampDetail from './Pages/StampDetail';
import MakeStampBook from './Pages/MakeStampBook';
import BoogiBook from './Pages/BoogiBook';
import Home from './Pages/Home';
import My from './Pages/My';
import EditUserInfo from './Pages/EditUserInfo';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/my' element={<My />} />
        <Route path='/boogiBook' element={<BoogiBook />} />
        <Route path='/makeStampBook' element={<MakeStampBook />} />
        <Route path='/stampDetail' element={<StampDetail />} />
        <Route path='/editUserInfo' element={<EditUserInfo />} />
      </Routes>
    </div>
  );
}

export default App;
