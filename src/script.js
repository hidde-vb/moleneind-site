import emailjs from "@emailjs/browser";
import "./css/main.css";

/* Hamburger Menu */

const hamburger = document.getElementById("hamburger");
const headerNav = document.getElementById("navigation");

let active = false;

hamburger.onclick = () => {
  active = !active;
  if (active) {
    hamburger.className = "hamburger active";
    headerNav.className = "vertical";
  } else {
    hamburger.className = "hamburger";
    headerNav.className = "";
  }
};

const headerIcon = document.getElementById("header-icon");

const showOnScroll = () => {
  if (window.scrollY <= 50) {
    headerIcon.className = "header-icon";
  } else {
    headerIcon.className = "header-icon hide";
  }
};

window.addEventListener("scroll", showOnScroll);

/* JSMail */

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await emailjs.send("service_4f1u8bm", "template_zkhplpa", {
      name: document.querySelector("#user_name").value,
      message: document.querySelector("#message").value,
      email: document.querySelector("#user_mail").value,
      phone: document.querySelector("#user_phone").value,
      address: document.querySelector("#user_address").value,
    });

    document.querySelector("#contact-form").classList.add("hidden");
    document.querySelector("#succes-message").classList.remove("hidden");

    const snack = document.querySelector("#snackbar");
    snack.className = "show";
    setTimeout(() => {
      snack.className = snack.className.replace("show", "");
    }, 5000);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

(() => {
  emailjs.init({
    publicKey: "82LYrTyAJukkNcSym",
    blockHeadless: true,
  });

  window.onload = () => {
    document
      .getElementById("contact-form")
      .addEventListener("submit", handleSubmit);
  };
})();
