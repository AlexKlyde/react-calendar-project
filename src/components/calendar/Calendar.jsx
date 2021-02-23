import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/Modal';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import { fetchEventsList, deleteEvent } from '../../gateway/events';
import './calendar.scss';
import { format } from 'date-fns';

const Calendar = ({ weekDates, isModalVisible, setModalVisible }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetchEventsList()
      .then(events => {
        const formattedWeekDates = weekDates.map(date => format(new Date(date), 'dd-MM-yyyy'));
        const weeklyEvents = events.filter(event => {
          return formattedWeekDates.includes(format(new Date(event.dateFrom), 'dd-MM-yyyy'));
        })
        return setEvents(weeklyEvents);
      })
      .catch(error => alert(error.message));
  };

  const handleDeleteEvent = id => {
    deleteEvent(id)
      .then(() => fetchEvents())
      .catch(error => alert(error.message));
  };

  return (
    <>
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week weekDates={weekDates} events={events} onDeleteEvent={handleDeleteEvent} />
          </div>
        </div>
      </section>
      {isModalVisible && <Modal setModalVisible={setModalVisible} fetchEvents={fetchEvents} />}
    </>
  );
};

Calendar.propTypes = {
  weekDates: PropTypes.array.isRequired,
  isModalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func.isRequired,
};

export default Calendar;
