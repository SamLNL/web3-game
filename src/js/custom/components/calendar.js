/* global FullCalendar */

let calendar;
let datepicker = document.querySelector('.js-calendar-datepicker');

if(datepicker){
  datepicker.addEventListener('change', () => {
    let dateValue = datepicker.value;
    calendar.gotoDate(new Date(dateValue));
  });
}

function getDropDownValue(date) {
  let day = (date.getDate()).toString();
  let month = (date.getMonth() + 1).toString();
  let year = (date.getFullYear()).toString();

  if(day.length === 1){
    day = '0' + day;
  }

  if(month.length === 1){
    month = '0' + month;
  }

  return (year + '-' + month + '-' + day);
}

function getDropDownText(date) {
  const monthNames = [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december"
  ];

  let day = date.getDate();
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();

  return (day + ' ' + month + ' ' + year);
}

function changeDatepicker(focusDate) {
  datepicker.setAttribute()

  let today = calendar.getDate();
  let amountDays = 6;

  for(let i = 0;i < amountDays;i++) {
    let opt = document.createElement('option');
    let newDate = new Date();
    newDate.setDate(today.getDate()+i);

    if(i === 0) {
      opt.selected = getDropDownValue(newDate);
    }

    opt.value = getDropDownValue(newDate);
    opt.text = getDropDownText(newDate);

    dropdown.appendChild(opt);
  }
}


(function(){
  let calendarEl = document.querySelector('.js-calendar');
  let timezone = calendarEl.getAttribute('data-timezone');
  calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      start: '',
      right: 'prev,today,next'
    },
    allDaySlot: false,
    slotMinTime: "07:00:00",
    slotMaxTime: "19:00:00",
    initialView: 'resourceTimeGridDay',
    themeSystem: 'bootstrap',
    timeZone: timezone,
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      hour12: false
    },
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      hour12: false
    },
    resources: {
      url: '/fullcalendar-calendars'
    },
    events: '/fullcalendar-events',
    timeFormat: 'H(:mm)',
    datesSet: function() {
      if(dropdown) {
        buildDaysList();
      }
    },
  });

  calendar.render();

  if(dropdown) {
    buildDaysList();
  }
})();
