"use strict";

var SidbarContainer;
var sideBarContent;
var eventsContainer;
var h1Side;
var events = [];
var time;
var caption;
var notes;

class SidebarContainer{

    constructor() {

        //create the sidebar, all its components and set some style
        SidbarContainer = document.createElement("div");
        SidbarContainer.style.width = "30%";
        SidbarContainer.style.height = "600px";
        SidbarContainer.style.marginLeft = "10px";
        SidbarContainer.style.borderRight = "solid";
        SidbarContainer.style.borderLeft = "solid";

        SidbarContainer.style.display = "flex";
        SidbarContainer.style.flexDirection = "column";

        h1Side = document.createElement("h1");
        h1Side.style.textAlign = "center";
        h1Side.style.borderBottom = "solid";
        h1Side.style.maxHeight = "50px";
        h1Side.textContent = currentSelectedDay.dayName + " " + currentSelectedDay.date;
        SidbarContainer.appendChild(h1Side);    

        sideBarContent = document.createElement("div");
        eventsContainer = document.createElement("div");
        eventsContainer.style.height = "350px";
        eventsContainer.style.overflowY = "scroll";
        sideBarContent.appendChild(eventsContainer);
        uppdateEvents();

        var form = document.createElement("form");
        form.style.display = "flex";
        form.style.flexDirection = "column";
        form.style.borderTop = "solid";

        time = document.createElement("input");
        time.setAttribute("type", "time");
        time.style.width = "62%";
        time.style.margin = "auto";
        time.style.marginTop = "10px";
        
        caption= document.createElement("input");
        caption.setAttribute("type", "text");
        caption.setAttribute("placeholder", "caption...");
        caption.style.maxWidth = "80%";
        caption.style.margin = "auto";
        caption.style.marginTop = "10px";
        caption.setAttribute("maxlength","21");
       
        notes = document.createElement("textarea");
        notes.setAttribute("type", "textField");
        notes.setAttribute("placeholder", "notes...");
        notes.setAttribute("rows", "5");
        notes.setAttribute("columns","30");
        notes.style.maxWidth = "80%";
        notes.style.margin = "auto";
        notes.style.marginTop = "10px";

        var add = document.createElement("input");
        add.setAttribute("type", "button");
        add.setAttribute("Value","Add");
        add.style.maxWidth = "80%";
        add.style.margin = "auto";
        add.style.marginTop = "10px";
        add.onclick = this.addEvent;

        form.appendChild(time);
        form.appendChild(caption);
        form.appendChild(notes);
        form.appendChild(add);
        sideBarContent.appendChild(form);
        SidbarContainer.appendChild(sideBarContent);
    }

    // if a day has been selected add a new event to the events array and copy it to the selectedDays own events array
    //then call the uppdateEvents function the uppdate what is being displayed on the screen.
    addEvent() {     
        if (currentSelectedDay != null) {
            events.push(new event(time.value, caption.value, notes.value));
            currentSelectedDay.todaysEvents = Object.assign([], events);
        }
        uppdateEvents();
    }
}

// class to hold all the data a "event" needs to hold
class event {
    constructor(time,caption,notes) {
        this.time = time;
        this.caption = caption;
        this.notes = notes;
    }
}

function uppdateEvents() {
    //sort the events array and empty the eventsContainer
    events.sort(eventComparator);
    eventsContainer.innerHTML = "";

    //if no day is selected return
    if (currentSelectedDay == null) {
        return;
    }

    //add all the events to the eventsContainer
    for (var i = 0; i < events.length; i++) {
        if (events[i].time != "" || events[i].caption != "" || events[i].notes != "") {
            var temp = document.createElement("div");
            temp.style.display = "flex";
            temp.style.flexDirection = "column";
            temp.style.borderBottom = "solid";
            temp.style.borderColor = "gray";


            if (events[i].time != "" || events[i].caption != "" ) {
                var temph3 = document.createElement("h3");
                temph3.textContent = events[i].time + " " + events[i].caption;
                temph3.style.textAlign = "center";
                temph3.style.marginTop = "5px";
                temph3.style.marginBottom = "5px";
                temp.appendChild(temph3);
            }

            if (events[i].notes != "") {
                var tempp = document.createElement("p");
                tempp.textContent = events[i].notes;
                tempp.style.maxWidth = "90%";
                tempp.style.marginTop = "5px";
                temp.appendChild(tempp);
            }
            temp.style.maxHeight = "20px;";
            temp.style.margin = "1px";
            eventsContainer.appendChild(temp);
        }
    }

    uppdateEventsCalendarDay(currentMonth);
}

// Comparator for the events class, return value based on events time
function eventComparator(e1, e2) {
    var sub1 = parseInt(e1.time.substring(0, 2));
    var sub2 = parseInt(e1.time.substring(3, 5));
    var sub3 = parseInt(e2.time.substring(0, 2));
    var sub4 = parseInt(e2.time.substring(3, 5));

    if (isNaN(sub1) || isNaN(sub2)) {
        return 1;
    }

    if (sub1 > sub3) {
        return 1;
    }
    else if (sub1 == sub3 && sub2 > sub4) {
        return 1;
    }
    else {
        return -1;
    }
}

//uppdates the day and date being displayed on the sidebar
function uppdateSelectedDay(d, month) {
    if (currentSelectedDay != null && month.days[d].date != -1) {
        h1Side.textContent = getDayName(d % 7) + " " + month.days[d].date;
    }
    else {
        h1Side.textContent = "...";
    }
}

function createSidebar() {
    let temp = new SidebarContainer();
    return SidbarContainer;
}
