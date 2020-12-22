"use strict"

var headerContainer;
var h1header;
var back;
var forward;
var Ctime = new Date();
var currentMonthNr = Ctime.getMonth();
var currentYear = Ctime.getFullYear();

class HeaderContainer{

    constructor() {
        headerContainer = document.createElement("div");
        headerContainer.style.display = "flex";
        headerContainer.style.flexDirection = "row";

        //create a forward and backwards button
        back = document.createElement("div");
        this.btnback = document.createElement("button");
        this.btnback.textContent = "<<<";
        this.btnback.style.marginTop = "30px";
        this.btnback.style.marginRight = "30px";
        back.appendChild(this.btnback);

        forward = document.createElement("div");
        this.btnforward = document.createElement("button");
        this.btnforward.textContent = ">>>";
        this.btnforward.style.marginTop = "30px";
        this.btnforward.style.marginLeft = "30px";
        forward.appendChild(this.btnforward);

        h1header = document.createElement("h1");
        h1header.textContent = getMonthName(currentMonthNr) + " " + currentYear;
        headerContainer.style.justifyContent = "center";

        headerContainer.appendChild(back);
        headerContainer.appendChild(h1header);
        headerContainer.appendChild(forward);

        //set the onClick methods
        back.onclick = this.backOnClick;
        forward.onclick = this.forwardOnClick;
    }


    forwardOnClick() {
        //if a day is selected reset its style
        if (currentSelectedDay != null && currentSelectedDay.id != null) {
            document.getElementById(currentSelectedDay.id).style.backgroundColor = "white";
        }
        //increment currentmonthNr and uppdate cyrrent year if needed
        currentMonthNr++;
        if (currentMonthNr == 12) {
            currentMonthNr = 0;
            currentYear++;
        }
        monthManager.moveForward();
        uppdateHeader();
        uppdateSelectedDay();
    }

    backOnClick() {
        if (currentSelectedDay && currentSelectedDay.id != null) {
            document.getElementById(currentSelectedDay.id).style.backgroundColor = "white";
        }
        currentMonthNr--;
        if (currentMonthNr == -1) {
            currentMonthNr = 11;
            currentYear--;
        }
        monthManager.moveBack();
        uppdateHeader();
        uppdateSelectedDay();
    }
}

//uppdate the value of the header so that current month and year is displayed
function uppdateHeader() {
    h1header.textContent = getMonthName(currentMonthNr) + " " + currentYear;
}

//gets the name of a month based on a number
function getMonthName(m) {
    switch (m) {
        case 0:
            return "January";
            break;
        case 1:
            return "February";
            break;
        case 2:
            return "March";
            break;
        case 3:
            return "April";
            break;
        case 4:
            return "May";
            break;
        case 5:
            return "June";
            break;
        case 6:
            return "July";
            break;
        case 7:
            return "August";
            break;
        case 8:
            return "September";
            break;
        case 9:
            return "October";
            break;
        case 10:
            return "November";
            break;
        case 11:
            return "December";
            break;
        default:
    }
}

function createHeader() {
    var temp = new HeaderContainer();
    return headerContainer;
}