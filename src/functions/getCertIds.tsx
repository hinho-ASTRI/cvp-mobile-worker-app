import AsyncStorage from "@react-native-async-storage/async-storage";

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
  console.log(data);
  const items: string[] = data.map((id: string, index: number) => {
    return {
      id: index.toString(),
      UUID: id,
    };
  });

  return items;
};

export default getCertIds;
