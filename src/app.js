import { create } from "./vanilla.js";

// 스토어 생성
const btn1 = create(() => ({
  count: 0,
}));

const btn2 = create(() => ({
  count: 10000,
}));

const counter1Display = document.querySelector("#counter1");
const btn1Increase = document.querySelector("#btn-increase1");

const counter2Display = document.querySelector("#counter2");
const btn2Increase = document.querySelector("#btn-increase2");

function increment() {
  btn1.setState((state) => ({ count: state.count + 1 }));
}

function logState(state, previousState) {
  counter1Display.textContent = state.count;
}

// 상태 변경을 구독
btn1.subscribe(logState);

btn1Increase.addEventListener("click", () => {
  increment();
});

function decrease() {
  btn2.setState((state) => ({ count: state.count - 1 }));
}

function log2State(state, previousState) {
  counter2Display.textContent = state.count;
}

// 상태 변경을 구독
btn2.subscribe(log2State);

btn2Increase.addEventListener("click", () => {
  decrease();
});
