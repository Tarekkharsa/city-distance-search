import { useState } from "react";

export default function CountWithoutEffect() {
  const [count, setCount] = useState(0);
  const [doubleCount, setDoubleCount] = useState(count * 2);
  const handleCount = () => {
    setCount(count + 1);
    setDoubleCount(count * 2);
  };
  return (
    <div className="App">
      <div>
        <h3>Count: {count}</h3>
        <h3>Count * 2: {doubleCount}</h3>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={handleCount}
        >
          Count++
        </button>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";

// export default function CountWithEffect() {
//   const [count, setCount] = useState(0);
//   const [doubleCount, setDoubleCount] = useState(count * 2);
//   const handleCount = () => {
//     setCount(count + 1);
//   };

//   useEffect(() => {
//     setDoubleCount(count * 2); // This will always use latest value of count
//   }, [count]);

//   return (
//     <div>
//       <h3>Count: {count}</h3>
//       <h3>Count * 2: {doubleCount}</h3>
//       <button
//         className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//         onClick={handleCount}
//       >
//         Count++
//       </button>
//     </div>
//   );
// }

// useState hook is asynchronous
// what it is?
// Basically, the thing is you don't get update value right after updating state.
