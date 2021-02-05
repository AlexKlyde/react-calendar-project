import React, { useState, useEffect } from 'react';
import { format, getMinutes, getHours } from 'date-fns';
import PropTypes from 'prop-types';

import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';
import './hour.scss';

const Hour = ({ dayStart, dataHour, hourEvents, onDeleteEvent }) => {
  const date = new Date();
  const [hour, setHour] = useState(getHours(date));
  const [minutes, setMinutes] = useState(getMinutes(date));

  useEffect(() => {
    if (minutes === 60) {
      setHour(hour + 1);
    }
    const intervalId = setInterval(() => {
      setMinutes(minutes + 1);
    }, 60000);

    return () => clearInterval(intervalId);
  });

  const isToday = format(dayStart, 'MM dd yyyy') === format(date, 'MM dd yyyy');

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {isToday && dataHour === hour ? (
        <div className="red-line" style={{ top: minutes }}></div>
      ) : null}

      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(dateFrom.getMinutes())}`;

        const eventEnd = `${dateTo.getHours()}:${formatMins(dateTo.getMinutes())}`;

        return (
          <Event
            key={id}
            id={id}
            title={title}
            onDeleteEvent={onDeleteEvent}
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
  onDeleteEvent: PropTypes.func.isRequired,
};

export default Hour;
