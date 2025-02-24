const ShoppingSection = () => {
    return (
      <section id="shopping" className="h-screen flex flex-col justify-center items-center text-center bg-purple-100 p-10">
        <h1 className="text-4xl font-bold text-gray-900">Mental Wellness Products</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          Shop books, journals, and relaxation products designed to improve your mental health.
        </p>
        <a href="/shop" className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition">
          Visit Shop
        </a>
      </section>
    );
  };
  
  export default ShoppingSection;
  