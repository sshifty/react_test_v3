import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArtworkList from "./Components/ArtworkComponents/ArtworkList";
import SingleArtwork from "./Components/ArtworkComponents/SingleArtwork";
import FavouriteArtwork from "./Components/ArtworkComponents/FavouriteArtwork";
import styles from './App.module.css';
const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<ArtworkList />}/>
          <Route path="/:artworkID" element={<SingleArtwork />}/>
          <Route path="/favourites" element={<FavouriteArtwork />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
};

export default App;
