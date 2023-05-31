import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "bar",
  height: 300,
  options: {
    ...chartsConfig,
    colors: "#fff",
    plotOptions: {
      bar: {
        columnWidth: "30%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
    },
  },
};

export default websiteViewsChart;
