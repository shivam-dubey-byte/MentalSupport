import { useState, useEffect, useRef } from "react";

const FloatingButtons = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const inactivityTimer = useRef(null); // Timer for hiding the arrow after inactivity

  // Track scroll direction and show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        // Scrolling down and past 300px
        setShowScrollButton(true);
        resetInactivityTimer(); // Reset the inactivity timer only on downward scroll
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setShowScrollButton(false);
      }

      setLastScrollY(currentScrollY); // Update last scroll position
    };

    // Reset the inactivity timer on downward scroll
    const resetInactivityTimer = () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current); // Clear the existing timer
      }
      inactivityTimer.current = setTimeout(() => {
        setShowScrollButton(false); // Hide the arrow after 2 seconds of inactivity
      }, 2000); // 2 seconds
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current); // Clear the timer on unmount
      }
    };
  }, [lastScrollY]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <>
      {/* Scroll-to-Top Button (Bottom Center) */}
      {showScrollButton && (
        <div
          style={{
            position: "fixed",
            bottom: "20px", // Arrow at the bottom center
            left: "50%", // Center horizontally
            transform: "translateX(-50%)", // Adjust for exact center
            zIndex: 1000,
            cursor: "pointer",
            backgroundColor: "#007bff", // Default color
            opacity: 0.7, // Lighter by default
            color: "white",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            transition: "opacity 0.3s ease, background-color 0.3s ease", // Smooth transition
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1"; // Darker on hover
            e.currentTarget.style.backgroundColor = "#005bb5"; // Darker color on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.7"; // Lighter when not hovered
            e.currentTarget.style.backgroundColor = "#007bff"; // Reset color
          }}
          onClick={scrollToTop}
        >
          <span style={{ fontSize: "24px" }}>↑</span>
        </div>
      )}

      {/* AI Chatbot Icon (Right Side, Slightly Above Bottom) */}
      <div
        style={{
          position: "fixed",
          bottom: "100px", // Chatbot above the bottom
          right: "20px", // Positioned on the right side
          zIndex: 1000,
          cursor: "pointer",
          backgroundColor: "#007bff",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
        onClick={toggleChatbot}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
          alt="Chatbot"
          style={{ width: "30px", height: "30px" }}
        />
      </div>

      {/* Chatbot UI */}
      {isChatbotOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "160px", // Chatbot UI above the chatbot icon
            right: "20px", // Aligned with the chatbot icon
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            width: "300px",
            zIndex: 1000,
          }}
        >
          <h3>Chatbot</h3>
          <p>How can I help you today?</p>
          <button
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => alert("Chatbot action!")}
          >
            Send
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;