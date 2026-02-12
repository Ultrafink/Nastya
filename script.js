const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

let noHoverCount = 0;

// Универсальный обработчик: hover НА ПК + tap на мобильных
const moveNoButtonHandler = () => {
  noHoverCount += 1;
  
  const newX = Math.floor(Math.random() * questionContainer.offsetWidth);
  const newY = Math.floor(Math.random() * questionContainer.offsetWidth);

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;

  // 5-е нажатие/наведение = "Не беси!"
  if (noHoverCount === 6) {
    // прячем вопрос
    questionContainer.style.display = "none";
    
    // создаем контейнер "Не беси!"
    const angerContainer = document.createElement('div');
    angerContainer.className = 'result-container container';
    angerContainer.style.display = 'block';
    angerContainer.innerHTML = `
      <img class="gif-result" src="img2.gif" style="border-radius: 10px; margin-bottom: 2rem; width: 100%; max-width: 300px;">
      <h2 style="font-size: 3.2rem; text-align: center;">Не беси!</h2>
    `;
    document.body.appendChild(angerContainer);
    
    // увеличиваем "Да" БОЛЬШЕ + сдвигаем
    yesBtn.style.transform = 'scale(4) translateY(20px) translateX(10px)';
    
    // убираем через 1 сек и возвращаем вопрос
    setTimeout(() => {
      document.body.removeChild(angerContainer);
      questionContainer.style.display = "block";
    }, 2000);
  }
};

// ПК: mouseover (hover)
noBtn.addEventListener("mouseover", moveNoButtonHandler);

// МОБИЛЬНЫЕ: touchstart (тап) + click (на всякий случай)
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault(); // убираем стандартное поведение
  moveNoButtonHandler();
}, { passive: false });

noBtn.addEventListener("click", moveNoButtonHandler);

// кнопка "Да"
yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  resultContainer.style.display = "inherit";
});
