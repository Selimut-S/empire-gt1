const CLICK_ANIMATION_MS = 820;
const REGISTRATION_TEMPLATE = `Hallo salam race admin, saya :
Nama:
User Name TikTok:
Id Game:
User Name Game:
Tahu Informasi Club Dari:
Ingin bergabung dengan club Empire GT1, apakah masih tersedia kuota untuk saya? Terima kasih🤗
`;

let selectedAdminNumber = "";

function runClickAnimation(target) {
  if (!target || target.classList.contains("click-animate")) {
    return;
  }

  target.classList.add("click-animate");
  setTimeout(() => {
    target.classList.remove("click-animate");
  }, CLICK_ANIMATION_MS);
}

function spawnWingEffect(event, interactiveElement) {
  const wing = document.createElement("span");
  wing.className = "click-wing";

  const baseColor = interactiveElement
    ? getComputedStyle(interactiveElement)
        .getPropertyValue("--border-color")
        .trim()
    : "";

  wing.style.left = `${event.clientX}px`;
  wing.style.top = `${event.clientY}px`;
  wing.style.setProperty("--wing-color", baseColor || "#03e9f4");

  document.body.appendChild(wing);
  setTimeout(() => {
    wing.remove();
  }, CLICK_ANIMATION_MS + 40);
}

function injectButtonOutlines() {
  document.querySelectorAll(".animated-button").forEach((button) => {
    if (button.querySelector(".button-outline")) {
      return;
    }

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "button-outline");
    svg.setAttribute("viewBox", "0 0 300 80");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");

    const outer = document.createElementNS(svgNS, "rect");
    outer.setAttribute("class", "button-line button-line--outer");
    outer.setAttribute("x", "2.5");
    outer.setAttribute("y", "2.5");
    outer.setAttribute("width", "295");
    outer.setAttribute("height", "75");
    outer.setAttribute("rx", "16");
    outer.setAttribute("pathLength", "100");

    const inner = document.createElementNS(svgNS, "rect");
    inner.setAttribute("class", "button-line button-line--inner");
    inner.setAttribute("x", "6.5");
    inner.setAttribute("y", "6.5");
    inner.setAttribute("width", "287");
    inner.setAttribute("height", "67");
    inner.setAttribute("rx", "13");
    inner.setAttribute("pathLength", "100");

    svg.appendChild(outer);
    svg.appendChild(inner);
    button.prepend(svg);
  });
}

// POPUP
function showInfoPopup(e) {
  e.preventDefault();

  const button = e.target.closest("button");
  runClickAnimation(button);

  setTimeout(() => {
    const adminPopup = document.getElementById("adminPopup");
    if (adminPopup) {
      adminPopup.classList.remove("hidden");
    }
  }, CLICK_ANIMATION_MS);
}

function closeAdminPopup() {
  const adminPopup = document.getElementById("adminPopup");
  if (adminPopup) {
    adminPopup.classList.add("hidden");
  }
}

function openRulesPopup(e, phoneNumber) {
  e.preventDefault();

  const button = e.target.closest("button");
  runClickAnimation(button);

  selectedAdminNumber = String(phoneNumber || "").replace(/\D/g, "");

  setTimeout(() => {
    const adminPopup = document.getElementById("adminPopup");
    const rulesPopup = document.getElementById("rulesPopup");

    if (adminPopup) {
      adminPopup.classList.add("hidden");
    }
    if (rulesPopup) {
      rulesPopup.classList.remove("hidden");
    }
  }, CLICK_ANIMATION_MS);
}

function closeRulesPopup() {
  const rulesPopup = document.getElementById("rulesPopup");
  if (rulesPopup) {
    rulesPopup.classList.add("hidden");
  }
  showInfoPopupFromInside();
}

function showInfoPopupFromInside() {
  const adminPopup = document.getElementById("adminPopup");
  if (adminPopup) {
    adminPopup.classList.remove("hidden");
  }
}

function copyNicknameFormat(e) {
  e.preventDefault();

  const nicknameElement = document.getElementById("nicknameFormat");
  if (!nicknameElement) {
    return;
  }

  const nicknameText = nicknameElement.textContent.trim();
  navigator.clipboard.writeText(nicknameText).then(() => {
    const button = e.target.closest("button");
    if (!button) {
      return;
    }

    const original = button.textContent;
    button.textContent = "Tersalin!";
    setTimeout(() => {
      button.textContent = original;
    }, 1200);
  });
}

function openWhatsAppRegistration(e) {
  e.preventDefault();

  const button = e.target.closest("button");
  runClickAnimation(button);

  const fallbackNumber = "6281111111111";
  const targetNumber = selectedAdminNumber || fallbackNumber;
  const url = `https://wa.me/${targetNumber}?text=${encodeURIComponent(REGISTRATION_TEMPLATE)}`;

  setTimeout(() => {
    window.open(url, "_blank");
  }, CLICK_ANIMATION_MS);
}

// CLICK EFFECT + DELAYED ACTION
document.addEventListener("click", function (e) {
  const clickable = e.target.closest("a[target='_blank'], button[onclick]");
  if (!clickable) {
    return;
  }

  runClickAnimation(clickable);
  spawnWingEffect(e, clickable);

  const link = e.target.closest("a");
  if (link && link.href && link.target === "_blank") {
    e.preventDefault();
    setTimeout(() => {
      window.open(link.href, "_blank");
    }, CLICK_ANIMATION_MS);
  }
});

injectButtonOutlines();
