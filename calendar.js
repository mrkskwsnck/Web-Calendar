/* Clears the month. */
function clearMonth() {
    var tdElements = document.getElementsByTagName('td');
    var thElements = document.getElementsByTagName('th');
    var blank = '&nbsp;';

    for (var i = 0; i < tdElements.length; i++)
        tdElements[i].innerHTML = blank;
    for (var i = thElements.length - 1; i != thElements.length - 7; i--)
        thElements[i].innerHTML = blank;
}

/* Function to fill a month. */
function fillMonth() {
    var date = getYearAndMonth();
    var tmpDate1 = new Date();
    var today = new Date(tmpDate1.getFullYear(), tmpDate1.getMonth(), tmpDate1.getDate());
    today.setFullYear(tmpDate1.getFullYear());

    var monthNames = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

    var thElements = document.getElementsByTagName('th');
    thElements[0].innerHTML = monthNames[date.getMonth()];
    thElements[1].innerHTML = date.getFullYear();

    var tdElements = document.getElementsByTagName('td');

	/* Clear CSS class attribute of each TD Element */
	for (var i = 0; i < tdElements.length; i++) {
		tdElements[i].className = '';
	}
	// --

    var firstWeekdayOfMonth = date.getDay();
    if (firstWeekdayOfMonth == 0)
        firstWeekdayOfMonth = 6;
    else
        firstWeekdayOfMonth -= 1;
    var dayCountDifference = firstWeekdayOfMonth - 1;

    for (var i = firstWeekdayOfMonth; i <= getDaysInMonth(date) + dayCountDifference; i++) {
        var monthDay = i - dayCountDifference;
        var tmpDate2 = new Date(date.getFullYear(), date.getMonth(), monthDay);
        tmpDate2.setFullYear(date.getFullYear());

        tdElements[i].innerHTML = monthDay;

        if (!(tmpDate2 < today) && !(tmpDate2 > today)) {
            tdElements[i].className = 'today';
        }
        else {
            if (tdElements[i].className == 'today') {
                if (i % 2 == 0)
                    tdElements[i].className = 'odd';
                else
                    tdElements[i].className = 'even';
            }
        }
    }

    setCalendarWeeks();
}

/* Function to set the current year and month in the form. */
function setYearAndMonth(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var calendar = document.getElementById("calendar");
    calendar.year.value = year;
    calendar.month.value = month;
}

/* Function to get the current year and month from the form. */
function getYearAndMonth() {
	var calendar = document.getElementById("calendar");
    var year = calendar.year.value;
    var month = calendar.month.value;
    var tmpDate = new Date(year, month);
    tmpDate.setFullYear(year);
    return tmpDate;
}

/* Decrements the month of calendar. */
function decrementMonth() {
    var date = getYearAndMonth();
    var year = date.getFullYear();
    var month = date.getMonth();

    if (month == 0) {
        year--;
        month = 11;
    }
    else {
        month--;
    }

	var tmpDate = new Date(year, month);
	tmpDate.setFullYear(year);
    setYearAndMonth(tmpDate);
}

/* Increments the month of calendar. */
function incrementMonth() {
    var date = getYearAndMonth();
    var year = date.getFullYear();
    var month = date.getMonth();

    if (month == 11) {
        year++;
        month = 0;
    }
    else {
        month++;
    }

	var tmpDate = new Date(year, month);
	tmpDate.setFullYear(year);
    setYearAndMonth(tmpDate);
}

/* Shifts the month of calendar to left. */
function shiftMonthLeft() {
    decrementMonth();
    clearMonth()
    fillMonth();
}

/* Shifts the month of calendar to right. */
function shiftMonthRight() {
    incrementMonth();
    clearMonth()
    fillMonth();
}

/* Shifts the year of calendar to left. */
function shiftYearLeft() {
    for (var i = 0; i < 12; i++)
        decrementMonth();
    clearMonth()
    fillMonth();
}

/* Shifts the year of calendar to right. */
function shiftYearRight() {
    for (var i = 0; i < 12; i++)
        incrementMonth();
    clearMonth()
    fillMonth();
}

/* Sets the calendar week for each week of month. */
function setCalendarWeeks() {
    var date = getYearAndMonth();
    var tdElements = document.getElementsByTagName('td');
    var thElements = document.getElementsByTagName("tbody")[0].getElementsByTagName("th");

    for (var i = 6, k = 1; i < tdElements.length; i += 7, k++) {
        var dayInMonth = tdElements[i].innerHTML;
        if (!isNaN(dayInMonth) && dayInMonth > 0) // Opera sucks a lot!
        {
        	var tmpDate = new Date(date.getFullYear(), date.getMonth(), dayInMonth);
        	tmpDate.setFullYear(date.getFullYear());
            thElements[i - 6 * k].innerHTML = getCalendarWeek(tmpDate);
        }
        else {
            for (var j = tdElements[i].previousSibling; j != null; j = j.previousSibling) {
                dayInMonth = j.innerHTML;
		        if (!isNaN(dayInMonth) && dayInMonth > 0) // Opera sucks a lot!
		        {
			        var tmpDate = new Date(date.getFullYear(), date.getMonth(), dayInMonth);
		        	tmpDate.setFullYear(date.getFullYear());
		            thElements[i - 6 * k].innerHTML = getCalendarWeek(tmpDate);
                    break;
                }
            }
        }
    }
}

/* Prompt for the input of a year number (negative allowed). */
function promptForYear() {
    var year = window.prompt('Year?');
    
    if(year == null)
    {
    	// Nothing to do
    }
    else if (isNaN(parseInt(year)))
    {
    	alert("Not an integer number!");
    }
    else {
        var date = getYearAndMonth();
        var month = date.getMonth();
        var tmpDate = new Date(year, month);
        tmpDate.setFullYear(year);
        
        setYearAndMonth(tmpDate);
        clearMonth();
        fillMonth();
    }
}

/* Function to be executed by the onload event of the body tag element. */
function load() {
    var date = new Date();
    setYearAndMonth(date);
    fillMonth();
}
