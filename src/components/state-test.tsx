import {useState} from "react";
import HookTest from "./hook-test";

function StateTest() {
  const [clicked, setClicked] = useState(0);

  function increment() {
    setClicked(clicked + 1);
    console.log("+1");
  }

  function decrement() {
    setClicked(clicked - 1);
    console.log("-1");
  }

  return (
    <>
      <HookTest increment={increment} decrement={decrement} clicked={clicked} />
    </>
  );
}

export default StateTest;
