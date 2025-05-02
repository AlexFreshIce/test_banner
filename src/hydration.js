const BTN_NAVIGATION = ["https://apple.com/", "https://www.google.com"];

const btn = document.querySelector(".banner__button");
const offers = document.querySelector(".banner__offer-list");

offers.addEventListener("click", (event) => {
  const currentItem = event.target.closest(".banner__offer-item");
  if (!currentItem) return;
  [...offers.children].forEach((item) =>
    item.classList.remove("banner__offer-item--selected")
  );
  currentItem.classList.add("banner__offer-item--selected");
});

btn.addEventListener("click", () => {
  const index = [...offers.children].findIndex((el) => {
    return el.className.includes("banner__offer-item--selected");
  });
  const route = BTN_NAVIGATION[index];
  if (route) {
    window.location.href = route;
  }
});
