import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { usernameAtom } from "~atoms/username";
import getCertList from "~functions/api/cert/getCertList";
import CertList from "~components/cert/CertList";
import { itemProps } from "~functions/api/cert/getCertList";
import getCertDetails from "~functions/api/cert/getCertDetails";

const CertListPage: React.FC = () => {
  const [certList, setCertList] = useState<itemProps[]>([]);
  const router = useRouter();
  const usernameData = useAtomValue(usernameAtom);

  const [totalItem, setTotalItem] = useState<number | null>(null);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState<boolean>(false);

  //pagination
  const [pageSize, setPageSize] = useState(10); // hardcoded
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (currentPage: number) => {
    try {
      const data = await getCertList(usernameData, currentPage, pageSize);
      if (data) {
        setTotalItem(data.total_items);
        setShowLoadMoreButton(
          data.total_items - data.page_size * currentPage > 0
        );
        setPageSize(data.page_size);
        const fetchData = async (item: string, accessToken: string) => {
          try {
            const data = await getCertDetails(item, accessToken);
            if (data) {
              return {
                UUID: data.UUID,
                isValid: data.is_valid,
                credentialType: data.credential_type,
                issuer: data.issuer,
              };
            }
          } catch (e) {
            console.log("error:", e);
          }
        };
        const accessToken = (await AsyncStorage.getItem(
          "accessToken"
        )) as string;

        const items: itemProps[] = await Promise.all(
          data.items.map((item: string) => fetchData(item, accessToken))
        );
        if (items) {
          setCertList([...certList, ...items]);
          console.log();
        }
      }
    } catch (e) {
      console.log("error:", e);
      router.replace("/(auth)/sign-in");
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, []);

  useEffect(() => {
    if (currentPage > 1) {
      const fetchMoreData = async () => {
        if (isLoading) return;
        setIsLoading(true);
        await fetchData(currentPage);
        setIsLoading(false);
      };
      fetchMoreData();
    }
  }, [currentPage]);
  const loadMoreData = () => {
    setCurrentPage((prev) => prev + 1);
  };

  if (certList.length !== 0 && totalItem !== null) {
    return (
      <CertList
        data={certList}
        totalItem={totalItem}
        showLoadMoreButton={showLoadMoreButton}
        loadMoreData={loadMoreData}
      />
    );
  }
};

export default CertListPage;
