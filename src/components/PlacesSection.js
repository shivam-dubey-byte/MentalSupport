const PlacesSection = () => {
    return (
      <section id="places" className="h-screen flex flex-col justify-center items-center text-center bg-yellow-100 p-10">
        <h1 className="text-4xl font-bold text-gray-900">Find Safe Spaces</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          Discover quiet, calming places near you where you can relax and rejuvenate.
        </p>
        <a href="/places" className="mt-6 px-6 py-3 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800 transition">
          Explore Places
        </a>
      </section>
    );
  };
  
  export default PlacesSection;
  