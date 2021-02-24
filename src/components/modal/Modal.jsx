import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format, addMinutes } from 'date-fns';

import { createEvent } from '../../gateway/events';
import { getDateTime } from '../../utils/dateUtils';
import './modal.scss';

const Modal = ({ setModalVisible, fetchEvents }) => {
  const [eventForm, setEventForm] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: format(new Date(), 'HH:mm'),
    endTime: format(addMinutes(new Date(), 15), 'HH:mm'),
    description: '',
  });
  
  const { title, date, startTime, endTime, description } = eventForm;

  const handleSubmit = event => {
    event.preventDefault();

    const newEvent = {
      title,
      dateFrom: getDateTime(date, startTime),
      dateTo: getDateTime(date, endTime),
      description,
    };

    createEvent(newEvent).then(() => fetchEvents());
    setModalVisible(false);
  };

  const updateFormInput = e => {
    setEventForm({
      ...eventForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={() => setModalVisible(false)}>
            +
          </button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              onChange={updateFormInput}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={date}
                onChange={updateFormInput}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={startTime}
                onChange={updateFormInput}
                required
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={endTime}
                onChange={updateFormInput}
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={updateFormInput}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

export default Modal;
