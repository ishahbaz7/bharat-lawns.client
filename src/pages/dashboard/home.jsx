import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import StatisticsChart from "@/widgets/charts/statistics-chart";
import {
  statisticsCardsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import websiteViewsChart from "@/data/statistics-charts-data";
import { useState, useMemo, useEffect } from "react";
import dayjs from "dayjs";
import { getYears, getDatesByMonthYear } from "@/utility/helper";
import { getMonthlyReports, getYearlyReports } from "@/api/reports";
import { FaUsers, FaUsersSlash } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { GiBanknote } from "react-icons/gi";
import { RiCurrencyLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const months = [
  { name: "Jan", value: "01" },
  { name: "Feb", value: "02" },
  { name: "Mar", value: "03" },
  { name: "Apr", value: "04" },
  { name: "May", value: "05" },
  { name: "Jun", value: "06" },
  { name: "Jul", value: "07" },
  { name: "Aug", value: "08" },
  { name: "Sep", value: "09" },
  { name: "Oct", value: "10" },
  { name: "Nov", value: "11" },
  { name: "Dec", value: "12" },
];
export function Home() {
  const [yearlyReports, setYearlyReports] = useState([]);
  const [monthsConfig, setMonthsConfig] = useState({
    month: dayjs().format("MM"),
    year: dayjs().format("YYYY"),
  });
  const [cardData, setCardData] = useState({});
  const [yearConfig, setYearConfig] = useState(dayjs().format("YYYY"));
  const cards = useMemo(
    () => [
      {
        href: "/admin/bookings",
        footerHref: "/admin/bookings",
        color: "green",
        value: cardData?.activeMembers,
        title: dayjs().format("MMM") + " month's Bookings",
        icon: FaUsers,
        footer: (
          <>
            Total Bookings{" "}
            <span className="font-bold">{cardData?.totalMembers}</span>
          </>
        ),
      },
      {
        href: "/expired-members",
        footerHref: "/inactive-members",
        color: "red",
        value: cardData?.expiredMembers,
        title: "Membership Expired",
        icon: FaUsersSlash,
        footer: (
          <div>
            In-active Members{" "}
            <span className="font-bold">{cardData?.inActiveMembers}</span>
          </div>
        ),
      },
      {
        href: "/",
        value: (
          <span className="font-bold">
            <BiRupee className="inline-block" />
            {cardData?.todaysCollection}
          </span>
        ),
        title: "Today's Collection",
        icon: GiBanknote,
        footer: (
          <div>
            {" "}
            Yesterday's collection{" "}
            <span className="font-bold">
              <BiRupee className="inline-block" />
              {cardData?.yesterdaysCollection}
            </span>
          </div>
        ),
      },
      {
        href: "/",
        color: "green",
        value: (
          <>
            <BiRupee className="inline-block" />
            {cardData?.thisMonthsCollections}
          </>
        ),

        title: "This Month's collection",
        icon: RiCurrencyLine,
        footer: (
          <>
            {" "}
            Last Month's collection{" "}
            <span className="font-bold">
              <BiRupee className="inline-block" />
              {cardData?.lastMonthsCollections}
            </span>
          </>
        ),
      },
    ],
    []
  );
  const [monthlyReports, setMonthlyReports] = useState([]);

  useEffect(() => {
    var dates = getDatesByMonthYear(monthsConfig.month, monthsConfig.year);
    var d = [];
    dates.map((x) => d.push({ date: x?.format("DD MMM YY"), bookings: 0 }));
    getMonthlyReports(monthsConfig.month, monthsConfig.year).then((data) => {
      var j = 0;
      setMonthlyReports(
        d.map((x) => {
          if (x.date == dayjs(data[j]?.date).format("DD MMM YY")) {
            j++;
            return {
              date: x?.date,
              bookings: data[j - 1]?.bookings | 0,
            };
          } else {
            return x;
          }
        })
      );
    });
  }, [monthsConfig]);

  useEffect(() => {
    var m = [];
    months.map((x) =>
      m.push({
        date: dayjs(`${yearConfig}-${x.value}-1`).format("MMM YY"),
        amount: 0,
      })
    );
    getYearlyReports(yearConfig).then((data) => {
      var j = 0;
      setYearlyReports(
        m.map((x) => {
          if (dayjs(data[j]?.date).format("MMM YY") == x?.date) {
            j++;

            return { date: x?.date, amount: data[j - 1]?.amount | 0 };
          } else {
            return x;
          }
        })
      );
    });
  }, [yearConfig]);

  const statisticsChartsData = useMemo(
    () => [
      {
        xaxis: monthlyReports,
        type: "daily",
        color: "green",
        title: (
          <div className="flex items-center justify-between">
            <Typography className="font-medium">
              Daily Bookings of{" "}
              <span className="font-semibold">
                {dayjs(monthlyReports[0]?.date).format("MMM YY")}
              </span>
            </Typography>
            <div className="mt-2 flex gap-3">
              <div className="max-w-sm">
                <Select
                  className="w-full"
                  onChange={(e) => {
                    e && setMonthsConfig((p) => ({ ...p, month: e }));
                  }}
                  value={monthsConfig.month}
                  menuProps={{ className: "max-h-[200px]" }}
                  label="Select Month"
                >
                  {months.map((x) => (
                    <Option value={x.value}>{x.name}</Option>
                  ))}
                </Select>
              </div>
              <div className="max-w-sm">
                {" "}
                <Select
                  menuProps={{ className: "max-h-[200px]" }}
                  onChange={(e) =>
                    e && setMonthsConfig((p) => ({ ...p, year: e }))
                  }
                  value={monthsConfig.year}
                  label="Select Year"
                >
                  {getYears().map((x) => (
                    <Option value={x}>{x}</Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        ),
        chart: websiteViewsChart,
      },
      // {
      //   xaxis: yearlyReports,
      //   type: "monthly",
      //   color: "blue",
      //   title: (
      //     <div className="flex items-center justify-between">
      //       <Typography className="font-medium">
      //         Monthly Collection of{" "}
      //         <span className="font-semibold">{yearConfig}</span>
      //       </Typography>
      //       <div className="mt-2 flex gap-3">
      //         <div className="max-w-sm">
      //           <Select
      //             menuProps={{ className: "max-h-[200px]" }}
      //             className="w-full"
      //             onChange={(e) => e && setYearConfig(e)}
      //             value={yearConfig}
      //             label="Select Year"
      //           >
      //             {getYears().map((x) => (
      //               <Option value={x}>{x}</Option>
      //             ))}
      //           </Select>
      //         </div>
      //       </div>
      //     </div>
      //   ),
      //   chart: websiteViewsChart,
      // },
    ],
    [monthlyReports, yearlyReports]
  );

  return (
    <div className="mt-12">
      <div className="mb-12 mt-10 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((x) => (
          <StatisticsCard
            href={x.href}
            color={x.color}
            value={x.value}
            title={x.title}
            icon={<x.icon size={25} />}
            footer={
              <Link to={x.footerHref || "#"}>
                <Typography className="font-normal text-blue-gray-600">
                  {x.footer}
                </Typography>
              </Link>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 ">
        {statisticsChartsData.map((props, index) => {
          console.log(props.xaxis.map((x) => x.bookings));
          console.log(props.xaxis.map((x) => x.date));
          return (
            <div key={props.title} className="space-y-10">
              <StatisticsChart
                data={props.xaxis.map((x) => x.bookings)}
                categories={props.xaxis.map((x) => x.date)}
                color={props.color}
                key={index}
                chart={props.chart}
                title={props.title}
              />
            </div>
          );
        })}
      </div>

      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Projects
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
                <strong>30 done</strong> this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["companies", "members", "budget", "completion"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(
                  ({ img, name, members, budget, completion }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${
                                  key === 0 ? "" : "-ml-2.5"
                                }`}
                              />
                            </Tooltip>
                          ))}
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {budget}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
