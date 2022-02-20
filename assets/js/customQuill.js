var quill = new Quill('#editor', {
  modules: { toolbar: '#toolbar' },
  theme: 'snow'
});

let BlockEmbed = Quill.import('blots/block/embed');

// long answer constructor
class LongAnswer extends BlockEmbed {
  static count = 0;
  static create(value) {
    const node = super.create(value);
    node.contentEditable = 'false';
    this._addLongAnswer(node, value);
    return node;
  }

  static value(node) {
    return node.getAttribute(LongAnswer.blotName)
  }

  static _addLongAnswer(node, value) {
    node.setAttribute(LongAnswer.blotName, value);

    // This is a simple switch, but you can use
    // whatever method of building HTML you need.
    // Could even be async.
    switch (value) {
      case 1:
        return this._addLongAnswer1(node);
      default:
        throw new Error(`Unknown LongAnswer type ${value}`);
    }
  }
// define elements of long answer
  static _addLongAnswer1(node) {
    LongAnswer.count++;
    const header = document.createElement('h2');
    header.innerHTML = `${LongAnswer.count}. We have a question for you`;
    const field = document.createElement('TEXTAREA');
    field.placeholder = 'Type your answer';

    node.appendChild(header);
    node.appendChild(field);

  }
}

LongAnswer.blotName = 'LongAnswer';
LongAnswer.tagName = 'DIV';
LongAnswer.className = 'ql-LongAnswer';

// add long answer
Quill.register(LongAnswer);

// detect when to summon long answer and summon
var longAnswerButton = document.querySelector('#longAnswer');
longAnswerButton.addEventListener('click', function () {

  try {
    quill.getSelection() || quill.setSelection(0, 0);
  } catch (e) {
    quill.setSelection(0, 0);
  }
  var format = quill.getFormat();
  if (format.custom) {
    quill.format('custom', '');
  } else {
    quill.format('custom', 'test');
  }

  const cursorPosition = quill.getSelection().index;
  // quill.insertText(cursorPosition, "<button>Bob</button>");
  quill.updateContents([
    { insert: { LongAnswer: 1 } },
  ]);
});


class MultipleChoice extends BlockEmbed {
  static count = 0;
  static create(value) {
    const node = super.create(value);
    node.contentEditable = 'false';
    this._addMultipleChoice(node, value);
    return node;
  }

  static value(node) {
    return node.getAttribute(MultipleChoice.blotName)
  }

  static _addMultipleChoice(node, value) {
    node.setAttribute(MultipleChoice.blotName, value);

    // This is a simple switch, but you can use
    // whatever method of building HTML you need.
    // Could even be async.
    switch (value) {
      case 1:
        return this._addMultipleChoice1(node);
      default:
        throw new Error(`Unknown MultipleChoice type ${value}`);
    }
  }

  static _returnArticle(question, answer, explanation) {
    return;
  }

