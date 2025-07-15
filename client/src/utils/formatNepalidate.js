// utils/formatNepaliDateTime.js
import bs from 'bikram-sambat-js';

const nepaliMonths = [
  "बैशाख", "जेठ", "असार", "श्रावण", "भदौ", "आश्विन",
  "कार्तिक", "मंसिर", "पौष", "माघ", "फाल्गुण", "चैत्र"
];

const nepaliDigits = {
  "0": "०",
  "1": "१",
  "2": "२",
  "3": "३",
  "4": "४",
  "5": "५",
  "6": "६",
  "7": "७",
  "8": "८",
  "9": "९"
};

const toNepaliNumber = (number) =>
  number.toString().split("").map(d => nepaliDigits[d] || d).join("");

const getTimePeriod = (hour) => {
  if (hour < 4) return "मध्यरात";
  if (hour < 12) return "बिहान";
  if (hour < 17) return "दिउँसो";
  if (hour < 20) return "साँझ";
  return "राति";
};

export const formatNepaliDateTime = (isoDate) => {
  const date = new Date(isoDate);

  const [bsYear, bsMonth, bsDay] = bs.toBs(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );

  const hour = date.getHours();
  const minute = date.getMinutes();
  const timePeriod = getTimePeriod(hour);

  const hour12 = hour % 12 || 12;
  const nepaliTime = `${toNepaliNumber(hour12)}:${toNepaliNumber(minute.toString().padStart(2, "0"))}`;
  const nepaliDate = `${toNepaliNumber(bsDay)} ${nepaliMonths[bsMonth - 1]} ${toNepaliNumber(bsYear)}`;

  return `${nepaliDate}, ${timePeriod} ${nepaliTime} बजे`;
};
