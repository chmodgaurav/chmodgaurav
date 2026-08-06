/* Minimal portfolio JS: year, mobile menu, active nav link. */
(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var nav = document.getElementById("nav");
  var navLinks = document.getElementById("navLinks");
  var burger = document.getElementById("burger");
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var linkMap = {};

  if (navLinks) {
    Array.prototype.forEach.call(navLinks.querySelectorAll("a"), function (a) {
      linkMap[a.getAttribute("href").slice(1)] = a;
    });
  }

  function onScroll() {
    if (nav) nav.classList.toggle("is-stuck", window.scrollY > 24);
    var current = null;
    sections.forEach(function (s) {
      if (s.getBoundingClientRect().top <= window.innerHeight * 0.35) current = s.id;
    });
    Object.keys(linkMap).forEach(function (id) {
      linkMap[id].classList.toggle("is-active", id === current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
