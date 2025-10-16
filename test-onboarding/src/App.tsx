import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './componets/register-index/register.tsx';

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter> //
  );//
}

export default App; 

