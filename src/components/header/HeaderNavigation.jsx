import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const HeaderNavigation = ({ todayWeek, prevWeek, nextWeek, weekDates }) => {
  const currentMonth = format(weekDates[0], 'MMMM');
  const nextMonth = format(weekDates[weekDates.length - 1], 'MMMM');
  const displayCurrentMonth =
    currentMonth === nextMonth ? currentMonth : `${currentMonth} - ${nextMonth}`;

  return (
    <div className="navigation">
      <button className="navigation__today-btn button" onClick={todayWeek}>
        Today
      </button>
      <button className="icon-button navigation__nav-icon" onClick={prevWeek}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="icon-button navigation__nav-icon" onClick={nextWeek}>
        <i className="fas fa-chevron-right"></i>
      </button>
      <span className="navigation__displayed-month">{displayCurrentMonth}</span>
    </div>
  );
};

HeaderNavigation.propTypes = {
  prevWeek: PropTypes.func.isRequired,
  nextWeek: PropTypes.func.isRequired,
  todayWeek: PropTypes.func.isRequired,
  weekDates: PropTypes.array.isRequired,
};

export default HeaderNavigation;
