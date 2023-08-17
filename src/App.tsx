import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BlockchainPage, BlockPage } from './pages'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/block" element={<BlockPage />} />
        <Route path="/blockchain" element={<BlockchainPage />} />
        <Route path="*" element={<Navigate to="/blockchain" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
