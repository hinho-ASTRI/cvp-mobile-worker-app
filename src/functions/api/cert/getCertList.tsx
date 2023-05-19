import AsyncStorage from "@react-native-async-storage/async-storage";

export type itemProps = {
  UUID: string;
  isValid: boolean;
  credentialType: string;
  issuer: string;
};

const getCertList = async (
  username: string,
  page: number,
  pageSize: number
): Promise<{
  current_page: number;
  items: string[];
  page_size: number;
  total_items: number;
  total_pages: number;
}> => {
  const accessToken = (await AsyncStorage.getItem("accessToken")) as string;

  // Retrieving cert id list from API server
  const response = await fetch(
    // `http://192.168.2.100:8081/api/workers/${username}/certs`,
    `http://192.168.1.12:8081/api/workers/${username}/certs?page=${page}&size=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    }
  );

  // data is an array of string, i.e. array of cert ids
  const data: {
    current_page: number;
    items: string[];
    page_size: number;
    total_items: number;
    total_pages: number;
  } = await response.json();

  if (!data) {
    return;
  }

  // const fetchData = async (item: string, accessToken: string) => {
  //   try {
  //     const data = await getCertDetails(item, accessToken);
  //     if (data) {
  //       return {
  //         UUID: data.UUID,
  //         isValid: data.is_valid,
  //         credentialType: data.credential_type,
  //         issuer: data.issuer,
  //       };
  //     }
  //   } catch (e) {
  //     console.log("error:", e);
  //   }
  // };
  // const items: itemProps[] = await Promise.all(
  //   data.items.map((item: string) => fetchData(item, accessToken))
  // );

  // console.log(items);
  return data;
};

export default getCertList;
