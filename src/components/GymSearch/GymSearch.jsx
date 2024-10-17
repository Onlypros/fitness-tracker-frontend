import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import './GymSearch.module.css';

const libraries = ["places"]; 

export default function GymSearch() {
  const [gyms, setGyms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, 
    libraries,
  });

  const handleSearch = async () => {
    if (!searchTerm) return;

    if (isSearchActive) {
      setGyms([]); 
      setIsSearchActive(false); 
      return;
    }

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));

    const request = {
      query: searchTerm + ' gym',
      fields: ['name', 'formatted_address', 'geometry', 'rating'],
    };

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setGyms(results);
        setIsSearchActive(true);
      }
    });
  };

  if (loadError) return <p>Error loading Google Places</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="gym-search-container">
      <h2>Search for Gyms</h2>
      <input
        id ="gymsearch"
        name ="gymsearch"
        type="text"
        placeholder="Enter location(City, State, or Zip)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>
      {isSearchActive ? "Clear Search" : "Search"}
        </button>

      <ul>
        {gyms.map((gym, index) => (
          <li key={index}>
            <h3>{gym.name}</h3>
            <p>{gym.formatted_address}</p>
            <p>Rating: {gym.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}