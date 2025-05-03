const Banner = () => {
  return (
    <div className="relative">
      {/* Banner image with gradient overlay */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src="https://i.ibb.co/3SzCfqr/bannercontest.jpg"
          alt="Contest Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70"></div>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 drop-shadow-lg">
          Welcome to <span className="text-blue-400">Contest Platform</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-center">
          Discover competitions, showcase your skills, and win amazing prizes
        </p>

        {/* Search component */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <input 
              type="text" 
              placeholder="Search contests..." 
              className="input input-bordered w-full text-black px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all w-full md:w-auto">
              Search
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <button className="badge badge-primary py-3 px-4">Gaming</button>
            <button className="badge badge-secondary py-3 px-4">Writing</button>
            <button className="badge badge-accent py-3 px-4">Programming</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
  