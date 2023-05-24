import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import minMax from 'dayjs/plugin/minMax'
import utc from 'dayjs/plugin/utc'

dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(localeData)
dayjs.extend(localizedFormat)
dayjs.extend(minMax)
dayjs.extend(utc)

const events = [
  {
    id: 1,
    title: 'Morning',
    start: dayjs('2023-05-15T10:00:00').toDate(),
    end: dayjs('2023-05-15T12:00:00').toDate(),
  },
  {
    id: 2,
    title: 'Morning',
    start: dayjs('2023-05-16T14:00:00').toDate(),
    end: dayjs('2023-05-16T16:00:00').toDate(),
  },
   {
    id: 3,
    title: 'Evening',
    start: dayjs('2023-05-16T14:00:00').toDate(),
    end: dayjs('2023-05-16T16:00:00').toDate(),
  },
  {
    id: 4,
    title: 'Evening',
    start: dayjs('2023-05-17T14:00:00').toDate(),
    end: dayjs('2023-05-17T16:00:00').toDate(),
  },
  {
    id: 5,
    title: 'Full Day',
    start: dayjs('2023-05-21T14:00:00').toDate(),
    end: dayjs('2023-05-21T16:00:00').toDate(),
  }
  
  // Add more events as needed
];

const localizer = momentLocalizer(dayjs);

const CalendarView = () => {
  return (
    <div>
      <Calendar onSelectEvent={(data) =>console.log(data) }   
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarView;
