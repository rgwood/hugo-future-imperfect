/*
	Future Imperfect by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

let body = document.querySelector("body"),
  menu = document.querySelector("#menu"),
  touchStartPosX = null,
  touchStartPosY = null;

setUpMenuPanel();
setUpSearchForm();

function setUpMenuPanel() {
  const visibilityToggleElementId = "menuToggler",
    visibilityToggleClass = "is-menu-visible",
    delayMs = 500,
    panelSide = "right";

  // Set up elements that open the menu when clicked
  for (var menuToggler of document.querySelectorAll(
    `#${visibilityToggleElementId}`
  )) {
    menuToggler.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      body.classList.toggle(visibilityToggleClass);
    });
  }

  menu.hide = function(event) {
    // Already hidden? Bail.
    if (!body.classList.contains(visibilityToggleClass)) return;

    // If an event was provided, cancel it.
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Hide.
    body.classList.remove(visibilityToggleClass);

    // Post-hide stuff.
    window.setTimeout(function() {
      // Reset scroll position
      menu.scrollTop = 0;

      // Reset forms
      let forms = menu.querySelectorAll("form");
      for (let form of forms) {
        form.reset();
      }
    }, delayMs);
  };

  menu.addEventListener("touchstart", event => {
    touchStartPosX = event.touches[0].pageX;
    touchStartPosY = event.touches[0].pageY;
  });

  // Close menu on swipe, prevent menu scrolls from scrolling the main content
  menu.addEventListener("touchmove", event => {
    if (touchStartPosX === null || touchStartPosY === null) return;

    let diffX = touchStartPosX - event.touches[0].pageX,
      diffY = touchStartPosY - event.touches[0].pageY,
      swipeOccurred = false,
      boundary = 20,
      delta = 50;

    switch (panelSide) {
      case "left":
        swipeOccurred =
          diffY < boundary && diffY > -1 * boundary && diffX > delta;
        break;

      case "right":
        swipeOccurred =
          diffY < boundary && diffY > -1 * boundary && diffX < -1 * delta;
        break;

      case "top":
        swipeOccurred =
          diffX < boundary && diffX > -1 * boundary && diffY > delta;
        break;

      case "bottom":
        swipeOccurred =
          diffX < boundary && diffX > -1 * boundary && diffY < -1 * delta;
        break;

      default:
        break;
    }

    if (swipeOccurred) {
      touchStartPosX = null;
      touchStartPosY = null;
      menu.hide();
    }

    // Prevent menu scroll from scrolling the main page
    if (
      (diffY < 0 && menu.scrollTop <= 0) ||
      (diffY > 0 && menu.scrollTop + menu.offsetHeight >= menu.scrollHeight)
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  // Hide menu on link click
  for (let link of menu.querySelectorAll("a")) {
    link.addEventListener("click", () => menu.hide());
  }

  // Hide menu on body click/tap.
  body.addEventListener("click", event => menu.hide(event));
  body.addEventListener("touchend", event => menu.hide(event));

  // Prevent certain events inside the panel from bubbling and closing the panel
  menu.addEventListener("click", event => event.stopPropagation());
  menu.addEventListener("touchend", event => event.stopPropagation());
  menu.addEventListener("touchstart", event => event.stopPropagation());
  menu.addEventListener("touchmove", event => event.stopPropagation());

  // Hide menu on ESC.
  window.addEventListener("keydown", function(event) {
    if (event.keyCode == 27) menu.hide(event);
  });
}

function setUpSearchForm() {
  let searchPane = document.querySelector("#search-pane"),
    searchFormContainer = document.querySelector("#search-form-container"),
    searchInput = searchFormContainer.querySelector("#search-input");
  searchPane.addEventListener("click", () => {
    searchFormContainer.classList.add("visible");
    searchInput.focus();
  });

  searchInput.addEventListener("blur", () => {
    window.setTimeout(function() {
      searchFormContainer.classList.remove("visible");
    }, 100);
  });

  searchInput.addEventListener("keydown", () => {
    const escapeKeyCode = 27;
    if (event.keyCode == escapeKeyCode) searchInput.blur();
  });
}
