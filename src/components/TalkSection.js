const TalkSection = () => {
    return (
      <section id="talk" className="h-screen flex flex-col justify-center items-center text-center bg-green-100 p-10">
        <h1 className="text-4xl font-bold text-gray-900">Talk to Experts</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          Connect with licensed therapists and professionals who can help you navigate your mental wellness journey.
        </p>
        <a href="/talk" className="mt-6 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
          Start Talking
        </a>
      </section>
    );
  };
  
  export default TalkSection;
  