var quill = new Quill('#editor', {
  modules: { toolbar: '#toolbar' },
  theme: 'snow'
});

let BlockEmbed = Quill.import('blots/block/embed');

class Signature extends BlockEmbed {
  static count = 0;
  static create(value) {
    const node = super.create(value);
    node.contentEditable = 'false';
    this._addSignature(node, value);
    return node;
  }

  static value(node) {
    return node.getAttribute(Signature.blotName)
  }

  static _addSignature(node, value) {
    node.setAttribute(Signature.blotName, value);

    // This is a simple switch, but you can use
    // whatever method of building HTML you need.
    // Could even be async.
    switch (value) {
      case 1:
        return this._addSignature1(node);
      default:
        throw new Error(`Unknown signature type ${value}`);
    }
  }

  static _addSignature1(node) {
    Signature.count++;
    const header = document.createElement('h2');
    header.innerHTML = `${Signature.count}. We have a question for you`;
    const field = document.createElement('TEXTAREA');
    field.textContent = 'Type your answer';
 
    node.appendChild(header);
    node.appendChild(field);

  }
}
Signature.blotName = 'signature';
Signature.tagName = 'DIV';
Signature.className = 'ql-signature';

Quill.register(Signature);

var Parchment = Quill.import("parchment");

let CustomClass = new Parchment.Attributor.Class('custom', 'ql-custom', {
  scope: Parchment.Scope.INLINE
});

Quill.register(CustomClass, true);

var customButton = document.querySelector('#custom-button');
customButton.addEventListener('click', function () {

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
    { insert: { signature: 1 } },
  ]);
});

quill.on('editor-change', function (eventName, ...args) {
  if (quill.getFormat().custom) {
    customButton.classList.add('ql-active');
  } else {
    customButton.classList.remove('ql-active');
  }
});