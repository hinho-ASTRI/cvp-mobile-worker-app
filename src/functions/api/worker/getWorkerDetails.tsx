export interface WorkerModal {
  extra: string;
  gender: string;
  hkid: string;
  id: string;
  name: string;
}

const getWorkerDetails = async (
  username: string,
  accessToken: string
): Promise<WorkerModal> => {
  // Retrieving cert details from API server
  const response = await fetch(
    `http://192.168.1.12:8081/api/workers/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    }
  );

  const data = (await response.json()) as WorkerModal;

  console.log(data);
  return data;
};

export default getWorkerDetails;
