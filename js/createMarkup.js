export function createMarkup(tagName, className) {
  const elment = document.createElement(tagName);

  if (className) {
    if (!Array.isArray(className)) {
      className = [className];
      console.log(!Array);
    }
    className.forEach((name) => {
      elment.classList.add(name);
    });
  }
  return elment;
}

export function addAttribute(elment, attribute) {
  if (attribute instanceof Object) {
    const keys = Object.keys(attribute);
    const values = Object.values(attribute);

    for (let i = 0; i < keys.length; i++) {
      elment.setAttribute(keys[i], values[i]);
    }
  }
  return elment;
}

export function innerContent(elment, content) {
  elment.innerText(content);
  return elment;
}
