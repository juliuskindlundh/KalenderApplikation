"use strict"

var F = false;

class MonthManager{
    constructor() {
        var time = new Date();
        this.months = [];
        this.currentMonthIndex = 0;
        this.currentYear = time.getFullYear();
        this.months.push(new Month());
        currentMonth = this.months[this.currentMonthIndex];
    }

    moveForward() {
        //set relevant flags & increment currentMonthIndex 
        daySelected = false;
        F = true;
        this.currentMonthIndex++;
        //if we need to create a new month we do so
        if (this.currentMonthIndex == this.months.length) {
            this.addForward();
        }
        currentMonth = this.months[this.currentMonthIndex]
        this.loadNewMonth();
    }

    moveBack() {
        daySelected = false;
        this.currentMonthIndex--;
        if (this.currentMonthIndex == -1) {
            this.addBack();
            this.currentMonthIndex++;
        }
        currentMonth = this.months[this.currentMonthIndex];
        this.loadNewMonth();
    }

    loadNewMonth() {
        currentSelectedDay = null;
        daySelected = false;
        //fetch the new calender container, remove and replace the old one
        var temp = subDiv2.querySelector("div");      
        temp = this.months[this.currentMonthIndex].container;
        subDiv2.removeChild(subDiv2.childNodes[0]);
        subDiv2.appendChild(temp);
    }

    //pushes a new month to months[]
    addForward() {
        this.months.push(new Month());
    }

    //unshifts a new month to months[]
    addBack() {
        this.months.unshift(new Month());
    }


}
