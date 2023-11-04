import { upperCaseWithHyphen } from "./utils";

const processCsvData = (data) => {
  let keys = data.shift();
  let processedData = data.map((item) => {
    let data = {};
    for (let i = 0; i < keys.length; i++) {
      data[keys[i]] = item[i];
    }
    return data;
  });
  return processedData.map((item) => {
    return { ...item, leadFrom: upperCaseWithHyphen(item.leadFrom) };
  });
};
export default processCsvData;
