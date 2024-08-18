import axios from "axios";

export const putDiscoverZone = async (idZone, idUser, unlock) => {
  try {    
    const response = await axios.put(
      `http://172.20.10.12/exofutura/public/api/v1/zone/${idZone}/discover/${idUser}`,
      {
        unlocked: unlock,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error discovering zone:", error);
    throw error;
  }
};
