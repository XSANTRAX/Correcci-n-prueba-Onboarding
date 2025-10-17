import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './componets/register-index/register.tsx';
import Login from './componets/login-index/login.tsx';
import Survey from './componets/survey-index/survey.tsx';

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Survey />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </BrowserRouter> //
  );//
}

export default App; 

