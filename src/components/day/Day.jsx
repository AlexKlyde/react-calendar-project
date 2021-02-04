import React from 'react';
import PropTypes from 'prop-types';

import Hour from '../hour/Hour';

import './day.scss';

const Day = ({ dataDay, dayStart, dayEvents, deleteEvent }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map(hour => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(event => event.dateFrom.getHours() === hour);

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            deleteEvent={deleteEvent}
            dayStart={dayStart}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dayStart: PropTypes.instanceOf(Date).isRequired,
  dayEvents: PropTypes.array.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

export default Day;
