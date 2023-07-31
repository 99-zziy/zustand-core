// createState는 예제에서 보았던 생성자 함수이다.
// 함수 최하단부에 언급되지만 set, get 함수와
// `create` 함수를 통해 만들어지는 내부 API를 인자로 전달받을 수 있다.
export function create(createState) {
  // 스토어의 상태는 클로저로 관리된다.
  let state;

  // 상태 변경을 구독할 리스너를 Set으로 관리한다.
  // 배열로 관리할 경우 중복된 리스너를 솎아내기 어렵기 때문이다.
  const listeners = new Set();

  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (nextState !== state) {
      const previousState = state;

      state = replace ? nextState : Object.assign({}, state, nextState);

      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  // 모든 리스너를 제거한다. 하지만 이미 정의된 상태를 초기화하진 않는다.
  const destroy = () => listeners.clear();

  const api = { setState, getState, subscribe, destroy };

  // 인자로 전달받은 createState 함수를 이용하여 최초 상태를 설정한다.
  state = createState(setState, getState, api);

  return api;
}
