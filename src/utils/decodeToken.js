export const decodeToken = (token) => {
    try {
      // Split the token into its three parts
      const base64Url = token.split('.')[1]; // Get the payload part
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert to base64
      const payload = JSON.parse(atob(base64)); // Decode and parse the payload
      return payload;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };