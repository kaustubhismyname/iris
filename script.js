"use strict";

const form = document.querySelector("form");
const gallery = document.querySelector(".gallery");
const yearSelector = document.querySelector("#year");
const monthSelector = document.querySelector("#month");
const today = new Date(Date.now());
const closeBtn = document.querySelector("#close-modal");
const imageDetails = document.querySelector(".image-details");
const imageModal = document.querySelector(".image-modal");
const bigImage = document.querySelector(".big-image");

// prettier-ignore
const months =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getImageData() {
  return fetch("images.json")
    .then((res) => res.json())
    .then((data) => data);
}

class App {
  constructor(data) {
    this.data = data;
    this.years = Object.keys(data);
    this.latestYear = this.years.reduce(
      (max, item) => (Number(item) >= Number(max) ? Number(item) : max),
      "0"
    );
    this.latestMonth = Object.keys(data[this.latestYear]).reduce(
      (item, maxMonth) =>
        months.indexOf(item) >= months.indexOf(maxMonth) ? item : maxMonth,
      "January"
    );

    this.setYearSelector(this.years);
    yearSelector.value = this.latestYear;
    this.setMonthSelector(data[this.latestYear]);

    // event listeners
    yearSelector.addEventListener(
      "change",
      function () {
        this.setMonthSelector(data[yearSelector.value]);
      }.bind(this)
    );
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.showGallery(monthSelector.value, yearSelector.value, this.data);
    });

    gallery.addEventListener("click", this.showModal.bind(this));
    closeBtn.addEventListener("click", this.hideModal);
    this.showGallery(monthSelector.value, yearSelector.value, this.data);
  }

  hideModal() {
    imageModal.classList.add("hidden");
  }

  showModal(e) {
    if (
      !(
        e.target.classList.contains("date-txt") ||
        e.target.classList.contains("date-overlay")
      ) ||
      e.target.dataset.url == "/images/no-pic-2.jpg"
    ) {
      return;
    }

    imageDetails.innerHTML = "";

    const url = e.target.dataset.url;
    const title = e.target.dataset.title;
    const caption = e.target.dataset.caption;
    const insta = e.target.dataset.insta;
    const date = e.target.dataset.date;
    const photographer = e.target.dataset.photographer;
    const images = this.data[yearSelector.value][monthSelector.value];

    bigImage.src = url;
    imageDetails.insertAdjacentHTML(
      "afterbegin",
      `<span class="image-title">${title}</span>
          <cite class="photographer-name">by ${photographer}</cite>
          <p class="image-caption dm-mono-light">${caption}</p>
          <div class="insta">
            <a href=${insta} target="_blank">Follow ${photographer} on 
              <span class="instagram-icon"> 
                <img src="/images/insta-icon.png" height="16px"> 
                Instagram
              </span>
            </a>
          </div> `
    );

    imageModal.classList.remove("hidden");
  }

  daysInMonth(month, year) {
    if (month == "February") {
      if (year % 4 === 0) {
        if (year % 100 === 0) return 28;
        return 29;
      }

      return 28;
    } else if (
      [
        "January",
        "March",
        "May",
        "July",
        "August",
        "October",
        "December",
      ].includes(month)
    ) {
      return 31;
    } else return 30;
  }

  showGallery(month, year, data) {
    gallery.innerHTML = "";

    const d = Date.parse(`${month} 1 ${year}`);
    const a = new Date(d);
    const day = a.getDay();
    const numDays = this.daysInMonth(month, +year);

    for (let i = 0; i < 35; i++) {
      const src =
        data[year]?.[month]?.[`${i - day + 1}`]?.url || "/images/no-pic-2.jpg";
      const title = data[year]?.[month]?.[`${i - day + 1}`]?.title || "Image";
      const caption = data[year]?.[month]?.[`${i - day + 1}`]?.caption || "---";
      const insta =
        data[year]?.[month]?.[`${i - day + 1}`]?.instagram ||
        "https://www.instagram.com/iris_iitm/";
      const photographer =
        data[year]?.[month]?.[`${i - day + 1}`]?.owner || "Iris";

      if (i < day || i > day + numDays - 1) {
        gallery.insertAdjacentHTML(
          "beforeend",
          `<div class="day not-month "data-index='${i}'></div>`
        );
      } else {
        gallery.insertAdjacentHTML(
          "beforeend",
          `<div class="day" data-index='${i}' >
            <div class='date-overlay' data-url="${src}" data-photographer="${photographer}" data-date="${
            i - day + 1
          }" data-title="${title}" data-caption="${caption}" data-insta="${insta}">
               <span class='date-txt' data-url="${src}" data-photographer="${photographer}" data-date="${
            i - day + 1
          }" data-title="${title}" data-caption="${caption}" data-insta="${insta}">${
            i - day + 1
          }</span>
               ${
                 src == "/images/no-pic-2.jpg"
                   ? `<span class='no-img-txt'>No Image</span>`
                   : ""
               }
            </div>
          <img src='${src}'class='img-of-the-day'> </img>
          </div>`
        );
      }
    }
  }

  setYearSelector(years) {
    years.forEach((y) => {
      yearSelector.insertAdjacentHTML(
        "afterbegin",
        `<option value="${y}">${y}</option> -->`
      );
    });
  }

  setMonthSelector(year) {
    monthSelector.innerHTML = "";

    const months = Object.keys(year);
    months.forEach((m) => {
      monthSelector.insertAdjacentHTML(
        "beforeend",
        `<option value="${m}">${m}</option>`
      );
    });
  }
}

