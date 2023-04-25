import React, { useEffect, useState } from "react";

import getCertIds from "~functions/getCertIds";
import { ListItem } from "~functions/getCertIds";
import CertList from "~components/cert/CertList";

const CertListPage: React.FC = () => {
  const [certIds, setItems] = useState<ListItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCertIds("user");
      setItems(data);
    };

    fetchData();
  }, []);

  console.log(certIds);

  return <CertList data={certIds} />;
};

export default CertListPage;
