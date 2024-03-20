// https://vitejs.dev/config/
export default {
  server: {
    proxy: {
      "/api": "http://localhost:4000", // Replace YOUR_BACKEND_PORT with your actual backend server port
    },
  },
};
