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
import boogi from './boogi';

export const AppContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isStamped, setIsStamped] = useState(false);

  const getIsStamped = (stampbookid) => {
    boogi
      .get(
        `/boogimon/stampbook/stamp.jsp?command=list&stampbookId=${stampbookid}&userId=${window.sessionStorage.getItem(
          'userId'
        )}`
      )
      .then((response) => {
        console.log(response.data.stampList);
      });
  };

  useEffect((stampbookid) => {
    if (window.sessionStorage.getItem('userId')) {
      setIsLogin(true);
      getIsStamped(0);
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
          <Route path='/stampDetail' element={<StampDetail />} />
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
