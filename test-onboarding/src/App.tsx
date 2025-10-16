import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './componets/register-index/register.tsx';
import Login from './componets/login-index/login.tsx';

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter> //
  );//
}

export default App; 

