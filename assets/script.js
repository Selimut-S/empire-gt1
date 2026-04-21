const CLICK_ANIMATION_MS = 820;

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
    document.getElementById("popup").classList.remove("hidden");
  }, CLICK_ANIMATION_MS);
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
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
