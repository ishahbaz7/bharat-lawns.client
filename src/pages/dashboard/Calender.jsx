import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import minMax from "dayjs/plugin/minMax";
import utc from "dayjs/plugin/utc";
import { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import { getEvents } from "@/api/booking";
import EventView from "@/components/calender/EventView";
import { useNavigate } from "react-router-dom";
import { getDates } from "@/utility/helper";

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(minMax);
dayjs.extend(utc);

const localizer = momentLocalizer(dayjs);

const CalendarView = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate());
  const [eventModal, setEventModal] = useState(false);
  const [event, setEvent] = useState(null);
  const handleNavigate = (newDate) => {
    setSelectedDate(newDate);
  };
  const handleDateClick = (date) => {
    if (date.action === "click") {
      navigate("/admin/bookings/" + dayjs(selectedDate).format("YYYY-MM-DD"));
    }
  };
  const eventStyleGetter = (event) => {
    const style = {
      color: "#FFFFFF",
      borderRadius: "0px",
      border: "none",
    };
    if (event.status == 5) {
      style.backgroundColor = "#10B981";
    } else if (dayjs().isAfter(event.start, "day")) {
      style.backgroundColor = "green";
    } else if (event?.title == "Full Day Booked") {
      style.backgroundColor = "#EF4444";
    } else {
      style.backgroundColor = "#3B82F6";
    }

    return { style };
  };
  useEffect(() => {
    getEvents(dayjs(selectedDate).format("YYYY-MM-DD")).then((events) => {
      var evs = [
        ...events?.map((x) => {
          if (dayjs().isAfter(x.start, "day")) {
            return { ...x, title: x?.title + " Completed" };
          }
          return { ...x, title: x?.title + " Booked" };
        }),
      ];

      var dates = getDates(dayjs(selectedDate));
      dates.forEach((date) => {
        var ev = evs.find((e) => dayjs(e.start).isSame(date));
        if (!ev) {
          if (dayjs().subtract(1, "day").isBefore(date)) {
            evs.push({
              title: "Available",
              start: date.toDate(),
              end: date.toDate(),
              status: 5,
            });
          }
        }
      });
      setEvents(evs);
    });
  }, [selectedDate]);

  return (
    <div>
      <div className="max-w-[211.27px]">
        <Input
          className="w-full"
          type="month"
          value={dayjs(selectedDate).format("YYYY-MM")}
          onChange={(e) => setSelectedDate(e.target.value)}
          label="Select Month"
        />
      </div>

      <Calendar
        views={["month"]}
        date={selectedDate}
        onSelectEvent={(e) => {
          setEvent(e);
          if (e?.title == "Available")
            navigate("/admin/bookings/" + dayjs(e?.start).format("YYYY-MM-DD"));
          else if (e?.title == "Not Available") {
          } else {
            setEventModal(true);
          }
        }}
        // onSelectSlot={handleDateClick}
        // selectable={true}
        onNavigate={handleNavigate}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={(date) => {
          if (dayjs().subtract(1, "day").isAfter(date)) {
            return {
              className: "bg-gray-300",
            };
          }
        }}
      />
      {eventModal && (
        <EventView id={event?.id} open={eventModal} handler={setEventModal} />
      )}
    </div>
  );
};

export default CalendarView;
