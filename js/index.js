document.addEventListener("DOMContentLoaded", function () {
   const slider = document.querySelector(".certificates-slider");
   const slides = document.querySelectorAll(".certificate-slide");
   const prevBtn = document.querySelector(".prev-btn");
   const nextBtn = document.querySelector(".next-btn");
   const dotsWrap = document.querySelector(".slider-dots"); // обгортка для крапок

   const GAP = 20; // має співпадати з CSS gap
   let currentIndex = 0;
   const slideCount = slides.length;

   function getSlidesToShow() {
      if (window.innerWidth >= 1200) return 4;
      if (window.innerWidth >= 900) return 3;
      if (window.innerWidth >= 576) return 2;
      return 1;
   }

   function getPageCount() {
      return Math.ceil(slideCount / getSlidesToShow());
   }

   function clampIndex() {
      const maxIndex = getPageCount() - 1;
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;
   }

   function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      const pages = getPageCount();
      for (let i = 0; i < pages; i++) {
         const dot = document.createElement("button");
         dot.className = "dot" + (i === currentIndex ? " active" : "");
         dot.type = "button";
         dot.setAttribute("aria-label", `Go to page ${i + 1}`);
         dot.addEventListener("click", () => {
            currentIndex = i;
            updateSlider();
         });
         dotsWrap.appendChild(dot);
      }
   }

   function updateDots() {
      const dots = dotsWrap ? dotsWrap.querySelectorAll(".dot") : [];
      dots.forEach((dot, i) =>
         dot.classList.toggle("active", i === currentIndex)
      );
   }

   function updateSlider() {
      // індекс першого видимого слайда на поточній сторінці
      const perPage = getSlidesToShow();
      const firstVisibleSlideIndex = currentIndex * perPage;

      // ширина 1 слайда + gap
      const unit = (slides[0]?.offsetWidth || 0) + GAP;

      // зсуваємо на кількість слайдів, а не сторінок
      const translateX = firstVisibleSlideIndex * unit;
      slider.style.transform = `translateX(-${translateX}px)`;

      updateDots();
   }

   function nextSlide() {
      const maxIndex = getPageCount() - 1;
      currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
      updateSlider();
   }

   function prevSlide() {
      const maxIndex = getPageCount() - 1;
      currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
      updateSlider();
   }

   // Навігація стрілками
   nextBtn?.addEventListener("click", nextSlide);
   prevBtn?.addEventListener("click", prevSlide);

   // Ресайз: перебудувати крапки, піджати індекс, оновити позицію
   const onResize = () => {
      clampIndex();
      buildDots();
      updateSlider();
   };
   window.addEventListener("resize", onResize);

   // Автопрокрутка
   const intervalId = setInterval(nextSlide, 5000);

   // 1-й запуск (після того як картинки порахують ширину)
   window.addEventListener("load", () => {
      clampIndex();
      buildDots();
      updateSlider();
   });
});

document.addEventListener("DOMContentLoaded", function () {
   const statNumbers = document.querySelectorAll(".stat-number");
   let animated = false;

   // Функция для анимации чисел
   function animateValue(element, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
         if (!startTimestamp) startTimestamp = timestamp;
         const progress = Math.min((timestamp - startTimestamp) / duration, 1);
         const value = Math.floor(progress * (end - start) + start);

         // Добавляем разделители тысяч для числа 3400
         if (end >= 1000) {
            element.textContent = value.toLocaleString();
         } else {
            element.textContent = value;
         }

         if (progress < 1) {
            window.requestAnimationFrame(step);
         }
      };
      window.requestAnimationFrame(step);
   }

   // Запуск анимации при прокрутке
   function checkScroll() {
      if (animated) return;

      const firstElement = statNumbers[0];
      const position = firstElement.getBoundingClientRect();

      // Если элемент виден на экране
      if (position.top < window.innerHeight && position.bottom >= 0) {
         animated = true;

         statNumbers.forEach((element, index) => {
            const target = parseInt(element.getAttribute("data-target"));

            // Задержка для последовательной анимации
            setTimeout(() => {
               animateValue(element, 0, target, 2000);
            }, index * 300);
         });
      }
   }

   // Проверяем при загрузке и при прокрутке
   window.addEventListener("scroll", checkScroll);
   checkScroll(); // Проверить сразу при загрузке
});

document.addEventListener("DOMContentLoaded", function () {
   // Get all popup buttons and overlays
   const popupButtons = document.querySelectorAll(".project-button");
   const popupOverlays = document.querySelectorAll(".popup-overlay");
   const closeButtons = document.querySelectorAll(".popup-close");

   // Add click event to each button
   popupButtons.forEach((button) => {
      button.addEventListener("click", function () {
         const popupId = this.getAttribute("data-popup");
         const popup = document.getElementById(popupId);

         if (popup) {
            popup.classList.add("active");
            document.body.style.overflow = "hidden";
         }
      });
   });

   // Add click event to close buttons
   closeButtons.forEach((button) => {
      button.addEventListener("click", function () {
         const popup = this.closest(".popup-overlay");
         popup.classList.remove("active");
         document.body.style.overflow = "auto";
      });
   });

   // Close popup when clicking outside
   popupOverlays.forEach((overlay) => {
      overlay.addEventListener("click", function (event) {
         if (event.target === overlay) {
            overlay.classList.remove("active");
            document.body.style.overflow = "auto";
         }
      });
   });

   // Close popup with Escape key
   document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
         popupOverlays.forEach((overlay) => {
            if (overlay.classList.contains("active")) {
               overlay.classList.remove("active");
               mainContainer.classList.remove("blur-background");
               document.body.style.overflow = "auto";
            }
         });
      }
   });
});
