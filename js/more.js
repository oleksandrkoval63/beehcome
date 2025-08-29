// === твій код анімацій — без змін ===
function animateHide(el) {
   if (el.classList.contains("unshow")) return;
   el.style.display = "block";
   el.style.animation = "none";
   el.offsetHeight;
   el.style.animation = "fadeInDown 0.6s ease forwards";
   const onEnd = (e) => {
      if (e.target !== el) return;
      el.removeEventListener("animationend", onEnd);
      el.classList.add("unshow");
      el.style.removeProperty("animation");
      el.style.removeProperty("display");
   };
   el.addEventListener("animationend", onEnd);
}

function animateShow(el) {
   if (!el.classList.contains("unshow")) return;
   el.classList.remove("unshow");
   el.style.display = "block";
   el.style.animation = "none";
   el.offsetHeight;
   el.style.animation = "fadeInUp 0.6s ease forwards";
   const onEnd = (e) => {
      if (e.target !== el) return;
      el.removeEventListener("animationend", onEnd);
      el.style.removeProperty("animation");
      el.style.removeProperty("display");
   };
   el.addEventListener("animationend", onEnd);
}

// === універсальний ініціалізатор для КОЖНОЇ кнопки ===
function initWatchMore(button) {
   // 1) визначаємо scope (контейнер), в межах якого працює кнопка
   //    тут – спираємось на найближчий блок, де лежить кнопка (наприклад, .community__info-wrapper)
   const scope =
      button.closest(".community__info-wrapper") ||
      button.closest(".projects-wrapper") ||
      button.parentElement?.parentElement || // як запасний варіант
      document;

   // 2) які елементи ховаємо/показуємо (через data-target)
   const selector = button.dataset.target || ".project-card";

   // 3) скільки показувати спочатку (через data-visible, за замовчуванням 1)
   const visibleCount = parseInt(button.dataset.visible || "1", 10);

   // 4) збираємо елементи саме в межах свого scope
   const items = Array.from(scope.querySelectorAll(selector));

   if (!items.length) {
      button.style.display = "none";
      return;
   }

   // 5) початково ховаємо «зайві» без анімації
   items.forEach((el, i) => {
      if (i >= visibleCount) {
         el.classList.add("unshow");
      }
   });

   // якщо елементів <= visibleCount — кнопку ховаємо
   const hasExtra = items.length > visibleCount;
   if (!hasExtra) {
      button.style.display = "none";
      return;
   }

   // 6) навішуємо клік тільки на свою кнопку — працюємо з елементами у своєму scope
   let expanded = false;
   button.addEventListener("click", () => {
      expanded = !expanded;
      items.forEach((el, i) => {
         if (i >= visibleCount) {
            expanded ? animateShow(el) : animateHide(el);
         }
      });
      if (button.classList.contains("more-special")) {
         const shortText = document.querySelector(
            ".community__text-spec .community__text"
         );
         shortText.classList.toggle("active");
         button.innerHTML = expanded
            ? "<i></i> Details less"
            : "<i></i> Details more";
         button.classList.toggle("active");
      } else {
         button.innerHTML = expanded
            ? '<i class="fas fa-eye-slash"></i> Watch less'
            : '<i class="fas fa-eye"></i> Watch more';
      }
      button.setAttribute("aria-expanded", String(expanded));
   });
}

// ініціалізація для всіх кнопок на сторінці
document.addEventListener("DOMContentLoaded", () => {
   document
      .querySelectorAll(".watch-more-button")
      .forEach((btn) => initWatchMore(btn));
});
