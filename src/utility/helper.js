import dayjs from "dayjs";
import * as XLSX from "xlsx";

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

export const getParams = (key) => {
  return new URLSearchParams(window.location.search).get(key);
};

export function exportExcel(
  data,
  properties,
  options = {},
  dateFields = ["createdAt", "functionDate", "date"]
) {
  const wb = XLSX.utils.book_new();

  // Create a new worksheet
  const ws = XLSX.utils.json_to_sheet(
    data.map((d) => {
      const obj = {};
      properties.forEach((prop, index) => {
        const keys = prop.split(".");
        let value = d[keys[0]];
        for (let i = 1; i < keys.length; i++) {
          value = value && value[keys[i]];
        }
        if (dateFields.includes(keys[0])) {
          // Convert valid date to "DD-MM-YYYY" format
          value = dayjs(value).format("DD-MM-YYYY");
        }
        obj[options.columns ? options.columns[index] : prop] = value;
      });
      return obj;
    })
  );

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Create a blob from the workbook and download it
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
  const fileName =
    `${options.fileName}-${dayjs().format("DDMMYYYYThhmmss")}.xlsx` ||
    "data.xlsx";
  //@ts-ignore
  if (typeof window.navigator.msSaveBlob !== "undefined") {
    //@ts-ignore
    window.navigator.msSaveBlob(blob, fileName);
  } else {
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

//download excell finished
