function uploadEditorContent() {
  console.log("among us!!!");
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/publish", true);
  xhr.setRequestHeader('X-Title', 'test');
  xhr.setRequestHeader('Content-Type', 'text/html');

  var editorContent = document.getElementsByClassName("ql-editor")[0].innerHTML;
  xhr.send(editorContent);
}
