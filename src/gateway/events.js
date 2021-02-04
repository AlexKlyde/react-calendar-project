const baseUrl = "https://5ff9ad2b17386d0017b51ffd.mockapi.io/api/v1/calendar";

export const createEvent = (events) =>
  fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(events),
  });

export const fetchEventsList = () =>
  fetch(baseUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Internal Server Error. Can't display events");
      }
      return res.json();
    })
    .then((events) =>
      events.map(({ _id, dateFrom, dateTo, ...task }) => ({
        id: _id,
        dateFrom: new Date(dateFrom),
        dateTo: new Date(dateTo),
        ...task,
      }))
    );

export const deleteEvent = id =>
  fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  }).then(res => {
    if (!res.ok) {
      throw new Error('Failed to delete task');
    }
  });

/* const events = [
    {
        id: 1,
        title: 'Go to the gym',
        description: 'some text here',
        dateFrom: new Date(2020, 8, 15, 10, 15),
        dateTo: new Date(2020, 8, 15, 15, 0),
    },
    {
        id: 2,
        title: 'Go to the school',
        description: 'hello, 2 am',
        dateFrom: new Date(2020, 8, 16, 10, 15),
        dateTo: new Date(2020, 8, 16, 11, 0),
    },
    {
        id: 3,
        title: 'Lunch',
        description: '',
        dateFrom: new Date(2020, 8, 17, 10, 30),
        dateTo: new Date(2020, 8, 17, 11, 30),
    },
    {
        id: 4,
        title: 'Meet friend',
        description: 'at the cafe',
        dateFrom: new Date(2020, 8, 25, 10, 30),
        dateTo: new Date(2020, 8, 25, 11, 0),
    }
] */

// export default events;
