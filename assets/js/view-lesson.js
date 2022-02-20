function viewLesson() {
  document.cookie = "lesson = " + event.target.innerText;
  window.location.href = "/viewcourse";
}
