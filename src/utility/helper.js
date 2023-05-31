import dayjs from "dayjs";

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

export const getDates = (date = dayjs()) => {
  date = dayjs(date);
  var lastDate = date.daysInMonth();
  var dates = [];
  for (var i = 1; i <= lastDate; i++) {
    dates.push(dayjs(`${date.year()}-${date.month() + 1}-${i.toString()}`));
  }
  return dates;
};

export const getYears = (from = 2023) => {
  var to = dayjs().year();
  var years = [];
  for (var i = from; i <= to; i++) {
    years.push(i.toString());
  }
  return years;
};
export const getDatesByMonthYear = (
  month = (dayjs().month() + 1).toString(),
  year = dayjs().year().toString()
) => {
  var lastDate = dayjs(`${year}-${parseInt(month) + 1}-01`)
    .subtract(1)
    .date();
  var dates = [];
  for (var i = 1; i <= lastDate; i++) {
    dates.push(dayjs(`${year}-${month}-${i.toString()}`));
  }
  return dates;
};
