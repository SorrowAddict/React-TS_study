// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// 리액트 앱의 모든 컴포넌트들이 페이지 라우팅과 관련된 모든 데이터들을 공급받아서 사용
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App /> 
  </BrowserRouter>
)
  