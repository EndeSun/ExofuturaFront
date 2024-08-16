import axios from "axios";

export const fetchZones = async (idUsuario) => {
  const response = await axios.get(`http://172.20.10.12/exofutura/public/api/v1/users/${idUsuario}/registerZones`);
  return response.data;
};
