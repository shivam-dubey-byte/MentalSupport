import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IntroSection = () => {
  const navigate = useNavigate();
  const [bubbles, setBubbles] = useState(
    Array.from({ length: 20 }, (_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      bottom: "-10%",
      size: `${Math.random() * 30 + 20}px`, // Random size between 20px and 50px
      duration: Math.random() * 10 + 10, // Random duration between 10s and 20s
      delay: Math.random() * 5, // Random delay between 0s and 5s
      isBurst: false, // Track if the bubble has burst
      droplets: [], // Store droplets for burst effect
    }))
  );

  // Function to handle bubble burst
  const handleBubbleBurst = (id) => {
    setBubbles((prevBubbles) =>
      prevBubbles.map((bubble) => {
        if (bubble.id === id) {
          // Generate droplets for the burst effect
          const droplets = Array.from({ length: 10 }, (_, i) => ({
            id: i,
            angle: (Math.PI * 2 * i) / 10, // Evenly distribute droplets in a circle
            distance: Math.random() * 50 + 50, // Random distance for each droplet
          }));
          return { ...bubble, isBurst: true, droplets };
        }
        return bubble;
      })
    );

    // Remove the bubble and its droplets from the DOM after the animation
    setTimeout(() => {
      setBubbles((prevBubbles) => prevBubbles.filter((bubble) => bubble.id !== id));
    }, 500); // Match the duration of the burst animation
  };

  return (
    <section
      id="intro"
      className="h-screen flex flex-col justify-center items-center text-center p-10 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      }}
    >
      {/* Floating Bubbles Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              className="absolute bg-white rounded-full opacity-30"
              style={{
                left: bubble.left,
                bottom: bubble.bottom,
                width: bubble.size,
                height: bubble.size,
              }}
              initial={{ y: 0, opacity: 0.3 }}
              animate={{
                y: "-200vh",
                opacity: 0,
                transition: {
                  duration: bubble.duration,
                  delay: bubble.delay,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.5 } }}
              onHoverStart={() => handleBubbleBurst(bubble.id)}
            >
              {/* Droplets for burst effect */}
              <AnimatePresence>
                {bubble.isBurst &&
                  bubble.droplets.map((droplet) => (
                    <motion.div
                      key={droplet.id}
                      className="absolute bg-white rounded-full opacity-30"
                      style={{
                        width: "8px",
                        height: "8px",
                        left: "50%",
                        top: "50%",
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 0.3,
                        x: Math.cos(droplet.angle) * droplet.distance,
                        y: Math.sin(droplet.angle) * droplet.distance,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 10,
                          delay: 0.1 * droplet.id,
                        },
                      }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    />
                  ))}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10">
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
      </div>
    </section>
  );
};

export default IntroSection;