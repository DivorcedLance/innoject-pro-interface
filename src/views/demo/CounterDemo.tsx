import { useState } from "react";
import { Counter } from "../../components/Counter";

const CounterDemo = () => {
  const [counter, setCounter] = useState(12345);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Counter
        label="Daily Counter"
        count={counter}
        onReset={() => setCounter(0)}
      />
    </div>
  );
};

export default CounterDemo;
