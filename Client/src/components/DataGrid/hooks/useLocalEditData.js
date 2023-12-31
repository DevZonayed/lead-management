import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const useLocalEditData = (id) => {
  const { lead } = useSelector((state) => state);

  const [localData, setLocalData] = useState(() => {
    let localLead = lead.lead.filter((item) => item._id === id)[0];

    if (localStorage.getItem("editedData") !== null) {
      let dirft = JSON.parse(localStorage.getItem("editedData")).filter(
        (item) => item?._id === id
      )[0];
      if (dirft !== undefined) {
        return dirft;
      } else {
        return localLead;
      }
    } else {
      return localLead;
    }
  });

  useEffect(() => {
    let localLead = lead.lead.filter((item) => item._id === id)[0];
    if (localStorage.getItem("editedData") !== null) {
      let dirft = JSON.parse(localStorage.getItem("editedData")).filter(
        (item) => item._id === id
      )[0];
      if (dirft !== undefined) {
        setLocalData(dirft);
      } else {
        setLocalData(localLead);
      }
    } else {
      setLocalData(localLead);
    }
  }, [id]);

  useEffect(() => {
    let localStoreData = localStorage.getItem("editedData");
    if (localStoreData === null) {
      let data = [{ ...localData }];
      localStorage.setItem("editedData", JSON.stringify(data));
    } else {
      let index = JSON.parse(localStoreData).findIndex(
        (item) => item._id === id
      );
      if (index !== -1) {
        let localStoreParsedData = [...JSON.parse(localStoreData)];
        localStoreParsedData[index] = localData;
        localStorage.setItem(
          "editedData",
          JSON.stringify(localStoreParsedData)
        );
      } else {
        let localStoreParsedData = [...JSON.parse(localStoreData)];
        localStoreParsedData.push(localData);
        localStorage.setItem(
          "editedData",
          JSON.stringify(localStoreParsedData)
        );
      }
    }
  }, [localData]);

  const dataToSend = useMemo(() => {
    if (localData !== undefined) {
      return localData;
    }
  }, [localData]);

  return [dataToSend, setLocalData];
};

export default useLocalEditData;
