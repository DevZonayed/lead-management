/**
 * This function will filter invalid data based on Origine and reg date
 * @param {Item Array} item
 * @param {Subject} subjects
 * @returns
 */
const isValidLead = (item) => {
  let errorData = item.filter((item) => {
    return (
      (new Date(item.leadAt).toString() === "Invalid Date" &&
        isNaN(new Date(item.leadAt))) ||
      !item.leadBy ||
      item.leadBy === "" ||
      item.leadFrom === ""
    );
  });

  return errorData;
};

const margeBatch = (data) => {
  let margedItem = [];
  data.map((item) => {
    let dupliCateIndex = margedItem.findIndex(
      (existingData) =>
        existingData.phone === item.phone || existingData.email === item.email
    );
    if (dupliCateIndex === -1) {
      margedItem.push(item);
    } else {
      if (
        !new RegExp(item.batch, "gi").test(margedItem[dupliCateIndex].batch)
      ) {
        margedItem[dupliCateIndex] = {
          ...margedItem[dupliCateIndex],
          batch: `${margedItem[dupliCateIndex].batch},${item.batch}`,
        };
      }
    }
  });
  return margedItem;
};

export { isValidLead, margeBatch };
