class Blur {
  div;
  constructor(message) {
    const oBody = window.top?.document.querySelector("body");
    this.div = window.top?.document.createElement("div");
    this.div.id = "blurred_background";
    this.div.innerHTML = `<style>
      #blurred_background{
        position:fixed;
        top:0;
        left:0;
        height:100vh;
        width:100vw;
        backdrop-filter: blur(8px);
        background: rgba(0,0,0,0.15);
        z-index:1001;
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 24px;
        box-sizing: border-box;
      }
      #blurred_background .modal{
        width: min(720px, 92vw);
        height: min(820px, 92vh);
        background: white;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.25);
        overflow: hidden;
        position: relative;
        display:flex;
        flex-direction: column;
      }
      #blurred_background .modalHeader{
        background: #111827;
        color: white;
        padding: 12px 14px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap: 10px;
      }
      #blurred_background .modalHeader strong{
        font-size: 14px;
        letter-spacing: 0.2px;
      }
      #blurred_background .modalHeader button{
        background: rgba(255,255,255,0.15);
        border: none;
        color: white;
        padding: 8px 10px;
        border-radius: 10px;
        cursor: pointer;
      }
      #blurred_background .modalBody{
        flex: 1;
        padding: 12px;
      }
      #blurred_background .hint{
        font-size: 12px;
        opacity: 0.9;
        margin-left: 10px;
      }
    </style>
    ${message}`;
    oBody?.insertAdjacentElement("afterbegin", this.div);
  }
  close() {
    this.div.remove();
  }
}

const suffix = (Math.random() * 100).toFixed().toString();

document.querySelector("body").insertAdjacentHTML(
  "beforeend",
  `
  <style>
    #fab${suffix}{
      position: fixed;
      bottom: 18px;
      right: 18px;
      padding: 12px 14px;
      border-radius: 999px;
      border: none;
      background: #111827;
      color: white;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }
  </style>
  <button id="fab${suffix}">Chat</button>
  `
);

document.querySelector(`#fab${suffix}`).addEventListener("click", () => {
  const blur = new Blur(`
    <div class="modal">
      <div class="modalHeader">
        <div>
          <strong>Indian Takeout Bot</strong>
          <span class="hint">Try: menu • order biryani size large toppings raita</span>
        </div>
        <div>
          <button id="clear${suffix}" title="Close">Close</button>
        </div>
      </div>
      <div class="modalBody">
        <x-chat></x-chat>
      </div>
    </div>
  `);

  document.querySelector(`#clear${suffix}`).addEventListener("click", () => blur.close());
});