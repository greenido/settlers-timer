var myAudio = new Audio("alert.mp3");
//
//
//
function Timer(Element, Time, Name) {
  var element = Element;
  var time = Time;
  var originalTime = Time;
  var name = Name;

  var interval = setInterval(timeCallBack, 1000);
  var isPaused = false;
  element.addEventListener("click", onClick);
  setName(name);
  timeCallBack();
  onClick();

  function getTimeElement() {
    return element.getElementsByClassName("time")[0];
  }

  function getNameElement() {
    return element.getElementsByClassName("name")[0];
  }

  function setName(name) {
    getNameElement().textContent = name;
  }

  function timeCallBack() {
    if (time <= 0) {
      onEnd(getNameElement());
    }

    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    getTimeElement().textContent = minutes + ":" + seconds;
    time -= 1;
  }

  function onClick(event) {
    if (isPaused) {
      interval = setInterval(timeCallBack, 1000);
    } else {
      clearInterval(interval);
    }
    isPaused = !isPaused;
  }

  //
  //
  //
  function onEnd(name) {
    myAudio.play();
    //document.body.style.backgroundColor = "red";
    clearInterval(interval);
    isPaused = true;
    time = 0; //originalTime;
    let msgs = ["<h2>🤠 Almost Mate! Don't give up...</h2>", "<h2>😉 Get them next time!</h2>", "<h2>😎 It's all about having fun</h2>",
                "<h2>😜 You will win on the next game!</h2>"];
    let curMsg = msgs[Math.floor(Math.random() * msgs.length)];

    $("#status").append(curMsg + "<h3>"+ name.innerText + " is out of the game!</h3>");
    $("#status").show();
    // setTimeout(function() {
    //   $("#status").hide();
    // }, 3000)
  }
}

//
//
//
function Timers(Element) {
  var timers = [];
  var element = Element;

  this.addTimer = function () {
    if (timers.length >= 4) {
      return;
    }
    else if (timers.length == 3) {
      $(".add-timer").hide();
    }
    var name = prompt("Player Name");
    var time = prompt("The length of your timer in seconds (e.g. 15min * 60sec = 900)");

    name = name || "Timer " + (timers.length + 1);

    if (isNaN(parseFloat(time))) {
      time = 10 * 60;
    }

    time = Math.floor(time) || 10 * 60;
    var timerElement = document.createElement("div");
    timerElement.classList.add("timer");

    var nameElement = document.createElement("div");
    nameElement.classList.add("name");
    timerElement.appendChild(nameElement);

    var timeElement = document.createElement("div");
    timeElement.classList.add("time");
    timerElement.appendChild(timeElement);
    element.appendChild(timerElement);
    timers.push(new Timer(timerElement, time, name));
  }

  element.getElementsByClassName("add-timer")[0].addEventListener("click", this.addTimer);
}

//
var timers = new Timers(document.getElementsByClassName("timer-container")[0]);

//
//
//
$(document).ready(function() {
  console.log("-- starting the party --");
  $("#status").hide();
  $("#help-area").hide();

  // Button to let users restart everything
  $("#start-game-but").click(function() {
    location.reload();
  });

  // The 'help' dialog
  $(".help-icon").click(function () {
    $("#help-area").show();
  });

  $(".close-but").click(function() {
    $("#help-area").hide();
    $("#status").hide();
  });
});