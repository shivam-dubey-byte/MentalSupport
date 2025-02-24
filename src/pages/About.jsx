import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-gray-900">About MindSupport</h1>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl">
        We aim to provide mental health support through professional guidance and a caring community.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default About;
