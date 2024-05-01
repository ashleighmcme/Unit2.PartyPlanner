//A user enters the website and finds a list of the names, dates, 
/* times, locations, and descriptions of all the parties that are happening. 
Next to each party in the list is a delete button. The user clicks the 
delete button for one of the parties. That party is then removed from the 
list. There is also a form that allows the user to enter information about 
a new party that they want to schedule. After filling out the form and 
submitting it, the user observes their party added to the list of parties. */


//create cohortName
const cohortName = "2402-ftb-mt-pt";

// create API_URL-done
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohortName}/events`;

//URL to add to
/* const ADD_EVENT_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohortName}/events`; */

// build framework for testing purposes
const state = {
    events: [],
  };

  const eventList = document.querySelector("#events");
  


  


  function renderEvents() {
    const eventListContainer = document.getElementById('events');
            eventListContainer.innerHTML = '';
    const eventsList = createEventsList(state.events);
            eventListContainer.appendChild(eventsList);
          }

    // don't forget you have to create a function before you can call 
    //it in an async function.

  async function render() {
    await getEvents();
    renderEvents();
  }
  render();

  //fetch the api with https://fsa-crud-2aa9294fe819.herokuapp.com/api/2403-ftb-mt-pt/events
  async function getEvents() {
    try {
      const response= await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const json= await response.json();
      state.events = json.data; //this is checking state to see if its successful
      console.log (state.events);
      renderEvents();
    } catch (e) {
      console.error ('Failed to get events', e.message);
      }
  }

  function createEventsList(events) {
    const ul = document.createElement('ul');
    ul.id = 'event_list';
    //you have to use event_list so that you can show event details.
  
    events.forEach((event) => {
      const li = document.createElement('li');
      li.classList.add('event-item');
  
      const eventName = document.createElement('h3');
      eventName.textContent = event.name;
      li.appendChild(eventName);
      //create style to make name a different color
  
      const eventDate = document.createElement('p');
      eventDate.textContent = `Date: ${formatDate(event.date)}`; 
      li.appendChild(eventDate);
      
  
      const eventTime = document.createElement('p');
      eventTime.textContent = `Time: ${formatTime(event.date)}`; 
      li.appendChild(eventTime);
      //will need to create function to format date from the API that shows date and time together.
  
      const eventLocation = document.createElement('p');
      eventLocation.textContent = `Location: ${event.location}`;
      li.appendChild(eventLocation);
  
      const eventDescription = document.createElement('p');
      eventDescription.textContent = `Description: ${event.description}`;
      li.appendChild(eventDescription);

      const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteEvent(event.id); // Call deleteEvent function with event ID
    });
    li.appendChild(deleteButton);

    ul.appendChild(li);
  });

  return ul;
}
  //create css to make these cards.
  //Date Function:
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
  
  //Time Function:
  function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }
  
  

function renderEvents() {
  const eventListContainer = document.getElementById('events');

  eventListContainer.innerHTML = '';//clears previous inputs

  const eventsList = createEventsList(state.events);
  eventListContainer.appendChild(eventsList);
}

getEvents();
 
//do NOT put this async function in the body of createEventsList
async function deleteEvent(eventId) {
    try {
      const response = await fetch(`${API_URL}/${eventId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      await getEvents(); //this will give you the new list.
    } catch (error) {
      console.error('Failed to delete event:', error.message);
    }
  }
// add the party to the API silly
const addEventForm = document.querySelector("#addEvent");
  addEventForm.addEventListener("submit", async function(event) {
    event.preventDefault(); 
  
  const eventName = document.getElementById('eventName').value;
  const eventDate = document.getElementById('eventDate').value;
  /* const eventTime = document.getElementById('eventTime').value; */
  const eventLocation = document.getElementById('eventLocation').value;
  const eventDescription = document.getElementById('eventDescription').value;

  const newEvent = {
    name: eventName,
    date: new Date(eventDate).toISOString(),
    /* time: eventTime, */
    location: eventLocation,
    description: eventDescription,
  };
  console.log ('try');
  /* async function addEvent(newEvent){ */
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    });
    if (!response.ok) {
      throw new Error('Failed to add event');
    }
    alert('Your event is now on the list!');
    getEvents();
  } catch (error) {
    console.error('Failed to add event:', error.message);
  };
})
  
getEvents() 