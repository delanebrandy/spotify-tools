import './App.css';
import Spot from './Spot';
import Main from './pages/main';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<main />} />
        <Route path="/app" element={<Main />} />
      </Routes>
      <Spot />
    </div>
  );
}

export default App;
