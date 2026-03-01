export function createHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];

  function save() {
    localStorage.setItem("history", JSON.stringify(history));
  }

  return {
    add(entry) {
      history.push(entry);
      save();
    },
    get() {
      return [...history];
    },
    clear() {
      history = [];
      save();
    }
  };
}