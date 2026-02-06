$(function () {
  // console.log(user, room_id); // From room.html

  /* === Ruta para el web socket == */
  // fragmento para http / https
  let scheme = window.location.protocol === "https:" ? "wss" : "ws";
  let chatSocketUrl = `${scheme}://${window.location.host}/ws/chat/room/${room_id}/`;
  // console.log("WS URL:", chatSocketUrl);

  // let url = "ws://" + window.location.host + "/ws/chat/room/" + room_id + "/";
  // console.log(url);
  // console.log(window.location.host);

  /* === WebSocket === */
  let chatWebSocket = new WebSocket(chatSocketUrl);
  // console.log(chatWebSocket);

  chatWebSocket.onopen = function (e) {
    console.log("WebSocket abierto");
  };

  chatWebSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    // console.log(data.type);
    if (data.type === "chat_message") {
      const msj = data.message;
      const username = data.username;
      const datetime = data.datetime;
      const sender_id = data.sender_id;
      const current_user_id = parseInt("{{ request.user.id }}");

      // Determinar si es mensaje propio o de otro usuario
      const isOwnMessage = sender_id === current_user_id;
      const messageClass = isOwnMessage ? "own" : "other";

      const messageHTML = `
        <div class="message-box ${messageClass}">
          <div class="message-content">
            ${msj}
          </div>
          <div class="message-meta">
            <strong>${username}</strong> • ${datetime}
          </div>
        </div>
      `;

      document.querySelector("#boxMessages").innerHTML += messageHTML;
      
      // Auto-scroll al último mensaje
      const messagesContainer = document.querySelector("#boxMessages");
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } else if (data.type === "user_list") {
      let user_listHTML = "";
      const usersCount = data.users.length;

      for (const username of data.users) {
        const isCurrentUser = username === user;
        const userClass = isCurrentUser ? "current-user" : "";
        const icon = isCurrentUser ? "fa-user-check" : "fa-user";
        user_listHTML += `<li class="${userClass}"><i class="fas ${icon}"></i>${username}</li>`;
      }

      document.querySelector("#usersList").innerHTML = user_listHTML;
      document.querySelector("#usersCount").textContent = usersCount;
    }
  };

  chatWebSocket.onclose = function (e) {
    console.log("WebSocket cerrado");
  };

  /*===================== JS =====================*/

  const btnChat = document.querySelector("#btnMessage");
  const inputChat = document.querySelector("#inputMessage");

  /*===================== Eventos =====================*/
  btnChat.addEventListener("click", sendMessage);
  inputChat.addEventListener("keypress", inputPress);

  /*=== keyCode => 13 => Tecla Enter  ===*/
  function inputPress(event) {
    if (event.keyCode === 13) {
      sendMessage();
    }
  }

  /*===================== Funciones =====================*/
  function sendMessage() {
    let message = document.querySelector("#inputMessage");
    // console.log(message.value.trim());

    // para reiniciar el input
    if (message.value.trim() !== "") {
      loadMessageHTML(message.value.trim());
      // ===> IMPORTANTE!! ===> Enviar mensaje al servidor
      chatWebSocket.send(
        JSON.stringify({
          type: "chat_message",
          message: message.value.trim(),
        })
      );

      console.log(message.value.trim());

      message.value = "";
    }
  }

  /*=== Inserta en el HTML ===*/
  function loadMessageHTML(message) {
    let currentDatetime = new Date();
    let dateObject = new Date(currentDatetime);

    let year = dateObject.getFullYear();
    let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    let day = ("0" + dateObject.getDate()).slice(-2);
    let hours = ("0" + dateObject.getHours()).slice(-2);
    let minutes = ("0" + dateObject.getMinutes()).slice(-2);
    let seconds = ("0" + dateObject.getSeconds()).slice(-2);

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    const messageHTML = `
      <div class="message-box own">
        <div class="message-content">
          ${message}
        </div>
        <div class="message-meta">
          <strong>${user}</strong> • ${formattedDate}
        </div>
      </div>
    `;
    
    document.querySelector("#boxMessages").innerHTML += messageHTML;
    
    // Auto-scroll al último mensaje
    const messagesContainer = document.querySelector("#boxMessages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});