"use strict";
var daySelected = false;
var currentSelectedDay = null;
var currentMonth;
var currentDay;

class Month {
    //constructs a set of days for each month 
    constructor() { 
    this.days = [];
    this.lastDay;
    this.firstDay;
    this.container = document.createElement("div");
    this.container.style.width = "100%";
    this.container.style.height = "600px";
    this.container.style.display = "grid";
    this.container.style.gridTemplateColumns = "repeat(7,14.28%)";
    this.container.style.gridTemplateRows = "repeat(6,17%)";
    this.container.style.gridRowGap = "5px";

    var index = 0;
    for (var i = 0; i < 6; i++) {
        for (var k = 0; k < 7; k++) {
            this.days.push(new CalenderDay(k, index, this.container));
            index++;
        }
     }

    setDates(this);
    
    var time = new Date();
    if (currentMonthNr == Date.getMonth) {
        currentSelectedDay = this.days[time.getDate()];
    }

    //remove the innerHTML if a day is not part of the current month
    for (var i = 0; i < this.days.length; i++) {
        if (this.days[i].date == -1) {
                this.days[i].dayContainer.innerHTML = "";
            }
        }
    }
}

class CalenderDay {
    constructor(day, id, container) {
        this.todaysEvents = [];
        this.isSelected = false;
        this.day = day;
        this.dayName = getDayName(this.day);
        this.date = -1;

        this.dayContainer = document.createElement("div");
        this.dayContainer.className = "day";
        this.dayContainer.id = id;
        this.dayContainer.style.width = "100%";
        this.dayContainer.style.height = "100%";
        this.dayContainer.style.borderBottom = "solid";

        this.dayContainer.onclick = this.selectDay;

        var h1 = document.createElement("h1");
        if (this.date > 0) {
            h1.textContent = this.dayName + " " + this.date;
        }
        else {
            h1.textContent = this.dayName;
        }
        h1.style.fontSize = "15px";
        h1.style.textAlign = "center";
        this.dayContainer.appendChild(h1);
        container.appendChild(this.dayContainer);
    }

    // the onclick for a calenderDay
    selectDay() {
        var time = new Date();
        // we dont allow the user to select a day outside ofthe current month
        if (currentMonth.days[this.id].date == -1) {
            return;
        }

        //If a day has been selected before we revert the style of that day before uppdating selected day
        if (daySelected) {
            currentSelectedDay.isSelected = false;
            if (currentSelectedDay.id == time.getDate() && currentMonthNr == time.getMonth()) {
                document.getElementById(currentSelectedDay.id).style.backgroundColor = "orange";
                currentDay = currentSelectedDay;
            }
            else {
                document.getElementById(currentSelectedDay.id).style.backgroundColor = "white";
            }
            currentSelectedDay = this;
            this.isSelected = true;
            document.getElementById(this.id).style.backgroundColor = "red";
        }
        else {
            this.isSelected = true;
            daySelected = true;
            currentSelectedDay = this;
            document.getElementById(this.id).style.backgroundColor = "red";
        }
        // load the events of the new new selected day into the global events array 
        events = Object.assign([], currentSelectedDay.todaysEvents);
        uppdateSelectedDay(currentSelectedDay.id, currentMonth);
        
        uppdateEvents();
    }
}

//uppdates what is being displayed on the calender
function uppdateEventsCalendarDay(month) {

    //we are removing everything from each calenderDay and replacing it
    for (var i = 0; i < month.days.length; i++) {
        if (month.days[i].dayContainer.id == currentSelectedDay.id) {
            month.days[i].dayContainer.innerHTML = "";
            var h1 = document.createElement("h1");
            h1.style.fontSize = "15px";
            h1.style.textAlign = "center";
            month.days[i].dayContainer.appendChild(h1);
            if (month.days[i].date > 0) {
                h1.textContent = month.days[i].dayName + " " + month.days[i].date;
            }
            else {
                h1.textContent = month.days[i].dayName;            
            }
            // The first 3 events (by time) gets displayed in the calender if they have a caption and/or a time
            for (var k = 0; k < events.length && k < 3; k++) {
                if (events[k].time != "" || events[k].caption != "" || events[k].notes != "") {

                    if (events[k].time != "" || events[k].caption != "") {
                        var tempText = document.createElement("p");

                        if (events[k].caption.length > 10) {
                            tempText.textContent = events[k].time + " " + events[k].caption.substring(0,7)+"...";
                        }
                        else {
                            tempText.textContent = events[k].time + " " + events[k].caption;
                        }
                        tempText.style.fontSize = "15px";
                        tempText.style.textAlign = "center";
                        tempText.style.height = "5px";
                        tempText.style.marginTop = "5px";
                        month.days[i].dayContainer.appendChild(tempText);
                    }
                }
            }
        }
    }
}

