/* Jiaxi Wang — personal research website
   Vanilla JS: header state, mobile nav, scroll reveal,
   active-section tracking, copy-email interaction. */

(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".nav");
  var navToggle = document.querySelector(".nav__toggle");
  var navLinks = document.querySelectorAll(".nav__links a");
  var sections = document.querySelectorAll("main section[id]");

  /* ---------- header state ---------- */

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealAll();
  }

  /* ---------- active navigation section ---------- */

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            var matches = link.getAttribute("href") === "#" + id;
            link.classList.toggle("is-active", matches);
            if (matches) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---------- copy email ---------- */

  var copyButton = document.querySelector("[data-copy]");
  var copyStatus = document.getElementById("copy-status");
  var copyTimer = null;

  function showStatus(message) {
    if (!copyStatus) return;
    copyStatus.textContent = message;
    if (copyTimer) window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(function () {
      copyStatus.textContent = "";
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

  if (copyButton) {
    copyButton.addEventListener("click", function () {
      var address = copyButton.getAttribute("data-copy") || "";
      if (!address) return;

      var done = function (ok) {
        if (ok) {
          copyButton.classList.add("is-copied");
          copyButton.textContent = "Copied";
          showStatus("Email address copied to clipboard");
          window.setTimeout(function () {
            copyButton.classList.remove("is-copied");
            copyButton.textContent = "Copy";
          }, 2600);
        } else {
          showStatus("Copy failed — select the address above manually");
        }
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(address).then(
          function () {
            done(true);
          },
          function () {
            done(fallbackCopy(address));
          }
        );
      } else {
        done(fallbackCopy(address));
      }
    });
  }

  /* ---------- footer year ---------- */

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
