// App.js
import React from 'react';
import Leaderboard from './Leaerboard';

const App = () => {
  const leaderboardData = [
    { name: 'John Doe', score: 150 },
    { name: 'Jane Smith', score: 120 },
    { name: 'Bob Johnson', score: 90 },
    // Add more data as needed
  ];

  return (
    <div className="App">
      <Leaderboard data={leaderboardData} />
    </div>
  );
};

export default App;
