import { create } from "./vanilla.js";

// 스토어 생성
const store = create((set) => ({
  count: 0,
}));

const counterDisplay = document.querySelector("#counter");
const btnIncrease = document.querySelector("#btn-increase");

function increment() {
  store.setState((state) => ({ count: state.count + 1 }));
}

function logState(state) {
  counterDisplay.textContent = state.count;
}

// 상태 변경을 구독
store.subscribe(logState);

btnIncrease.addEventListener("click", () => {
  increment();
});
