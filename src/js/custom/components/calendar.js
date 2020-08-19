/* global FullCalendar */

let calendar, calendarEl, prevButton, nextButton, todayButton, datepicker;


function getTwoNumeric(int) {
  int = int.toString();
  if (int.length === 1) {
    return ('0' + int);
  }
  return int;
}

function changeDatepicker(selectedDate) {
  datepicker.value = (selectedDate.getFullYear() + '-' +
    getTwoNumeric(selectedDate.getMonth() + 1) + '-' +
    getTwoNumeric(selectedDate.getDate()));
}

function runAnimation() {
  if(calendarEl){
    let timegrid = calendarEl.querySelector('.fc-timegrid');
    timegrid.classList.add('hide');

    setTimeout(() => {
      timegrid.classList.remove('hide');
    }, 500);
  }
}

(function() {
  calendarEl = document.querySelector('.js-calendar');
  let timezone = calendarEl.getAttribute('data-timezone');

  calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      start: '',
      right: 'prev,today,next',
    },
    height: 'auto',
    allDaySlot: false,
    slotMinTime: '07:00:00',
    slotMaxTime: '19:00:00',
    initialView: 'resourceTimeGridDay',
    themeSystem: 'bootstrap',
    timeZone: timezone,
    schedulerLicenseKey: '0951498686-fcs-1595515022',
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      hour12: false,
    },
    locale: 'nl',
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      hour12: false,
    },
    resources: {
      url: '/fullcalendar-calendars',
    },
    events: '/fullcalendar-events',
    timeFormat: 'H(:mm)'
  });

  calendar.render();

  datepicker = document.querySelector('.js-calendar-datepicker');

  if(datepicker) {
    datepicker.addEventListener('change', () => {

      let dateValue = datepicker.value;
      calendar.gotoDate(new Date(dateValue));
      runAnimation();
      datepicker.blur();
    });
  }

  nextButton = calendarEl.querySelector('.fc-next-button');
  prevButton = calendarEl.querySelector('.fc-prev-button');
  todayButton = calendarEl.querySelector('.fc-today-button');

  nextButton.addEventListener('click', () => {
    let date = calendar.getDate();
    changeDatepicker(date);
    runAnimation();
    nextButton.blur();
  });

  todayButton.addEventListener('click', () => {
    let date = calendar.getDate();
    changeDatepicker(date);
    runAnimation();
    todayButton.blur();
  });

  prevButton.addEventListener('click', () => {
    let date = calendar.getDate();
    changeDatepicker(date);
    runAnimation();
    prevButton.blur();
  });
})();
