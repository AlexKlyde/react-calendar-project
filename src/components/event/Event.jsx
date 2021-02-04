import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './event.scss';

const Event = ({ height, marginTop, id, title, time, deleteEvent }) => {
  const [isVisibleDeleteBtn, toggleDeleteBtn] = useState(false);

  const eventStyle = {
    height,
    marginTop,
  };

  return (
    <div className="event" style={eventStyle} onClick={() => toggleDeleteBtn(!isVisibleDeleteBtn)}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {isVisibleDeleteBtn && (
        <button className="delete-event-btn" onClick={() => deleteEvent(id)}>
          +
        </button>
      )}
    </div>
  );
};

Event.propTypes = {
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

export default Event;
