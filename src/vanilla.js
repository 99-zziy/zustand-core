/* NOTE: 이렇게 구현되어 있을 때 궁금점 ?.?
한 개의 중앙에 집중된 형식의 스토어 구조로 알고 있는데 .... 
create를 할 때마다 각각의 스토어를 생성해서 하는것 같아보이는데 한 개의 중앙에 집중된 형식인가! 
*/
export function create(createState) {
  // 스토어의 상태는 클로저로 관리된다.
  let state;

  // 상태 변경을 구독할 리스너를 Set으로 관리한다.
  const listeners = new Set();

  const setState = (partial, replace) => {
    // nextState => 변경 될 값, 함수로 넘어오면 함수 실행하고, 변수로 넘어오면 그대로 할당해준다.
    const nextState = typeof partial === "function" ? partial(state) : partial;
    // 두개가 다른 값이면
    if (nextState !== state) {
      // state를 previousState에 저장
      const previousState = state;

      // replace가 있으면 state를 nextState로 바꾸고(완전 대체), 없으면 state, nextState의 두 개의 값이 병합됨
      state = replace ? nextState : Object.assign({}, state, nextState);

      // 구독 해두었던 것들 실행
      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  // 모든 리스너를 제거한다.
  const destroy = () => listeners.clear();

  const api = { setState, getState, subscribe, destroy };

  console.log("createState", createState);

  // 인자로 전달받은 createState 함수를 이용하여 최초 상태를 설정한다.
  state = createState(setState, getState, api);

  console.log("state", state);

  return api;
}
