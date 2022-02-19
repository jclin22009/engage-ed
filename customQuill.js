var editor = new Quill('#editor', {
  modules: { toolbar: '#toolbar' },
  theme: 'snow'
});

var Parchment = Quill.import("parchment");

let CustomClass = new Parchment.Attributor.Class('custom', 'ql-custom', {
  scope: Parchment.Scope.INLINE
});

Quill.register(CustomClass, true);

var customButton = document.querySelector('#custom-button');
customButton.addEventListener('click', function() {
  var format = quill.getFormat();
  if(format.custom) {
    quill.format('custom', '');
  } else {
    quill.format('custom', 'test');
  }
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "amogus");
  this.quill.setSelection(cursorPosition + 1);
  console.log("hello from first function");
});

quill.on('editor-change', function(eventName, ...args) {
  if(quill.getFormat().custom) {
    customButton.classList.add('ql-active');
  } else {
    customButton.classList.remove('ql-active');
  }
});