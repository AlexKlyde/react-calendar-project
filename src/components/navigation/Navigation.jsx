import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import { days } from '../../utils/dateUtils.js';
import './navigation.scss';

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map(dayDate => {
        const todayClassName =
          format(dayDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
            ? 'today'
            : null;

        return (
          <div key={dayDate} className={`calendar__day-label day-label ${todayClassName}`}>
            <span className="day-label__day-name ">{days[dayDate.getDay()]}</span>
            <span className="day-label__day-number">{dayDate.getDate()}</span>
          </div>
        );
      })}
    </header>
  );
};

Navigation.propTypes = {
  weekDates: PropTypes.array.isRequired,
};

export default Navigation;
