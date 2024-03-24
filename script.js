document.addEventListener(
  "DOMContentLoaded",
  function () {
    function getDeadLineFromUser() {
      let deadLine = "";

      deadLine = prompt(
        "Write your deadline in the following form year-month-day",
        "1970-01-01"
      );

      while (
        deadLine == "" ||
        deadLine == null ||
        isNaN(Date.parse(deadLine)) ||
        Date.parse(deadLine) - Date.parse(new Date()) <= 0
      ) {
        alert("You have entered an incorrect date, please try again");
        deadLine = prompt(
          "Write your deadline in the following form year-month-day",
          "1970-01-01"
        );
      }
      return deadLine;
    }

    function getTimeRemaining(endTime) {
      const total = Date.parse(endTime) - Date.parse(new Date()),
        days = Math.floor(total / (1000 * 60 * 60 * 24)),
        hours = Math.floor(((total / 1000) * 60 * 60) % 24),
        minutes = Math.floor((total / 1000 / 60) % 60),
        second = Math.floor((total / 1000) % 60);

      return {
        total,
        days,
        hours,
        minutes,
        second,
      };
    }

    function addZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }

    function setClock(selector, endTime) {
      const timer = document.querySelector(selector),
        days = timer.querySelector("#day"),
        hours = timer.querySelector("#hour"),
        minutes = timer.querySelector("#minute"),
        seconds = timer.querySelector("#second"),
        timeInterval = setInterval(updateClock, 1000);

      updateClock();
      function updateClock() {
        const t = getTimeRemaining(endTime);

        days.innerHTML = addZero(t.days);
        hours.innerHTML = addZero(t.hours);
        minutes.innerHTML = addZero(t.minutes);
        seconds.innerHTML = addZero(t.second);

        if (t.total <= 0) {
          clearInterval(timeInterval);
        }
      }
    }

    setClock(".timer", getDeadLineFromUser());
  },
  false
);
