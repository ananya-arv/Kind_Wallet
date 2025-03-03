
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 3959; 
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

const Dashboard = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [recommendedTasks, setRecommendedTasks] = useState([]);
  const [kindCoins, setKindCoins] = useState(0);
  const [signedUpTasks, setSignedUpTasks] = useState(new Set());
  const navigate = useNavigate();

  const tasks = [
    { id: 1, title: "Beach Trash Cleanup  ", time: "10:00 AM", lat: 34.225, lon: -119.3123, coins: 10, organization: "Team SEAS" },
    { id: 2, title: "Park Tree Planting", time: "11:30 AM", lat: 34.0730, lon: -118.4497, coins: 15, organization: "Green Earth" },
    { id: 3, title: "Food Bank Assistance", time: "1:00 PM", lat: 33.8781, lon: -119.6298, coins: 20, organization: "Helping Hands" },
    { id: 4, title: "Community Garden", time: "2:00 PM", lat: 34.5074, lon: -119.1278, coins: 25, organization: "Grow Together" },
    { id: 5, title: "School Supply Drive", time: "3:00 PM", lat: 34.8566, lon: -118.3522, coins: 30, organization: "Education First" },
    { id: 6, title: "Animal Shelter Care", time: "4:00 PM", lat: 34.6895, lon: -118.6917, coins: 35, organization: "Paws & Claws" },
    { id: 7, title: "Recycling Awareness", time: "5:00 PM", lat: 33.7306, lon: -119.9352, coins: 40, organization: "Eco Warriors" },
    { id: 8, title: "Homeless Outreach", time: "6:00 PM", lat: 33.9042, lon: -118.8074, coins: 45, organization: "Hope Givers" },
    { id: 9, title: "Elderly Assistance", time: "7:00 PM", lat: 33.5200, lon: -118.4050, coins: 50, organization: "Golden Hearts" },
    { id: 10, title: "Library Book Drive", time: "8:00 PM", lat: 34.0522, lon: -118.2437, coins: 55, organization: "Read & Grow" },
  ];

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
      const tasksWithDistance = tasks
        .map((task) => ({
          ...task,
          distance: getDistance(userLocation.lat, userLocation.lon, task.lat, task.lon),
        }))
        .filter((task) => !signedUpTasks.has(task.id)); 

      const sortedTasks = tasksWithDistance.sort((a, b) => a.distance - b.distance).slice(0, 5);

      setRecommendedTasks(sortedTasks);
    }
  }, [userLocation, signedUpTasks]); 

  const handleSignUp = (taskId, coins) => {
    setKindCoins((prevCoins) => prevCoins + coins);
    setSignedUpTasks((prevSet) => new Set([...prevSet, taskId])); 

    setRecommendedTasks((prevTasks) => {
      const remainingTasks = prevTasks.filter((task) => task.id !== taskId);

      const nextAvailableTask = tasks
        .map((task) => ({
          ...task,
          distance: getDistance(userLocation.lat, userLocation.lon, task.lat, task.lon),
        }))
        .filter((task) => !signedUpTasks.has(task.id) && task.id !== taskId)
        .sort((a, b) => a.distance - b.distance)[0];

      const updatedTasks = nextAvailableTask ? [...remainingTasks, nextAvailableTask] : remainingTasks;
      return updatedTasks.sort((a, b) => a.distance - b.distance);
    });
  };

  return (
    <div className="dashboard-container">
      <Link to="/discounts">
      <button className="coin-button"> </button>
      </Link>
      <h1 className="dashboard-title">Recommended Tasks Near You</h1>
      <div className="tasks-conta
      iner">
        {recommendedTasks.length > 0 ? (
          recommendedTasks.map((task) => (
            <div key={task.id} className="task-card">
              <h2>{task.title}</h2>
              <p>Organization: {task.organization}</p>
              <p>Distance: {task.distance.toFixed(2)} miles</p>
              <p>Time: {task.time}</p>
              <p>Earn: {task.coins} Kind Coins</p>
              <button className="signup-button" onClick={() => handleSignUp(task.id, task.coins)}>
                Sign Up
              </button>
            </div>
          ))
        ) : (
          <p>Fetching your location...</p>
        )}
      </div>
      <div className="kind-coins-container">
        <h2>Kind Coins: {kindCoins}</h2>
      </div>
    </div>
  );
};

export default Dashboard;