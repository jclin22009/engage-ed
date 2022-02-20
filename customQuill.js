var editor = new Quill('#editor', {
  modules: {
    toolbar: [
      [{ header: [1, 2, 3,  false] }],
      ['bold', 'italic', 'underline','strike'],
      ['image'],
      ['link'],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ]
  },
  theme: 'snow'
});

function getHtml() {
  console.log(editor.root.innerHTML);
  /*const fs = require('node_modules/fs').promises;*/
  /*var textData = editor.root.innerHTML;
  await fs.writeFile('myFile.txt', textData);*/
}

var Parchment = Quill.import("parchment");

let CustomClass = new Parchment.Attributor.Class('custom', 'ql-custom', {
  scope: Parchment.Scope.INLINE
});

Quill.register(CustomClass, true);

var customButton = document.querySelector('#custom-button');
customButton.addEventListener('click', function() {
  var format = editor.getFormat();
  if(format.custom) {
    editor.format('custom', '');
  } else {
    editor.format('custom', 'test');
  }
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "amogus");
  this.quill.setSelection(cursorPosition + 1);
  console.log("hello from first function");
});

editor.on('editor-change', function(eventName, ...args) {
  if(editor.getFormat().custom) {
    customButton.classList.add('ql-active');
  } else {
    customButton.classList.remove('ql-active');
  }
});
