import { Route, Routes } from 'react-router-dom';
import StampDetail from './Pages/StampDetail';
import Join from './Pages/Join';
import Login from './Pages/Login';
import FindPassword from './Pages/FindPassword';
import EditUserInfo from './Pages/EditUserInfo';
import MakeStampBook from './Pages/MakeStampBook';
import BoogiBook from './Pages/BoogiBook';
import Home from './Pages/Home';
import My from './Pages/My';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/my' element={<My />} />
        <Route path='/boogiBook' element={<BoogiBook />} />
        <Route path='/makeStampBook' element={<MakeStampBook />} />
        <Route path='/stampDetail' element={<StampDetail />} />
        <Route path='/join' element={<Join />} />
        <Route path='/login' element={<Login />} />
        <Route path='/findPassword' element={<FindPassword />} />
        <Route path='/editUserInfo' element={<EditUserInfo />} />
      </Routes>
    </div>
  );
}

export default App;
