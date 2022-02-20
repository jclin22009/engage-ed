function viewLesson() {
  var req = new XMLHttpRequest();
  req.open('GET', '/viewcourse', false); //true means request will be async
  req.setRequestHeader('X-Lesson', event.target.innerText);
  req.send();
  document.write(req.response);*/
  //document.cookie = event.target.innerText;
  window.location.href = "/viewcourse";
}
