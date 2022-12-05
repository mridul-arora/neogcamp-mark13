function reverseString(str) {
    var listOfChars = str.split('');
    var reversedListOfChars = listOfChars.reverse();
    var reversedString = reversedListOfChars.join('');
    return reversedString;
}

function isPalindrome(str) {
    var reversedString = reverseString(str);
    if (str === reversedString) {
        return true;
    }
    return false;
}

function convertDateToString(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);

    var flag = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }

    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3) {
        if (day < 1) {
            if (isLeapYear(year)) {
                day = 29;
                month--;
            } else {
                day = 28;
                month--;
            }
        }
    } else {
        if (day < 1) {
            day = daysInMonth[month - 2];
            month--;
        }
    }

    if (month < 1) {
        month = 12;
        year--;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

function getPreviousPalindromeDate(date) {
    var ctr = 0;
    var previousDate = getPreviousDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if (isPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    return [ctr, previousDate];
}

//common text fields
const outputText = document.querySelector("#outputText");
const outputLeft = document.querySelector("#outputLeft");
const outputRight = document.querySelector("#outputRight");
const output = document.querySelector("#output");

//common functions 
function showText(text) {
    outputText.innerText = text;
}

function showLeft(text) {
    outputLeft.style.display = "block";
    outputLeft.innerText = text;
    output.style.height = "40px";
    output.style.padding = "0 0 2.5rem 0";
}

function showRight(text) {
    outputRight.style.display = "block";
    outputRight.innerText = text;
}

function hideLeftnRight() {
    outputLeft.style.display = "none";
    outputRight.style.display = "none";
    output.style.height = "0";
    output.style.padding = "0";
}

// Check whether bday a palindrome 
var bdayDate = document.querySelector('#bday');
var btnCheck = document.querySelector('#btn-bday-pdrome');


function clickHandler() {
    var bdayStr = bdayDate.value;

    if (bdayStr !== '') {
        var listOfDate = bdayStr.split('-'); // ['2020', '10', '11']

        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if (isPalindrome) {
            showText('Yay! your birthday is a palindrome!! 🥳🥳');
            hideLeftnRight();
        } else {
            showText('Nope.. your birthday is not a palindrome!! 😢😢');

            var [next, nextDate] = getNextPalindromeDate(date);
            var [prev, prevDate] = getPreviousPalindromeDate(date);

            showLeft(`The previous palindrome date was ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed it by ${prev} days!😔`);
            showRight(`The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, in ${next} days!😃`);
        }
    }
}

btnCheck.addEventListener('click', clickHandler);