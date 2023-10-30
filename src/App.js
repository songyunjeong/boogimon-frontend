import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import StampDetail from './Pages/StampDetail';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/stampDetail' element={<StampDetail />} />
      </Routes>
    </div>
  );
}

export default App;
