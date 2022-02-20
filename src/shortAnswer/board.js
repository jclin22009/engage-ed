/* Text to add to the move here button */
const MOVE_HERE_TEXT = "— Move here —";

/**************************************/








/* Functions to add columns or cards, delete */
const genericAddColumn = (input) => {
  let existingColumnNames = document.querySelectorAll(".column .columnTitle");
  for (let name of existingColumnNames) {
    if (input === name.textContent) {
      alert("Please pick a new name!");
      return;
    }
  }

  let templateColumn = document.querySelector(".template.column");
  let newColumn = templateColumn.cloneNode(true);
  newColumn.classList.remove("template");
  newColumn.querySelector(".columnTitle").textContent = input;

  return newColumn;
}

const genericAddShortanswer = (inputQuestion, inputAnswer, inputExplanation) => {
  event.preventDefault();
  let board = document.getElementById("board");
  if (!board.querySelector(".column")) {
    alert("There are no available columns for your card!");
    return;
  }

  let templateSA = document.querySelector(".template.card");
  let newSA = templateSA.cloneNode(true);
  newSA.classList.remove("template");

  let shortForm = newSA.querySelector("#createShort");

  newSA.querySelector(".question").textContent = inputQuestion;
  newSA.querySelector(".delete").addEventListener("click", onDelete);
  newSA.querySelector(".startMove").addEventListener("click", onSelect);

  shortForm.addEventListener("submit", () => {
    event.preventDefault();
    let userAnswer = shortForm.studentAnswer.value;
    let templateKey = document.querySelector(".template.shortkey");
    let newKey = templateKey.cloneNode(true);
    newKey.classList.remove("template");
    newKey.querySelector(".correctAnswer").textContent = inputAnswer;
    newKey.querySelector(".correctExplanation").textContent = inputExplanation;
    shortForm.after(newKey);
  });
  return newSA;
}

const genericAddMultipleChoice = (inputQuestion, inputAnswer, inputExplanation) => {
  event.preventDefault();
  let board = document.getElementById("board");
  if (!board.querySelector(".column")) {
    alert("There are no available columns for your card!");
    return;
  }

  let templateMC = document.querySelector(".template.mchoice");
  let newMC = templateMC.cloneNode(true);
  newMC.classList.remove("template");
  let question = newMC.querySelector(".tQuestion")
  question.textContent = inputQuestion;

  let addOptionForm = newMC.querySelector("#addOption");
  addOptionForm.addEventListener("submit", () => {
    event.preventDefault();
    let newOption = document.createElement("input");
    newOption.type = "radio";
    let option = addOptionForm.addedOption.value
    newOption.name = option;

    let brk = document.createElement("br");
    let optionLabel = document.createElement("label");
    optionLabel.for = newOption;
    optionLabel.innerHTML = option;
    newOption.addEventListener("change", () => {
      let newArticle = document.createElement("article");
      if (inputAnswer !== optionLabel.innerHTML) {
        let response = document.createElement("p");
        response.innerHTML = "Incorrect.";
        let correctAnswer = document.createElement("p");
        correctAnswer.innerHTML = "Correct answer is: " + inputAnswer;
        newArticle.append(response);
        newArticle.append(correctAnswer);
        newMC.append(newArticle);
        newArticle.style.backgroundColor = "#ffccbb";
      } else {
        let response = document.createElement("p");
        response.innerHTML = "Correct!";
        newArticle.append(response);
        newMC.append(newArticle);
        newArticle.style.backgroundColor = "#90EE90";
      }
    })
    question.appendChild(brk);
    question.appendChild(newOption);
    newOption.after(optionLabel);
  })

  let saveOption = newMC.querySelector("#save").addEventListener("click", () => {
    newMC.querySelector("#submitOption").remove();
    newMC.querySelector("#addOption").remove();
    newMC.querySelector("#save").remove();
  })
  return newMC;
}

const addMultipleChoice = (event) => {
  event.preventDefault();
  cleanup();
  let form = document.querySelector("#mcForm");
  let formInfo = {
    question: form.mcQuestion.value,
    answer: form.mcTAnswer.value,
    explanation: form.mcTExplanation.value
  }

  let newMC = genericAddMultipleChoice(formInfo.question, formInfo.answer, formInfo.explanation);
  let column = document.querySelectorAll(".column")[0];
  if (!column) {
    return;
  }
  column.append(newMC);

  form.reset();
}

const onDelete = (event) => {
  cleanup();
  event.currentTarget.closest(".card").remove();
}
/**************************************/

/**************************************/
/* add column, card to form */
const addColumn = (event) => {
  event.preventDefault();
  cleanup();
  let form = document.querySelector("#columnForm");
  let input = form.title;

  let newColumn = genericAddColumn(input.value);
  if (!newColumn) {
    return;
  }
  board.append(newColumn);

  form.reset();
}

const addShortanswer = (event) => {
  event.preventDefault();
  cleanup();
  let form = document.querySelector("#saForm");
  let formInfo = {
    question: form.teacherQuestion.value,
    answer: form.teacherAnswer.value,
    explanation: form.teacherExplanation.value
  }
  let newShort = genericAddShortanswer(formInfo.question, formInfo.answer, formInfo.explanation);
  let column = document.querySelectorAll(".column")[0];
  if (!column) {
    return;
  }
  column.append(newShort);

  form.reset();
}
/**************************************/

/**************************************/
/* move card functions */
const createMoveHereButton = () => {
  let moveHereButton = document.createElement("button");
  moveHereButton.classList.add("moveHere");
  moveHereButton.addEventListener("click", moveClick);
  moveHereButton.textContent = MOVE_HERE_TEXT;
  return moveHereButton;
}

const cleanup = () => {
  let moveHereButtons = document.querySelectorAll(".moveHere");
  for (let button of moveHereButtons) {
    button.remove();
  }
  let cards = (document.getElementById("board")).querySelectorAll(".column .card");
  for (let card of cards) {
    card.classList.remove("selected");
  }
}

const moveClick = (event) => {
  let selectedCard = document.querySelector(".selected");
  event.currentTarget.closest(".moveHere").after(selectedCard);
  cleanup();
}

const onSelect = (event) => {
  cleanup();
  let board = document.getElementById("board");
  let columns = board.querySelectorAll(".column");
  for (let column of columns) {
    let cards = column.querySelectorAll(".card");
    for (let card of cards) {;
      card.after(createMoveHereButton());
    }

    let columnTitle = column.querySelector(".columnTitle");
    columnTitle.after(createMoveHereButton());
  }
  event.currentTarget.closest(".card").classList.add("selected");
}

/**************************************/

const main = () => {
  document.querySelector("#columnForm").addEventListener("submit", addColumn);
  document.querySelector("#saForm").addEventListener("submit", addShortanswer);
  document.querySelector("#mcForm").addEventListener("submit", addMultipleChoice);
};
main();
