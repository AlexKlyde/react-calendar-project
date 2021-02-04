import React, { useState, useEffect } from 'react';
import { format, getMinutes, getHours } from 'date-fns';
import PropTypes from 'prop-types';

import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';
import './hour.scss';

const Hour = ({ dayStart, dataHour, hourEvents, deleteEvent }) => {
  const [hour, setHour] = useState(getHours(new Date()));
  const [minutes, setMinutes] = useState(getMinutes(new Date()));

  useEffect(() => {
    if (minutes === 60) {
      setMinutes(0);
      setHour(hour + 1);
    }
    const interval = setInterval(() => {
      setMinutes(minutes + 1);
    }, 60000);

    return () => clearInterval(interval);
  });

  const dataDay = format(dayStart, 'MM dd yyyy') === format(new Date(), 'MM dd yyyy');

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {dataDay && dataHour === hour ? (
        <div style={{ top: `${minutes}px` }} className="red-line"></div>
      ) : null}

      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(dateFrom.getMinutes())}`;

        const eventEnd = `${dateTo.getHours()}:${formatMins(dateTo.getMinutes())}`;

        return (
          <Event
            key={id}
            id={id}
            title={title}
            deleteEvent={deleteEvent}
            //calculating event height = duration of event in minutes
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  dayStart: PropTypes.instanceOf(Date).isRequired,
  hourEvents: PropTypes.array.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

export default Hour;
