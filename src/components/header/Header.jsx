import React from 'react';
import PropTypes from 'prop-types';

import HeaderNavigation from './HeaderNavigation';

import './header.scss';

const Header = ({ weekDates, setModalVisible, prevWeek, nextWeek, todayWeek }) => {
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={() => setModalVisible(true)}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <HeaderNavigation
        prevWeek={prevWeek}
        nextWeek={nextWeek}
        todayWeek={todayWeek}
        weekDates={weekDates}
      />
    </header>
  );
};

Header.propTypes = {
  prevWeek: PropTypes.func.isRequired,
  nextWeek: PropTypes.func.isRequired,
  todayWeek: PropTypes.func.isRequired,
  weekDates: PropTypes.array.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

export default Header;
