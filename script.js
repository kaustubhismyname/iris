"use strict";

const form = document.querySelector("form");
const gallery = document.querySelector(".gallery");
const yearSelector = document.querySelector("#year");
const monthSelector = document.querySelector("#month");
const notMonthDay = `<div class="day not-month"></div>`;
const photoDay = `<div class="day"></div>`;
const today = new Date(Date.now());
// prettier-ignore
const months =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

fetch("years.json")
  .then((res) => res.json())
  .then((data) => {
    const { years } = data;
    setYears(years);
    yearSelector.value = today.getFullYear();
    monthSelector.value = months[today.getMonth()].slice(0, 3).toLowerCase();
  });

function getImageData() {
  return fetch("images.json")
    .then((res) => res.json())
    .then((data) => data);
}

//

//

//

//

//
function setYears(years) {
  years.forEach((year) => {
    yearSelector.insertAdjacentHTML(
      "afterbegin",
      `<option value="${year}">${year}</option>`
    );
  });

  setMonth(today.getFullYear());
}

yearSelector.addEventListener("change", () => {
  const year = yearSelector.value;
  setMonth(year);
});

function setMonth(year) {
  monthSelector.innerHTML = "";

  // prettier-ignore
  const monthNames =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const currentMonth = today.getMonth();

  const months =
    year == today.getFullYear()
      ? monthNames.slice(0, currentMonth + 1)
      : monthNames;

  months.forEach((month) => {
    monthSelector.insertAdjacentHTML(
      "beforeend",
      `<option value="${month.slice(0, 3).toLowerCase()}">${month}</option>`
    );
  });
}

function daysInMonth(month, year) {
  if (month == "feb") {
    if (year % 4 === 0) {
      if (year % 100 === 0) return 28;
      return 29;
    }

    return 28;
  } else if (
    ["jan", "mar", "may", "jul", "aug", "oct", "dec"].includes(month)
  ) {
    return 31;
  } else return 30;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const month = monthSelector.value;
  const year = yearSelector.value;
  showGallery(month, year);
});

function showGallery(month, year) {
  gallery.innerHTML = "";

  getImageData().then((data) => {
    const d = Date.parse(`${month} 1 ${year}`);
    const a = new Date(d);
    const day = a.getDay();
    const numDays = daysInMonth(month, +year);

    for (let i = 0; i <= 34; i++) {
      const src =
        data[year]?.[month]?.[`${i - day + 1}`]?.url || "/images/no-pic.jpg";
      if (i < day || i > numDays + day - 1) {
        gallery.insertAdjacentHTML("beforeend", notMonthDay);
      } else {
        gallery.insertAdjacentHTML(
          "beforeend",
          `<div class="day">${
            i - day + 1
          }<img src='${src}' class='img-of-the-day' ></img></div>`
        );
      }
    }
  });
}

// console.log(daysInMonth("nov", 2024));