  static _addMultipleChoice1(node) {
    //create section
    let multipleChoiceEntry = document.createElement("section");

    //create header, append to section
    let mcHeader = document.createElement("h2");
    mcHeader.innerHTML = "Add Multiple Choice";
    multipleChoiceEntry.append(mcHeader);

    //create form, append to section
    let mcForm = document.createElement("form");
    multipleChoiceEntry.append(mcForm);

    //create input and label for question. append to form
    let questionInput = document.createElement("input");
    questionInput.type = "text";
    questionInput.name = "question";
    questionInput.id = "mcQuestion";
    let questionLabel = document.createElement("label");
    questionLabel.innerHTML = "Question: ";
    questionLabel.for = questionInput;
    mcForm.append(questionLabel);
    mcForm.append(questionInput);

    let qBr = document.createElement("br");
    mcForm.append(qBr);

    //create input and label for answer. append to form
    let answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.name = "answer";
    answerInput.id = "mcAnswer";
    let answerLabel = document.createElement("label");
    answerLabel.innerHTML = "Answer: ";
    answerLabel.for = answerInput;
    mcForm.append(answerLabel);
    mcForm.append(answerInput);

    let aBr = document.createElement("br");
    mcForm.append(aBr);

    //create input and label for explanation. append to form
    let explanationInput = document.createElement("input");
    explanationInput.type = "text";
    explanationInput.name = "explanation";
    explanationInput.id = "mcExplanation";
    let explanationLabel = document.createElement("label");
    explanationLabel.innerHTML = "Explanation: ";
    explanationLabel.for = explanationInput;
    mcForm.append(explanationLabel);
    mcForm.append(explanationInput);

    let eBr = document.createElement("br");
    mcForm.append(eBr);

    //create submit button for form
    let mcRequest = document.createElement("button");
    mcRequest.type = "submit";
    mcRequest.id = "addCard";
    mcRequest.innerHTML = "Create MC"
    mcForm.append(mcRequest);

    //add event listener for submit form
    mcForm.addEventListener("submit", () => {
      //save the inputted info, then delete the form.
      event.preventDefault();
      let formInfo = {
        question: mcForm.mcQuestion.value,
        answer: mcForm.mcAnswer.value,
        explanation: mcForm.mcExplanation.value
      };
      multipleChoiceEntry.remove();

      //create a new article that contains the question, allows option entry

      //create question, append to new article
      let mcCreate = document.createElement("article");
      let question = document.createElement("p");
      question.innerHTML = "Question: " + formInfo.question;
      mcCreate.append(question);

      //create form, append to article
      let addOption = document.createElement("form");
      mcCreate.append(addOption);

      //create label and submit buttons, append to form
      let inputOption = document.createElement("button");
      let inputField = document.createElement("input");
      inputOption.type = "submit";
      inputOption.id = "submitOption";
      inputOption.innerHTML = "Add This Option";
      inputField.type = "text";
      inputField.id = "addedOption";
      addOption.append(inputField);
      addOption.append(inputOption);

      //create button to finish multiple choice // QUESTION:
      let saveButton = document.createElement("button")
      saveButton.class = "saveMC";
      saveButton.innerHTML = "Save Question";
      mcCreate.append(saveButton);

      //add the new article to the node
      node.appendChild(mcCreate);

      //what to do if addOption is clicked
      addOption.addEventListener("submit", () => {
        event.preventDefault();
        let newOption = document.createElement("input");
        newOption.type = "radio";
        let option = addOption.addedOption.value
        newOption.name = option;
        let inputAnswer = formInfo.answer;

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
            mcCreate.append(newArticle);
            newArticle.style.backgroundColor = "#ffccbb";
          } else {
            let response = document.createElement("p");
            response.innerHTML = "Correct!";
            newArticle.append(response);
            mcCreate.append(newArticle);
            newArticle.style.backgroundColor = "#90EE90";
          }
        })
        question.appendChild(brk);
        question.appendChild(newOption);
        newOption.after(optionLabel);
      })

      saveButton.addEventListener("click", () => {
        mcCreate.querySelector("#submitOption").remove();
        mcCreate.querySelector("#addedOption").remove();
        saveButton.remove();
      })
    })

    MultipleChoice.count++;

    node.appendChild(multipleChoiceEntry);

  }
}

MultipleChoice.blotName = 'MultipleChoice';
MultipleChoice.tagName = 'DIV';
MultipleChoice.className = 'ql-MultipleChoice';

Quill.register(MultipleChoice);

var MultipleChoiceButton = document.querySelector('#MultipleChoice');
MultipleChoiceButton.addEventListener('click', function () {

  try {
    quill.getSelection() || quill.setSelection(0, 0);
  } catch (e) {
    quill.setSelection(0, 0);
  }
  var format = quill.getFormat();
  if (format.custom) {
    quill.format('custom', '');
  } else {
    quill.format('custom', 'test');
  }

  const cursorPosition = quill.getSelection().index;
  // quill.insertText(cursorPosition, "<button>Bob</button>");
  quill.updateContents([
    { insert: { MultipleChoice: 1 } },
  ]);
});


// initialize stuff
quill.on('editor-change', function (eventName, ...args) {
  if (quill.getFormat().custom) {
    longAnswerButton.classList.add('ql-active');
  } else {
    longAnswerButton.classList.remove('ql-active');
  }
});
