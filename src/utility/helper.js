export const toSelectType = (data) => {
  let arr = [];
  data?.map((v) => v.id && arr.push({ label: v?.name, value: v?.id }));
  return arr;
};
