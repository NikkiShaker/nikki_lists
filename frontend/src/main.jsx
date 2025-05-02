import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/index.css';
import Home from './pages/Home.jsx'
import CreateList from "./pages/CreateList.jsx"
import NoPage from "./pages/NoPage.jsx"
import List from "./pages/List.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateList />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/list/:listTitle" element={<List />} />

      </Routes>
    </BrowserRouter>
    {/* <Home /> */}
  </StrictMode>,
)
