import React, { useState, useEffect } from 'react';
import {format, subWeeks, addWeeks } from 'date-fns';

import './calendar.scss';
import { fetchEventsList, deleteEvent } from '../../gateway/events';
import { getWeekStartDate, generateWeekRange } from '../../utils/dateUtils.js'

import Header from '../header/Header.jsx';
import Navigation from '../navigation/Navigation';
import Sidebar from '../sidebar/Sidebar';
import Week from '../week/Week';
import Modal from '../modal/Modal';



const Calendar = () => {
  const [startDateWeek, setStartDateWeek] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]);

  const handlePrevWeek = () => setStartDateWeek(subWeeks(startDateWeek, 1));
  const hanldeNextWeek = () => setStartDateWeek(addWeeks(startDateWeek, 1));
  const handleTodayWeek = () => setStartDateWeek(new Date());

  const weekDates = generateWeekRange(getWeekStartDate(startDateWeek));

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
      <Header
        weekDates={weekDates}
        setModalVisible={setModalVisible}
        onPrevWeek={handlePrevWeek}
        onNextWeek={hanldeNextWeek}
        onTodayWeek={handleTodayWeek}
      />
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

export default Calendar;
