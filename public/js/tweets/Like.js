const { getId } = require("../common/handlers");

// Handles the click event on icons.
export function handleClick(event) {
  const el = event.target;
  const id = getId(el);
  console.log("id", id);
}
