function rpsGame(MyChoice) {
  let humanChoice, botChoice;

  humanChoice = MyChoice.id;
  botChoice = TheBotChoice();
  //console.log(humanChoice);
  //console.log(botChoice);
  result = deceideWinner(humanChoice, botChoice);
  //console.log(result);
  messgae = finalMessgae(result);
  //console.log(messgae);
  rpsFrontEnd(MyChoice.id, botChoice, messgae);
}

function TheBotChoice() {
  //pick a random number in [0,2]
  random_num = Math.floor(Math.random() * 3);
  return ["rock", "paper", "scissors"][random_num];
}

function deceideWinner(humanChoice, botChoice) {
  let myData = {
    rock: { rock: 0.5, paper: 0, scissors: 1 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { rock: 0, paper: 1, scissors: 0.5 },
  };
  myScore = myData[humanChoice][botChoice];
  botScore = myData[botChoice][humanChoice];
  return [myScore, botScore];
}
function finalMessgae([s1, s2]) {
  if (s1 === 0) {
    return { message: "You Lost :(", color: "red" };
  } else if (s1 === 0.5) {
    return { message: "Draw ", color: "yellow" };
  } else {
    return { message: "You Win :)", color: "green" };
  }
}
function rpsFrontEnd(humanChoice, botChoice, message) {
  let imgData = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  //remove all images
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  let humanDiv = document.createElement("div");
  let botDiv = document.createElement("div");
  let mesgDiv = document.createElement("div");

  humanDiv.innerHTML = "";
  botDiv.innerHTML = "";
  mesgDiv.innerHTML = "";

  humanDivElement = buildElement({
    tagName: "img",
    id: "humanchoice",
    src: imgData[humanChoice],
    height: 150,
    width: 150,
  });

  botDivElement = buildElement({
    tagName: "h1",
    id: "message",
    text: message["message"],
    style: "color: " + message["color"],
  });
  messageDivElement = buildElement({
    tagName: "img",
    id: "botchoice",
    src: imgData[botChoice],
    height: 150,
    width: 150,
  });

  document.getElementById("flex-box-rps-div").appendChild(humanDivElement);
  document.getElementById("flex-box-rps-div").appendChild(botDivElement);
  document.getElementById("flex-box-rps-div").appendChild(messageDivElement);
}

//We use this function because we dont want to use the innerHTML (security issues)
function buildElement(obj) {
  if (obj["tagName"] === "text") {
    return document.createTextNode(obj["text"]);
  } else {
    // Create element
    var parentNode = document.createElement(obj["tagName"].toUpperCase());
    var index;

    // Set attributes
    for (index in obj) {
      if (index !== "tagName" && index !== "text" && index !== "children") {
        parentNode.setAttribute(index, obj[index]);
      }
    }

    // Add children
    if ("children" in obj) {
      for (index in obj["children"]) {
        parentNode.appendChild(buildElement(obj["children"][index]));
      }
    } else if ("text" in obj) {
      parentNode.appendChild(document.createTextNode(obj["text"]));
    }

    return parentNode;
  }
}
