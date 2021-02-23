const baseUrl = 'https://5ff9ad2b17386d0017b51ffd.mockapi.io/api/v1/calendar';

export const createEvent = eventData =>
  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  }).then(res => {
    if (!res.ok) {
      throw new Error('Failed to create event');
    }
  });

export const fetchEventsList = () =>
  fetch(baseUrl)
    .then(res => {
      if (!res.ok) {
        throw new Error("Internal Server Error. Can't display events");
      }
      return res.json();
    })
    .then(events =>
      events.map(({ _id, dateFrom, dateTo, ...event }) => ({
        id: _id,
        dateFrom: new Date(dateFrom),
        dateTo: new Date(dateTo),
        ...event,
      })),
    );

export const deleteEvent = id =>
  fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  }).then(res => {
    if (!res.ok) {
      throw new Error('Failed to delete task');
    }
  });