import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './componets/register-index/register.tsx';
import Login from './componets/login-index/login.tsx';
import Survey from './componets/survey-index/survey.tsx';
import Validación from './componets/validacion-index/validacion.tsx';
import InfoSurvey from './componets/info-index/info.tsx';

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/validacion" element={<Validación />} />
        <Route path="/info-survey" element={<InfoSurvey />} />
      </Routes>
    </BrowserRouter> //
  );//
}

export default App; 

