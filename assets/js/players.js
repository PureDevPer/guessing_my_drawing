import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
  resetCanvas
} from "./paint";
import { disableChat, enableChat } from "./chat";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");
const time = document.getElementById("jsTime");

let TIMESET = null;

const addPlayers = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

const setNotifs = text => {
  notifs.innerText = "";
  notifs.innerText = text;
};

const timerStart = leftTime => {
  TIMESET = setInterval(() => {
    if (leftTime < 0) {
      clearInterval(TIMESET);
    }
    leftTime--;
    if (isNaN(leftTime)) {
      return String(leftTime);
    }
    time.innerHTML =
      leftTime === 1 ? `${leftTime} second` : `${leftTime} seconds`;
  }, 1000);
};

const timerStop = () => {
  clearInterval(TIMESET);
  TIMESET = null;
  time.innerText = "";
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
  setNotifs("");
  disableCanvas();
  hideControls();
  enableChat();
  timerStart(31);
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  notifs.innerText = `You are the leader, paint: ${word}`;
};

export const handleGameEnded = () => {
  setNotifs("Game Ended.");
  disableCanvas();
  hideControls();
  resetCanvas();
  timerStop();
};

export const handleGameStarting = () => setNotifs("Game will start soon");
