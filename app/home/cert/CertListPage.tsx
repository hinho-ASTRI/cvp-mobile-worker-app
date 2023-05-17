import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";

import { usernameAtom } from "~atoms/username";
import getCertList from "~functions/api/cert/getCertList";
import CertList from "~components/cert/CertList";
import { itemProps } from "~functions/api/cert/getCertList";

const CertListPage: React.FC = () => {
  const [certList, setCertList] = useState<itemProps[]>([]);
  const router = useRouter();
  const usernameData = useAtomValue(usernameAtom);
  const [distinctCredentialType, setDistinctCredentialType] = useState<
    string[] | null
  >(null);
  const [distinctIssuer, setDistinctIssuer] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCertList(usernameData);
        if (data) {
          setCertList(data);
          setDistinctCredentialType([
            ...new Set(data.map((item) => item.credentialType)),
          ]);
          setDistinctIssuer([...new Set(data.map((item) => item.issuer))]);
        }
      } catch (e) {
        console.log("error:", e);
        router.replace("/(auth)/sign-in");
      }
    };
    fetchData();
  }, []);
  if (certList.length !== 0 ? distinctCredentialType && distinctIssuer : null) {
    return (
      <CertList
        data={certList}
        distinctCredentialType={distinctCredentialType}
        distinctIssuer={distinctIssuer}
      />
    );
  }
};

export default CertListPage;
