// Leaderboard.js
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useMenu from '../hooks/useMenu';

const Leaderboard = () => {
  const user = useContext(AuthContext);
  const menu = useMenu();
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const emailCounts = menu.reduce((acc, item) => {
      if (item.email) {
        acc[item.email] = (acc[item.email] || 0) + 1;
      }
      return acc;
    }, {});

    const leaderboardData = Object.entries(emailCounts).map(([email, count]) => ({
      email,
      count,
    }));

    const sortedData = leaderboardData.sort((a, b) => b.count - a.count);

    setSortedData(sortedData);
  }, [menu]);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Rank</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Count</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{item.email}</td>
              <td className="py-2 px-4 border-b">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
