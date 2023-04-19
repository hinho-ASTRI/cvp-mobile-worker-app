import React, { useEffect, useState } from "react";

import getCertIds from "~components/functions/getCertIds";
import { ListItem } from "~components/functions/getCertIds";
import CertList from "~components/cert/CertList";

const CertListPage: React.FC = () => {
  const [certIds, setItems] = useState<ListItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCertIds("myuser");
      setItems(data);
    };

    fetchData();
  }, []);

  console.log(certIds);

  return <CertList data={certIds} />;
};

export default CertListPage;
