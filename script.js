/* Jiaxi Wang — interdisciplinary portfolio
   Vanilla JS: header state, mobile nav, scroll reveal, copy-email. */

(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".nav");
  var navToggle = document.querySelector(".nav__toggle");
  var navLinks = document.querySelectorAll(".nav__links a");

  /* ---------- header state ---------- */

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile navigation ---------- */

  function setNavOpen(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle("nav--open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      setNavOpen(!nav.classList.contains("nav--open"));
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setNavOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setNavOpen(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 760) setNavOpen(false);
  });

  /* ---------- scroll reveal ---------- */

  var revealItems = document.querySelectorAll("[data-reveal]");

  function revealAll() {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  if ("IntersectionObserver" in window && revealItems.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealAll();
  }

  /* ---------- copy email ---------- */

  var copyButtons = document.querySelectorAll("[data-copy]");

  function showStatus(message) {
    var status = document.getElementById("copy-status");
    if (!status) return;
    status.textContent = message;
    window.setTimeout(function () {
      status.textContent = "";
    }, 2600);
  }

  function fallbackCopy(text) {
    var helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "absolute";
    helper.style.left = "-9999px";
    document.body.appendChild(helper);
    helper.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(helper);
    return ok;
  }

  copyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var address = button.getAttribute("data-copy") || "";
      if (!address) return;

      function done(ok) {
        if (ok) {
          var label = button.getAttribute("data-label") || "Copied";
          button.textContent = label;
          showStatus("Email address copied to clipboard");
          window.setTimeout(function () {
            button.textContent = "Copy";
          }, 2600);
        } else {
          showStatus("Copy failed — select the address above manually");
        }
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(address).then(
          function () { done(true); },
          function () { done(fallbackCopy(address)); }
        );
      } else {
        done(fallbackCopy(address));
      }
    });
  });

  /* ---------- footer year ---------- */

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
