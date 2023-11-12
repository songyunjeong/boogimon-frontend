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
import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem('userId')) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className='App'>
      <AppContext.Provider value={{ isLogin, setIsLogin }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/my' element={<My />} />
          <Route path='/boogiBook' element={<BoogiBook />} />
          <Route path='/makeStampBook' element={<MakeStampBook />} />
          <Route path='/stampDetail/:id' element={<StampDetail />} />
          <Route path='/join' element={<Join />} />
          <Route path='/login' element={<Login />} />
          <Route path='/findPassword' element={<FindPassword />} />
          <Route path='/editUserInfo' element={<EditUserInfo />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
