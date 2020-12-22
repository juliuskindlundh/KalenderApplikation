"use strict";

var masterDiv;
var subDiv1;
var subDiv2;
var monthManager;
var first = true;

class Page {
    constructor() {

        //Create the major components and add their html components to document
        masterDiv = document.createElement("div");
        subDiv1 = document.createElement("div");
        subDiv2 = document.createElement("div");

        masterDiv.style.display = "flex";
        masterDiv.style.flexDirection = "column";

        var head = createHeader();
        masterDiv.appendChild(head);

        masterDiv.appendChild(subDiv1);
        subDiv1.style.display = "flex";
        subDiv1.style.flexDirection = "row";

        monthManager = new MonthManager();
        subDiv2.appendChild(monthManager.months[0].container);
        subDiv1.appendChild(subDiv2);
        subDiv2.style.width = "70%";

        var side = createSidebar();
        subDiv1.appendChild(side);
        document.body.appendChild(masterDiv);
    }
}

function init() {
    var page = new Page();
}

window.addEventListener('DOMContentLoaded', (event) => {
    init();
});

