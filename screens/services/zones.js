import axios from "axios";

export const fetchZones = async () => {
  const response = await axios.get("http://172.20.10.12/exofutura/public/api/v1/zones");
  return response.data;
};
