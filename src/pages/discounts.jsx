import React, { useState, useEffect } from "react";

const Discounts = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [localBusinesses, setLocalBusinesses] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
        },
        (error) => console.error("Error getting location", error)
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const dummyBusinesses = [
        {
          id: 1,
          name: "Local Coffee Shop",
          address: "123 Main St",
          lat: 34.1749,
          lon: -118.4194,
          discount: "5% off for 15 kind coins",
        },
        {
          id: 2,
          name: "Healthy Bites Restaurant",
          address: "456 Elm St",
          lat: 34.0849,
          lon: -118.4094,
          discount: "10% off for 25 kind coins",
        },
        {
          id: 3,
          name: "Green Market Grocery",
          address: "789 Oak St",
          lat: 34.3149,
          lon: -118.4294,
          discount: "20% off for 65 kind coins",
        },
      ];

      const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 3959;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (R * c).toFixed(1);
      };

      const businessesWithDiscounts = dummyBusinesses
        .map((business) => {
          const distance = calculateDistance(userLocation.lat, userLocation.lon, business.lat, business.lon);
          return {
            ...business,
            distance: parseFloat(distance),
          };
        })
        .sort((a, b) => a.distance - b.distance);

      setLocalBusinesses(businessesWithDiscounts);
    }
  }, [userLocation]);

  return (
    <div className="discounts-container">
      <h1>Available Discounts</h1>
      <div className="business-list" style={{ maxHeight: "400px", overflowY: "auto" }}>
        {localBusinesses.length > 0 ? (
          localBusinesses.map((business) => (
            <div key={business.id} className="business-card">
              <h2>{business.name}</h2>
              <p><strong>Location:</strong> {business.address}</p>
              <p><strong>Distance:</strong> {business.distance} miles away</p>
              <p><strong>Discount:</strong> {business.discount}</p>
            </div>
          ))
        ) : (
          <p>Loading local businesses...</p>
        )}
      </div>
    </div>
  );
};

export default Discounts;
