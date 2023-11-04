// String to UPPERCASE WITH FILL HYPHEN
function upperCaseWithHyphen(string) {
  return string.toUpperCase().split(" ").join("-");
}

// Time Convert UTC to GMT
const utctogmtDate = (date) => {
  return new Date(
    new Date(date).valueOf() + new Date(date).getTimezoneOffset() * 60000
  );
};

// Stringify Number
var special = [
  "zeroth",
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
  "tenth",
  "eleventh",
  "twelfth",
  "thirteenth",
  "fourteenth",
  "fifteenth",
  "sixteenth",
  "seventeenth",
  "eighteenth",
  "nineteenth",
];
var deca = [
  "twent",
  "thirt",
  "fort",
  "fift",
  "sixt",
  "sevent",
  "eight",
  "ninet",
];

function stringifyNumber(n) {
  if (n < 20) return special[n];
  if (n % 10 === 0) return deca[Math.floor(n / 10) - 2] + "ieth";
  return deca[Math.floor(n / 10) - 2] + "y-" + special[n % 10];
}

export { upperCaseWithHyphen, utctogmtDate, stringifyNumber };
