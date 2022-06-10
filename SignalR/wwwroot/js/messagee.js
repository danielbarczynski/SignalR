"use strict";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("/messages")
  .build();

connection.on("ReceiveMessage", function (message) {
  let div = document.createElement("div");
  div.textContent = message;
  document.getElementById("messages").appendChild(div); // append dodaje kolejnego diva do list
});

connection.start().catch(function (err) {
  return console.error(err.toString());
});

document
  .getElementById("sendButton")
  .addEventListener("click", function (event) {
    let message = document.getElementById("message").value;
    connection.invoke("SendMessageToAll", message).catch(function (err) {
      return console.error(err.toString());
    });
    event.preventDefault();
    document.getElementById("message").value = "";
  });
