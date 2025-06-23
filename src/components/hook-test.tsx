type HookTestProps = {increment: () => void; decrement: () => void; clicked: number};

function HookTest(props: HookTestProps) {
  const {increment, decrement, clicked} = props;

  return (
    <>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <p>{clicked}</p>
    </>
  );
}

export default HookTest;
