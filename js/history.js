import { renderhistory } from "./ui.js";

export function createHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];

  function save() {
    localStorage.setItem("history", JSON.stringify(history));
  }

  return {
    add(entry) {
      history.unshift(entry);
      save();
    },
    get() {
      return [...history];
    },
    clear() {
      history = [];
      save();
      renderhistory(this);
    },
  };
}
