"use strict";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("/messages")
  .build();

connection.start().catch(function (err) {
  return console.error(err.toString());
});

// sending messages

document
  .getElementById("sendButton") // <input type="button" id="sendButton" value="Send Message" />
  .addEventListener("click", function (event) {
    let message = document.getElementById("message").value; // <textarea name="message" id="message" rows="3"></textarea>
    connection.invoke("SendMessageToAll", message).catch(function (err) {
      return console.error(err.toString());
    });
    event.preventDefault();
    document.getElementById("message").value = "";
  });

document
  .getElementById("sendToMeButton")
  .addEventListener("click", function (event) {
    let message = document.getElementById("message").value;
    connection.invoke("SendToClient", message).catch(function (err) {
      return console.error(err.toString());
    });
    event.preventDefault();
    document.getElementById("message").value = "";
  });

document
  .getElementById("sendToGroupButton")
  .addEventListener("click", function (event) {
    let message = document.getElementById("message").value;
    connection.invoke("SendToGroup", "group", message).catch(function (err) {
      return console.error(err.toString());
    });
    event.preventDefault();
    document.getElementById("message").value = "";
  });

// then receiving

connection.on("ReceiveMessage", function (message) {
  let div = document.createElement("div");
  div.textContent = message;
  document.getElementById("messages").appendChild(div); // <div id-"messages"></div> append dodaje kolejnego diva do listy
});

document
  .getElementById("joinGroup")
  .addEventListener("click", function (event) {
    connection.invoke("JoinGroup", "group").catch(function (err) {
      return console.error(err.toString());
    });
    event.preventDefault();
  });
