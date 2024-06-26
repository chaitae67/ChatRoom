"use strict";

const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", (event) =>{
  if(event.keyCode === 13) {
    if (chatInput.value.trim() !== "") { // 입력 값이 빈 문자열이 아닌 경우에만 전송
      send();
      chatInput.value = ""; // 전송 후 입력 필드 초기화
    }
  }
});

function send(){
  const param = {
    name: nickname.value,
    msg: chatInput.value
  }
  socket.emit("chatting", param);
}

sendButton.addEventListener("click", () => {
  if (chatInput.value.trim() !== "") { // 입력 값이 빈 문자열이 아닌 경우에만 전송
    send();
    chatInput.value = ""; 
  }
});

socket.on("chatting", (data)=>{
  const { name, msg, time } = data;
  const item = new LiModel(name, msg, time);
  item.makeLi();
  displayContainer.scrollTo(0, displayContainer.scrollHeight)
});



function LiModel(name, msg, time){
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = ()=>{
    const li = document.createElement("li");
    li.classList.add(nickname.value === this.name ? "sent": "received");
    const dom = `<span class="profile">
      <span class="user">${this.name}</span>
      <img class="image" src="https://source.unsplash.com/random/50x50" alt="any">
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>
    </li>`;
    li.innerHTML= dom;
    chatList.appendChild(li);
  }
}
