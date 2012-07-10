/* Validates a year of being a leap year. 
(Thanks to: http://www.a-m-i.de/tips/datetime/datetime.php) */
function isLeapYear(date) {
    // Die Regel lautet: Alles, was durch 4 teilbar ist, ist ein Schaltjahr.
    // Es sei denn, das Jahr ist durch 100 teilbar, dann ist es keins.
    // Aber wenn es durch 400 teilbar ist, ist es doch wieder eins.

    var year = date.getFullYear();

    if ((year % 400) == 0)
        return true;
    else if ((year % 100) == 0)
        return false;
    else if ((year % 4) == 0)
        return true;

    return false;
}

/* Determines the calendar week for a given date. 
(Thanks to: http://www.a-m-i.de/tips/datetime/datetime.php) */
function getCalendarWeek(date) {

    // Berechnung erfolgt analog DIN 1355, welche besagt:
    // Der erste Donnerstag im neuen Jahr liegt immer in der KW 1.
    // "Woche" ist dabei definiert als [Mo, ..., So].

    var dayOfYear = getDayOfYear(date);

    // Berechnen des Wochentags des 1. Januar:
    var tmpDate = new Date(date.getFullYear(), 0, 1);
    tmpDate.setFullYear(date.getFullYear());
    var weekdayOf1stJanuary = tmpDate.getDay() - 1;

    // Sonderfälle Freitag und Samstag
    if (weekdayOf1stJanuary >= 4)
        weekdayOf1stJanuary -= 7;

    // Sonderfälle "Jahresanfang mit KW - Nummer aus dem Vorjahr"
    // Danke an Frank Hamann von Delphi für den Hinweis :-)
    if ((dayOfYear + weekdayOf1stJanuary) <= 0) {
        var tmpDate = new Date(date.getFullYear() - 1, 11, 31);
	    tmpDate.setFullYear(date.getFullYear() - 1);
        return getCalendarWeek(tmpDate);
    }

    var calendarWeek = Math.floor((dayOfYear - 1 + weekdayOf1stJanuary) / 7) + 1;

    if (calendarWeek < 1)
        return;
    else if (calendarWeek > 53)
        return;

    // 53 Kalenderwochen hat grundsätzlich nur ein Jahr, 
    // welches mit einem Donnerstag anfängt !
    // In Schaltjahren ist es auch mit einem Mittwoch möglich, z.B. 1992
    // Danke an Andreas Gut für den Hinweis :-)
    // Andernfalls ist diese KW schon die KW1 des Folgejahres.
    if (calendarWeek == 53) {
        if ((weekdayOf1stJanuary == 3) || ((weekdayOf1stJanuary == 2) && isLeapYear(date))) {
            ; // Das ist korrekt und erlaubt
        }
        else
            calendarWeek = 1; // Korrektur des Wertes
    }

    return calendarWeek;
}

/* Determines the number of days in a given month. */
function getDaysInMonth(date) {
    var daysInMonth = new Array(31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if (isLeapYear(date))
        daysInMonth[1] = 29;
    else
        daysInMonth[1] = 28;
    return daysInMonth[date.getMonth()];
}

/* Determines the day in a given year. */
function getDayOfYear(date) {
    var dayOfYear = 0;
    for (var i = 0; i < date.getMonth(); i++) {
    	var tmpDate = new Date(date.getFullYear(), i);
    	tmpDate.setFullYear(date.getFullYear());
        dayOfYear += getDaysInMonth(tmpDate);
    }
    dayOfYear += date.getDate();
    return dayOfYear;
}
