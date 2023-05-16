import AsyncStorage from "@react-native-async-storage/async-storage";
import getCertDetails from "~functions/api/cert/getCertDetails";

const getCertIds = async (username: string): Promise<string[]> => {
  const accessToken = (await AsyncStorage.getItem("accessToken")) as string;

  // Retrieving cert id list from API server
  const response = await fetch(
    // `http://192.168.2.100:8081/api/workers/${username}/certs`,
    `http://192.168.1.12:8081/api/workers/${username}/certs`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    }
  );

  // data is an array of string, i.e. array of cert ids
  const data = await response.json();

  if (!data) {
    return [];
  }
  console.log(data);
  const fetchData = async (item, accessToken) => {
    try {
      const data = await getCertDetails(item, accessToken);
      if (data) {
        return {
          UUID: data.UUID,
          isValid: data.is_valid,
        };
      }
    } catch (e) {
      console.log("error:", e);
    }
  };
  const items = await Promise.all(
    data.items.map((item: string) => fetchData(item, accessToken))
  );
  console.log(items);
  return items;
};

export default getCertIds;
