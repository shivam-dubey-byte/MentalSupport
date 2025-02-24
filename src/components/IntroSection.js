import { useNavigate } from "react-router-dom";

const IntroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="intro" className="h-screen flex flex-col justify-center items-center text-center bg-blue-100 p-10">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to MindSupport</h1>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl">
        Your trusted platform for mental wellness and support. Get access to expert guidance, therapy, and a supportive community.
      </p>
      <button
        onClick={() => navigate("/about")}
        className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
      >
        Learn More
      </button>
    </section>
  );
};

export default IntroSection;