// gives the name of a day based on a number
function getDayName(d) {
    switch (d) {
        case 0:
            return "Monday";
            break;
        case 1:
            return "Tuesday";
            break;
        case 2:
            return "Wednesday";
            break;
        case 3:
            return "Thursday";
            break;
        case 4:
            return "Friday";
            break;
        case 5:
            return "Saturday";
            break;
        case 6:
            return "Sunday";
            break;
        default:
    }
}

// matches dates with a calenderDay
function setDates(month) {
    var time = new Date();
    var searchdate = time.getDate();
    var today = time.getDay();

    // index is the calenderDay in days[] that we start assigning dates from
    var index = 0;

    // for the first month we also set a background color for todays date
    if (first) {
        while (index < month.days.length) {
            if (index >= searchdate && month.days[index].day == ((today - 1) % 7) && currentMonthNr == time.getMonth()) {
                month.days[index].dayContainer.style.backgroundColor = "orange";
                break;
            }
            index++;
        }
        first = false;
    }
    else {
        //if "moving forward"
        if (F) {
            //find the first calenderDay with a index >= searchdate and a matching weekday
            //since we are moving one month forward we lock for the first calendarDay,
            //with the weekday following the last day of the previous month
            F = false;
            searchdate = 1;
            today = monthManager.months[monthManager.currentMonthIndex - 1].lastDay + 1;
            while (index < month.days.length) {
                if (index >= searchdate && month.days[index].day == (today)% 7) {
                    break;
                }
                index++;
            }
        }
        else {
            //same as above but based on the first day of the month coming after
            searchdate = findMaxDays(currentMonthNr);
            today = monthManager.months[monthManager.currentMonthIndex + 1].firstDay - 1;
            while (index < month.days.length) {
                if (index >= searchdate && month.days[index].day == today % 7) {
                    break;
                }
                index++;
            }
        }
    }
    currentSelectedDay = month.days[index];
    assignDates(index, searchdate,month);
}

function assignDates(index, date, month) {
    var date2 = date;
    var i = index;

    // iterate through days[] and give each day a date
    //for the first month we potentially need to go both backwards and forwards to fill in all dates
    if (date != 1) {
        while (date >= 1) {
            month.days[i].date = date;
            date--;
            month.firstDay = month.days[i].day;
            i--;
        }
    }
    else {
        //do nothing
    }

    // iterate through days[] and give each day a date
    date = date2;
    var maxDays = findMaxDays(currentMonthNr);
    i = index;
    while (date <= maxDays) {
        month.days[i].date = date;
        date++;
        month.lastDay = month.days[i].day;
        i++;
    }

    //set the name of each day together with the date
    for (var k = 0; k < month.days.length; k++) {
        month.days[k].dayContainer.innerHTML = "";
        var h1 = document.createElement("h1");

        if (month.days[k].date > 0) {
            h1.textContent = month.days[k].dayName + " " + month.days[k].date;
        }
        else {
            // do nothing
        }
        h1.style.fontSize = "15px";
        h1.style.textAlign = "center";
        month.days[k].dayContainer.appendChild(h1);
    }
}

//returns the number of days in each month
function findMaxDays(m) {
    switch (m) {
        case 0:
            return 31;
            break;
        case 1:
            return isLeapYear();
            break;
        case 2:
            return 31;
            break;
        case 3:
            return 30;
            break;
        case 4:
            return 31;
            break;
        case 5:
            return 30;
            break;
        case 6:
            return 31;
            break;
        case 7:
            return 31;
            break;
        case 8:
            return 30;
            break;
        case 9:
            return 31;
            break;
        case 10:
            return 30;
            break;
        case 11:
            return 31;
            break;


        default:
        // code block
    }
}

//returns the number of days in feb depending on if it is a leap year or not
function isLeapYear() {
    if (currentYear % 4 == 0) {
        return 29;
    }
    else {
        return 28;
    }
}

