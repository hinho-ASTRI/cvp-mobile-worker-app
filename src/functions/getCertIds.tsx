import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ListItem {
  id: string;
  value: string;
}

const getCertIds = async (username: string): Promise<ListItem[]> => {
  const accessToken = (await AsyncStorage.getItem("accessToken")) as string;
  console.log("cert_list_page", accessToken);
  // Retrieving cert id list from API server
  // TODO: for `myuser` in the url path, it should be filled in with the username, just now we only have one user, i.e "myuser".
  const response = await fetch(
    `http://localhost:8081/workers/${username}/cert_list`,
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
  console.log("cert_list: ", data);

  const items: ListItem[] = data.map((value: string, index: number) => {
    return {
      id: index.toString(),
      value,
    };
  });

  console.log(items);

  return items;
};

export default getCertIds;
