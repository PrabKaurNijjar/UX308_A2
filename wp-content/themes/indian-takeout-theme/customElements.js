import { Order } from "https://PrabKaurNijjar.github.io/UX308_A2/Order.js";

class Chat extends HTMLElement {
  constructor() {
    super();
    this.oOrder = new Order("123-456-7891");
  }

  sendMessage(evt) {
    evt.preventDefault();
    const msg = this.input.value.trim();
    if (!msg) return;
    this.input.value = "";
    this.writeLine(msg);
  }

  writeLine(text) {
    this.messages.insertAdjacentHTML("beforeend",
      `<li class="message-item item-secondary">You: ${this.escapeHtml(text)}</li>`);
    const typingId = `typing_${Date.now()}`;
    this.messages.insertAdjacentHTML("beforeend",
      `<li id="${typingId}" class="message-item item-primary typing">Bot is typing…</li>`);
    this.messages.scrollTop = this.messages.scrollHeight;
    const aMessages = this.oOrder.handleInput(text);
    if (this.oOrder.isDone) { this.oOrder = new Order("456-789-1023"); }
    setTimeout(() => {
      const typingEl = this.querySelector(`#${typingId}`);
      if (typingEl) typingEl.remove();
      for (const message of aMessages) {
        this.messages.insertAdjacentHTML("beforeend",
          `<li class="message-item item-primary">Bot: ${this.escapeHtml(message)}</li>`);
      }
      this.messages.scrollTop = this.messages.scrollHeight;
    }, 400);
  }

  escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  }

  connectedCallback() {
    const suffix = (Math.random() * 100).toFixed().toString();
    this.innerHTML = `
      <style>
        .chat${suffix} ul { list-style: none; padding-left: 0; margin: 0; }
        .chat${suffix} { width: 100%; height: 100%; background-color: #fff; border-radius: 12px; display:flex; flex-direction: column; }
        .chat${suffix} .messages { display: flex; flex-direction: column; height: 100%; }
        .chat${suffix} .message-list { flex: 1; overflow-y: auto; padding: 10px; background: #f9fafb; border-radius: 12px; }
        .chat${suffix} .message-item { padding: 12px 14px; border-radius: 14px; margin: 10px 0; font-size: 14px; line-height: 1.25; white-space: pre-wrap; }
        .chat${suffix} .item-primary { background-color: #e5e7eb; color: #111827; margin-right: 3em; border-bottom-left-radius: 6px; }
        .chat${suffix} .item-secondary { background-color: #2563eb; color: #fff; margin-left: 3em; border-bottom-right-radius: 6px; }
        .chat${suffix} .typing { opacity: 0.75; font-style: italic; }
        .chat${suffix} .message-input { display: flex; gap: 10px; padding: 10px; border-top: 1px solid #e5e7eb; }
        .chat${suffix} .message-input input { flex: 1; padding: 10px 12px; border-radius: 999px; border: 1px solid #d1d5db; outline: none; }
        .chat${suffix} .message-input button { padding: 10px 14px; border-radius: 12px; border: none; cursor: pointer; background: #111827; color: white; font-weight: 700; }
      </style>
      <div class="chat${suffix}">
        <div class="messages">
          <ul class="message-list"></ul>
          <form class="message-input">
            <input type="text" placeholder="Type: menu" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>`;
    this.input = this.querySelector("input");
    this.messages = this.querySelector(".message-list");
    this.querySelector("form").addEventListener("submit", this.sendMessage.bind(this));
    this.messages.insertAdjacentHTML("beforeend",
      `<li class="message-item item-primary">Bot: Hi! Type menu to start.</li>`);
    this.input.focus();
  }
}

customElements.define("x-chat", Chat);