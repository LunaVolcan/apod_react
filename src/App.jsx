import React, { useState } from 'react';
import NasaPhoto from './NasaPhoto';
import galaxy from './assets/green_galaxy.png';
// import './App.css';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [showReset, setShowReset] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const apiKey = 'le5Gjgtiv0mihum0Nt8ie9rpXz733mwNOYBH0cYN';
  const apiUrl = 'https://api.nasa.gov/planetary/apod';

  const fetchPhotos = async () => {
    setShowPhotos(true); 
    const dates = getDates();
    try {
      const photoData = await Promise.all(
        dates.map(date =>
          fetch(`${apiUrl}?api_key=${apiKey}&date=${date}`).then(res => res.json())
        )
      );
      setPhotos(photoData);
      setShowReset(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDates = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const dayBeforeYes = new Date(today);
    dayBeforeYes.setDate(today.getDate() - 2);
    const formatDate = (date) => date.toISOString().split('T')[0];
    return [formatDate(today), formatDate(yesterday), formatDate(dayBeforeYes)];
  };

  const resetPage = () => {
    setPhotos([]);
    setShowPhotos(false); 
    setShowReset(false);
  };

  return (
    <div>
      {!showPhotos && (
        <div id="initial-container">
          <h1>NASA Photo of the Day</h1>
          <button onClick={fetchPhotos}>Click here to see the photo!</button>
        </div>
      )}
      {showPhotos && (
        <section id="photos-container">
          {photos.map(photo => (
            <NasaPhoto key={photo.date} data={photo} />
          ))}
        </section>
      )}
      {showReset && <button onClick={resetPage}>RESET</button>}
    </div>
  );
};

export default App;

