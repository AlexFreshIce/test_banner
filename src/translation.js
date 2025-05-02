const PRICE_CONFIG = {
  yearly_price: "$39.99",
  yearly_week_price: "$0.48",
  weekly_price: "$6.99",
};

async function loadTranslations(lang) {
  try {
    const res = await fetch(`/locales/${lang}.json`);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

function applyTranslations(translations) {
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((el) => {
    const key = el.dataset.i18n;
    let text = translations[key];

    if (!text) {
      console.warn(`No translation found for key: "${key}"`);
      return;
    }

    const priceKey = el.dataset.price;
    if (priceKey) {
      const price = PRICE_CONFIG[priceKey] || "";
      if (!price) {
        console.warn(`No value found in PRICE_CONFIG for: "${priceKey}"`);
        return;
      }
      text = text.replace(/\{\{(\w+)\}\}/g, PRICE_CONFIG[priceKey] || "");
    }

    const styles = window.getComputedStyle(el);
    const fontSize = parseFloat(styles.fontSize);
    const lineHeight = parseFloat(styles.lineHeight) || fontSize;
    const heightBefore = el.offsetHeight;

    el.innerHTML = text;

    const heightAfter = el.offsetHeight;

    if (heightAfter > heightBefore && fontSize > 12) {
      el.style.fontSize = fontSize - 1 + "px";
      el.style.lineHeight = lineHeight - 1 + "px";
    }
  });
}

(async () => {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang");
  const browserLang = navigator.language.slice(0, 2);
  const supported = ["en", "de", "es", "fr", "ja", "pt"];
  const lang = supported.includes(urlLang)
    ? urlLang
    : supported.includes(browserLang)
    ? browserLang
    : "en";

  const translations = (await loadTranslations(lang)) ?? {};
  applyTranslations(translations);
})();
