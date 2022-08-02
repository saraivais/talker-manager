function validDay(day) {
  return day < 31 && day > 0;
}

function validMonth(month) {
  return month < 13 && month > 0;
}

function validYear(year) {
  return year < 3000 && year > 1000;
}

function dateValidation(day, month, year) {
  if (!validDay(day) || !validMonth(month) || !validYear(year)) {
    return false;
  }
  const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day > daysPerMonth[month - 1]) {
    return false;
  }
  return true;
}

module.exports = dateValidation;