import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";

import { usernameAtom } from "~atoms/username";
import getCertIds from "~functions/api/cert/getCertIds";
// import { ListItem } from "~functions/getCertIds";
import CertList from "~components/cert/CertList";

const CertListPage: React.FC = () => {
  const [certIds, setItems] = useState<string[]>([]);
  const router = useRouter();
  const usernameData = useAtomValue(usernameAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCertIds(usernameData);
        if (data) {
          setItems(data);
          console.log("data", data);
        }
      } catch (e) {
        console.log("error:", e);
        router.replace("/(auth)/sign-in");
      }
    };
    fetchData();
  }, []);

  console.log(certIds);

  return <CertList data={certIds} />;
};

export default CertListPage;
