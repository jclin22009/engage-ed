function uploadEditorContent() {
  var courseTitle = document.getElementById("courseTitle").textContent;

  console.log("sending");
  console.log(courseTitle);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/publish", true);
  xhr.setRequestHeader('X-Title', courseTitle);
  xhr.setRequestHeader('Content-Type', 'text/html');

  var editorContent = document.getElementsByClassName("ql-editor")[0].innerHTML;

  xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          window.location.href = "/afterpublish";
      }
  }

  xhr.send(editorContent);

  //window.location.href = "/";
}
