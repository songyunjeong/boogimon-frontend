import { Route, Routes } from 'react-router-dom';
import StampDetail from './Pages/StampDetail';
import MakeStampBook from './Pages/MakeStampBook';
import BoogiBook from './Pages/BoogiBook';
import My from './Pages/My';
import Home from './Pages/Home';
import TestPage from './Pages/Test';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/my' element={<My />} />
        <Route path='/boogiBook' element={<BoogiBook />} />
        <Route path='/makeStampBook' element={<MakeStampBook />} />
        <Route path='/stampDetail' element={<StampDetail />} />
        <Route path='/test' element={<TestPage />} />
      </Routes>
    </div>
  );
}

export default App;
