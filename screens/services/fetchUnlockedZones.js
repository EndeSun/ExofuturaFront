import axios from "axios";

export const fetchUnlockedZones = async (idUser) => {
  const response = await axios.get(`http://172.20.10.12/exofutura/public/api/v1/users/${idUser}/registerZones`);
  return response.data;
};
