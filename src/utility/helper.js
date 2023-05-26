export const toSelectType = (data) => {
  let arr = [];
  if (Array.isArray(data)) {
    data?.map((v) => v.id && arr.push({ label: v?.name, value: v?.id }));
  } else {
    return { label: data?.name, value: data?.id };
  }
  return arr;
};

export const toPascalCase = (string) => {
  return string[0].toUpperCase().concat(string.slice(1));
};
