import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPrintReceipt } from "@/api/booking";
import dayjs from "dayjs";
import { Typography } from "@material-tailwind/react";

const PrintReceipt = () => {
  const { id } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [isPrinted, setIsPrinted] = useState(false);
  useEffect(() => {
    if (id) {
      getPrintReceipt(id).then((rec) => {
        setReceipt(rec);
      });
    }
  }, []);
  useEffect(() => {
    console.log(receipt);
    if (receipt && !isPrinted) {
      setIsPrinted(true);
      window.print();
      setTimeout(() => {
        window.close();
      }, 800);
    }
  }, [receipt]);
  return (
    <div className="flex min-h-screen flex-col justify-between">
      {[1, 2].map((x) => (
        <div className="flex items-center justify-center bg-gray-100">
          <div className="w-full bg-white">
            <div className="flex justify-between px-4 py-2">
              <div className="min-w-fit">
                <h1 className="text-3xl font-extrabold  tracking-widest text-indigo-500">
                  Bharat Lawns
                </h1>
              </div>
              <div className="p-2">
                <ul className="flex">
                  <li className="flex flex-col items-center border-l-2 border-indigo-200 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      ></path>
                    </svg>
                    <span className="text-sm">www.bharatlawns.com</span>
                  </li>
                  <li className="flex flex-col border-l-2 border-indigo-200 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    <span className="text-sm">
                      Q6RG+XC6, Near Sai Nath School, lanji Road, Walunj,
                      Walunj, Maharashtra 431136
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="h-0.5 w-full bg-indigo-500"></div>
            <div className="flex justify-between gap-14 p-4">
              <div className="w-40">
                <address className="text-sm">
                  <span className="font-bold"> Billed To : </span>
                  {receipt?.name}, {receipt?.mobileNo}
                </address>
              </div>
              <div>
                <h6 className="font-bold">
                  Receipt Date :{" "}
                  <span className="text-sm font-medium">
                    {dayjs(receipt?.receiptDate).format("DD/MM/YYYY")}
                  </span>
                </h6>
                <h6 className="font-bold">
                  Receipt ID :{" "}
                  <span className="text-sm font-medium">
                    {receipt?.receiptNo}
                  </span>
                </h6>
                <h6 className="font-bold">
                  Booking ID :{" "}
                  <span className="text-sm font-medium">
                    {receipt?.invoiceNo}
                  </span>
                </h6>
              </div>
            </div>

            <div className="flex justify-center px-4 py-2">
              <div className="w-full border-b border-gray-200 shadow">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Program Timing",
                        "Features",
                        "Other Features",
                        "Function Date",
                      ].map((x) => (
                        <th className="min-w-[140px] border-2 p-2">
                          <Typography className="font-normal">{x}</Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      {[
                        receipt?.programTiming,
                        receipt?.features?.map((x) => x.name).join(", "),
                        receipt?.otherFeatures,
                        dayjs(receipt?.functionDate).format("DD MMM YYYY"),
                      ].map((x) => (
                        <td className="border p-2">
                          <Typography className="font-normal">{x}</Typography>
                        </td>
                      ))}
                    </tr>
                    <tr className="h-10"></tr>

                    <tr className="bg-gray-800 text-white">
                      <th colspan="2"></th>
                      <td className="text-sm font-bold">
                        <Typography className="text-lg font-bold">
                          Paid
                        </Typography>
                      </td>
                      <td className="text-sm font-bold">
                        <Typography className="text-lg font-bold">
                          {receipt?.amount}
                        </Typography>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-between px-4 py-2">
              <div>
                <h3 className="text-xl">Terms And Condition :</h3>
                <ul className="list-inside list-disc text-xs">
                  <li>
                    All accounts are to be paid within 7 days from receipt of
                    invoice.
                  </li>
                  <li>
                    To be paid by cheque or credit card or direct payment
                    online.
                  </li>
                  <li>
                    To be paid by cheque or credit card or direct payment
                    online.
                  </li>
                </ul>
              </div>
              <div className="px-4 py-2">
                <h3>Signature</h3>
              </div>
            </div>
            <div className="my-2 h-0.5 w-full bg-indigo-500"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrintReceipt;
