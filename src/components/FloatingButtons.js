import { useState, useEffect } from "react";

const FloatingButtons = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Show/hide scroll-to-top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll
    });
  };

  return (
    <>
      {/* AI Chatbot Icon */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          cursor: "pointer",
        }}
        onClick={() => alert("Chatbot opened!")} // Replace with your chatbot logic
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" // Replace with your chatbot icon
          alt="Chatbot"
          style={{ width: "50px", height: "50px" }}
        />
      </div>

      {/* Scroll-to-Top Button */}
      {showScrollButton && (
        <div
          style={{
            position: "fixed",
            bottom: "80px", // Position above the chatbot icon
            right: "20px",
            zIndex: 1000,
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
          onClick={scrollToTop}
        >
          <span style={{ fontSize: "24px" }}>↑</span>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;