getImageData()
  .then((data) => {
    const app = new App(data);
  })
  .catch((err) => console.log(err));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// OLD CODE --- DONOT UN-COMMENT
//
// fetch("years.json")
//   .then((res) => res.json())
//   .then((data) => {
//     const { years } = data;
//     setYears(years);
//     yearSelector.value = today.getFullYear();
//     monthSelector.value = months[today.getMonth()].slice(0, 3).toLowerCase();
//   });

// function getImageData() {
//   return fetch("images.json")
//     .then((res) => res.json())
//     .then((data) => data);
// }

// //

// //

// //

// //

// //
// function setYears(years) {
//   years.forEach((year) => {
//     yearSelector.insertAdjacentHTML(
//       "afterbegin",
//       `<option value="${year}">${year}</option>`
//     );
//   });

//   setMonth(today.getFullYear());
// }

// function setMonth(year) {
//   monthSelector.innerHTML = "";

//   // prettier-ignore
//   const monthNames =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//   const currentMonth = today.getMonth();

//   const months =
//     year == today.getFullYear()
//       ? monthNames.slice(0, currentMonth + 1)
//       : monthNames;

//   months.forEach((month) => {
//     monthSelector.insertAdjacentHTML(
//       "beforeend",
//       `<option value="${month.slice(0, 3).toLowerCase()}">${month}</option>`
//     );
//   });
// }

// function daysInMonth(month, year) {
//   if (month == "feb") {
//     if (year % 4 === 0) {
//       if (year % 100 === 0) return 28;
//       return 29;
//     }

//     return 28;
//   } else if (
//     ["jan", "mar", "may", "jul", "aug", "oct", "dec"].includes(month)
//   ) {
//     return 31;
//   } else return 30;
// }

// function showGallery(month, year) {
//   gallery.innerHTML = "";

//   getImageData().then((data) => {
//     const d = Date.parse(`${month} 1 ${year}`);
//     const a = new Date(d);
//     const day = a.getDay();
//     const numDays = daysInMonth(month, +year);

//     for (let i = 0; i <= 34; i++) {
//       const src =
//         data[year]?.[month]?.[`${i - day + 1}`]?.url || "/images/no-pic-2.jpg";
//       if (i < day || i > numDays + day - 1) {
//         gallery.insertAdjacentHTML("beforeend", notMonthDay);
//       } else {
//         gallery.insertAdjacentHTML(
//           "beforeend",
//           `<div class="day"><div class='date-overlay'>${
//             src == "/images/no-pic-2.jpg"
//               ? `<span class='date-txt'>${
//                   i - 1
//                 }</span><span class='no-img-txt'>No Image</span>`
//               : `<span class='date-txt'>${i - 1}</span>`
//           }</div><img src='${src}' class='img-of-the-day' ></img></div>`
//         );
//       }
//     }
//   });
// }

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const month = monthSelector.value;
//   const year = yearSelector.value;
//   showGallery(month, year);
// });

// yearSelector.addEventListener("change", () => {
//   const year = yearSelector.value;
//   setMonth(year);
// });

// fetch("images.json")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     const years = Object.keys(data);
//     setYearSelector(years);
//     setMonthSelector(data[years[0]]);
//   });
