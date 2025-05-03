import React, { useState, useEffect } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';
import { Link } from 'react-router-dom';

const PopularMenu = () => {
  const [menu] = useMenu();
  const [search, setSearch] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [noResults, setNoResults] = useState(false);

  // Use useEffect to set initial search state with popular items
  useEffect(() => {
    const sortedMenu = [...menu].sort((a, b) => b.attemptCount - a.attemptCount);
    const popular = sortedMenu.slice(0, 6);
    setSearch(popular);
  }, [menu]);

  const onSubmit = (e) => {
    e.preventDefault();
    const inputValue = searchText.trim().toLowerCase();
    const newArr = menu.filter((menuItem) => menuItem.name.toLowerCase().includes(inputValue));
    setSearch(newArr);
    setNoResults(newArr.length === 0);
  };

  return (
    <section className="py-12">
      <SectionTitle 
        heading="Most Popular Contests" 
        subHeading="Join the trending competitions" 
      />
      
      {/* Search specifically for this section */}
      <div className="max-w-md mx-auto mb-10">
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Search by contest name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input input-bordered w-full"
          />
          <button
            type="submit"
            className="btn btn-primary"
          >
            Search
          </button>
        </form>
      </div>
      
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {search.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
      
      {noResults && (
        <div className="text-center py-10">
          <p className="text-2xl font-bold mb-4">No results found</p>
          <button 
            onClick={() => {
              const sortedMenu = [...menu].sort((a, b) => b.attemptCount - a.attemptCount);
              const popular = sortedMenu.slice(0, 6);
              setSearch(popular);
              setNoResults(false);
              setSearchText('');
            }} 
            className="btn btn-outline btn-primary"
          >
            Show Popular Contests
          </button>
        </div>
      )}
      
      <div className="text-center mt-10">
        <Link to={'/order'}>
          <button className="btn btn-primary">
            View All Contests
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PopularMenu;
