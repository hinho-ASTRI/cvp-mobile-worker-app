export interface ListItem {
  UUID: string;
  credential_type: string;
  end_date: string;
  issuer: string;
  start_date: string;
}

const getCertDetails = async (
  username: string,
  UUID: string,
  accessToken: string
): Promise<ListItem[]> => {
  // Retrieving cert details from API server
  const response = await fetch(
    `http://192.168.2.100:8081/workers/${username}/certs?certId=${UUID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    }
  );

  const data = (await response.json()) as ListItem[];

  console.log(data);
  return data;
};

export default getCertDetails;
