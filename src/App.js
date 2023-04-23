import './App.css';
import Main from './pages/main';
import Genre from './pages/genre-playlists';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/genre" element={<Genre />} />
      </Routes>
    </div>
  );
}

export default App;
