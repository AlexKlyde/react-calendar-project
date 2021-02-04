import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/Modal';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import { fetchEventsList, deleteEvent } from '../../gateway/events';
import './calendar.scss';

const Calendar = ({ weekDates, isModalVisible, setModalVisible }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    handleFetchEvents();
  }, []);

  const handleFetchEvents = () => {
    fetchEventsList()
      .then(events => setEvents(events))
      .catch(error => alert(error.message));
  };

  const handleDeleteEvent = id => {
    deleteEvent(id)
      .then(() => handleFetchEvents())
      .catch(error => alert(error.message));
  };

  return (
    <>
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week weekDates={weekDates} events={events} deleteEvent={handleDeleteEvent} />
          </div>
        </div>
      </section>
      {isModalVisible && (
        <Modal setModalVisible={setModalVisible} fetchEvents={handleFetchEvents} />
      )}
    </>
  );
};

Calendar.propTypes = {
  weekDates: PropTypes.array.isRequired,
  isModalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func.isRequired,
};

export default Calendar;
