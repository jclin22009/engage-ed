import React from "react";
import { render } from "react-dom";
import ReactQuill, { Quill } from "react-quill";
import BlockEmbed from '../node_modules/quill/blots/block';
import "react-quill/dist/quill.snow.css";
var icons = Quill.import('ui/icons');


/*let img = '<img src="https://icon-library.com/images/multiple-choice-icon/multiple-choice-icon-18.jpg" width="18" height="18">'
icons['color'] = img*/

const CustomHeart = () => <span>♥</span>;

function insertHeart() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "amogus");
  this.quill.setSelection(cursorPosition + 1);
  console.log("hello from first function");
/*this.quill.insertEmbed(10, 'image', 'https://quilljs.com/images/cloud.png')*/
}

class Signature extends BlockEmbed {
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
        throw new Error(`Unknown signature type ${ value }`);
    }
  }

  static _addSignature1(node) {
    const div = document.createElement('DIV');
    div.textContent = 'Signature with image';
    const img = document.createElement('IMG');
    img.src = 'https://example.com/image.jpg';

    node.appendChild(div);
    node.appendChild(img);
  }
}
Signature.blotName = 'signature';
Signature.tagName = 'DIV';
Signature.className = 'ql-signature';

Quill.register(Signature);

const CustomOther = () => <span>Test</span>;

const value = `<h1>New content here</h1>`

function insertOther() {
  const cursorPosition = this.quill.getSelection().index;
  const delta = this.quill.clipboard.convert(value)
  this.quill.setContents(delta, 'silent');
  console.log("hello from function");
  this.quill.setSelection(cursorPosition + 1);
/*this.quill.insertEmbed(10, 'image', 'https://quilljs.com/images/cloud.png')*/
}

/*
 * Custom toolbar component including the custom heart button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-font">
      <option value="arial" selected>
        Arial
      </option>
      <option value="comic-sans">Comic Sans</option>
      <option value="courier-new">Courier New</option>
      <option value="georgia">Georgia</option>
      <option value="helvetica">Helvetica</option>
      <option value="lucida">Lucida</option>
    </select>
    <select className="ql-size">
      <option value="extra-small">Size 1</option>
      <option value="small">Size 2</option>
      <option value="medium" selected>
        Size 3
      </option>
      <option value="large">Size 4</option>
    </select>
    <select className="ql-align" />
    <select className="ql-color" />
    <select className="ql-background" />
    <button className="ql-clean" />
    <button className="ql-insertHeart">
      <CustomHeart />
    </button>
    <button className="ql-insertOther">
      <CustomOther />
    </button>
  </div>
);

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida"
];
Quill.register(Font, true);

/*
 * Editor component with custom toolbar and content containers
 */
class Editor extends React.Component {
  state = { editorHtml: "" };

  handleChange = html => {
    this.setState({ editorHtml: html });
  };

  static modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertHeart: insertHeart,
        insertOther: insertOther
      }
    }
  };

  static formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color"
  ];

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          value={this.state.editorHtml}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          formats={Editor.formats}
        />
      </div>
    );
  }
}

const App = () => (
  <div className="custom-toolbar-example">
    <h3>Custom Toolbar with React Quill (Fully working)</h3>
    <Editor placeholder={"Write something or insert a heart ♥"} />
  </div>
);

render(<App />, document.getElementById("root"));
