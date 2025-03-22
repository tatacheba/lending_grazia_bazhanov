//Проверка заполнения полей формы
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#order-form");
    console.log("ffffffffffff");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            console.log("ffffffffffff");
            const nameInput = form.querySelector('input[name="name"]');
            const phoneInput = form.querySelector('input[name="phone"]');
            const errorName = document.getElementById("error-name");
            const errorPhone = document.getElementById("error-phone");
            console.log(nameInput);

            let hasError = false;

            // Очистка старых ошибок
            errorName.textContent = "";
            errorPhone.textContent = "";

            if (!nameInput.value.trim()) {
                errorName.textContent = "Inserisci il tuo nome";
                hasError = true;
            }

            if (!phoneInput.value.trim()) {
                errorPhone.textContent = "Inserisci il tuo numero di telefono";
                hasError = true;
            }

            if (!hasError) {
                window.location.href = "success.html";
            }
        });
    }
});

//Прогрес-бар при скролле страницы
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;

    const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    document.querySelector(".progress-bar").style.width = scrolled + "%";
});
//Плавный скролл к форме
document.querySelectorAll(".js-scroll").forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetID = this.getAttribute("href");
        const targetEl = document.querySelector(targetID);
        if (!targetEl) return;

        const targetPosition =
            targetEl.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000; // в мс — чем больше, тем плавнее
        let startTime = null;

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function animateScroll(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutQuad(progress);

            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    });
});
//Таймер
//init timer for promo action
function Timer() {
    var $timers = document.querySelectorAll(".timer"),
        date = new Date(),
        dateOffset = date.getTimezoneOffset() * 60 * 1000,
        tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    tomorrowDate.setHours(0);
    tomorrowDate.setMinutes(0);
    tomorrowDate.setSeconds(0);

    var timeLeft = tomorrowDate - date + dateOffset;

    step();
    startTimer();

    function setTime(milliseconds) {
        var minutes = formatDigit(new Date(milliseconds).getMinutes()),
            seconds = formatDigit(new Date(milliseconds).getSeconds());

        for (var i = 0; i < $timers.length; i++) {
            $timers[i].querySelector(".minutes").textContent = minutes;
            $timers[i].querySelector(".seconds").textContent = seconds;
        }
    }

    function formatDigit(digit) {
        if (digit >= 10) {
            return digit;
        } else {
            return "0" + digit;
        }
    }

    var interval;

    function step() {
        if (timeLeft == dateOffset) {
            clearInterval(interval);
        } else {
            timeLeft -= 1000;
            setTime(timeLeft);
        }
    }

    function startTimer() {
        interval = setInterval(step, 1000);
    }
}
Timer();
