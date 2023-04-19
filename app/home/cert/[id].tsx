import { useSearchParams } from "expo-router";

import CertListItemDetails from "~components/cert/CertListItemDetails";

const CertListID: React.FC = () => {
  const params = useSearchParams();
  const id = params.id as string;
  console.log(params);
  return <CertListItemDetails id={id} />;
};

export default CertListID;
