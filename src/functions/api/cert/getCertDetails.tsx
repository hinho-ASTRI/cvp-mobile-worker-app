export interface CertDetailsFields {
  UUID: string;
  credential_type: string;
  end_date: string;
  extra: string;
  is_valid: boolean;
  issuer: string;
  start_date: string;
  worker_signature: string;
}

const getCertDetails = async (
  UUID: string,
  accessToken: string
): Promise<CertDetailsFields> => {
  // Retrieving cert details from API server
  const response = await fetch(`http://192.168.1.12:8081/api/certs/${UUID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  });

  const data = (await response.json()) as CertDetailsFields;

  console.log(data);
  return data;
};

export default getCertDetails;
