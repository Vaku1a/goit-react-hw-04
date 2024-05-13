import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImages = async (searchQuery, currentPage) => {
  const response = await axios.get("/search/photos", {
    params: {
      client_id: "j1o6ayLx3SNNALJK3LA9Q5Gl0DS9OhtjS8Ccxf99Kos",
      query: searchQuery,
      per_page: 30,
      page: currentPage,
    },
  });
  return response.data.results;
};
