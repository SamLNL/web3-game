"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var r=[],a=!0,n=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(a=(l=i.next()).done)&&(r.push(l.value),!t||r.length!==t);a=!0);}catch(d){n=!0,o=d}finally{try{a||null==i["return"]||i["return"]()}finally{if(n)throw o}}return r}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function initiateAgenda(e){var t=e,r=e.data(),a=r.overlapThreshold,n=r.locale,o=r.firstDayOfWeek,l=r.currentDay;t.fullCalendar({now:l,defaultDate:l,defaultView:t.data("view"),nextDayThreshold:"0"+a+":00:01",fixedWeekCount:!1,eventLimit:3,lang:n,views:viewSpecificOptions,firstDay:o,height:500,scrollTime:moment().format("HH:mm:ss"),eventClick:eventClick,eventRender:function(e,t){if(e.allDay&&t.addClass("fc-event-all-day"),e.end){if(e.multiDay||e.allDay)t.addClass("fc-event-multi-day");else{t.addClass("fc-event-single-day");var r=$("<span />").addClass("fc-color-icon").css("background-color",e.backgroundColor).css("border-color",e.borderColor);$(".fc-content",t).prepend(r)}e.enabled||t.addClass("fc-event-disabled"),t.addClass("fc-color-"+e.textColor)}},events:function(e,r,a,n){$.ajax({url:Craft.getCpUrl("calendar/month"),data:_defineProperty({rangeStart:e.toISOString(),rangeEnd:r.toISOString(),nonEditable:!0,calendars:t.data("calendars"),siteId:t.data("siteId")},Craft.csrfTokenName,Craft.csrfTokenValue),type:"post",dataType:"json",success:function(e){var t=!0,r=!1,a=void 0;try{for(var o,l=e.entries()[Symbol.iterator]();!(t=(o=l.next()).done);t=!0){var i=_slicedToArray(o.value,2),d=i[0],c=i[1];c.allDay&&(e[d].end=moment(c.end).add(2,"s").utc().format()),e[d].editable=!1}}catch(s){r=!0,a=s}finally{try{t||null==l["return"]||l["return"]()}finally{if(r)throw a}}n(e)}})},customButtons:{refresh:{text:Craft.t("calendar","Refresh"),click:function(){t.fullCalendar("refetchEvents")}}},header:{right:"prev,today,next",left:"title"}})}var viewSpecificOptions={week:{columnFormat:"ddd D",timeFormat:"LT",slotLabelFormat:"LT"},day:{columnFormat:"",timeFormat:"LT",slotLabelFormat:"LT"}};