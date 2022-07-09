import { memo, useState, useEffect } from 'react';
import './App.css';

function App() {
  // "value" will be passed down to our child components
  let [value, setValue] = useState(0);

  // "valueX" is not used in our child components at all- we will use it to force this App component to re-render
  let [valueX, setValueX] = useState(0);
  
  return (
    <div className='flex flex-col gap-5 m-10 text-center'>
      <h1 className='text-xl font-bold'>React Memo Demo</h1>
      <div className="italic">
        The red button will increment a number that is being used as props for both the components.
        The blue button will increment a number that is NOT being used as props for the components at all.
      </div>

      <div className="flex flex-row gap-10 justify-center">
        <button
          className="flex flex-col justify-center align-center items-center gap-2 p-2 rounded-lg text-white bg-red-400 hover:bg-red-500"
          onClick={() => setValue(x => x + 1)}
        >
          <div className='text-center font-bold'>{value}</div>
          Update and re-render
        </button>

        <button
          className="flex flex-col justify-center align-center items-center gap-2 p-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600"
          onClick={() => setValueX(x => x + 1)}
        >
          <div className='text-center font-bold'>{valueX}</div>
          Re-render without update
        </button>
      </div>

      <div className="flex flex-row justify-evenly items-center gap-10">
        <NoMemoComponent name='NoMemoComponent' value={value} />
        <YesMemoComponent name='YesMemoComponent' value={value} />
      </div>
    </div>
  );
}

export default App;

// A non-memoized component. Whenever the name or value props change, it will re-render.
// Whenever the parent component (in this case, App) re-renders, this will also re-render.
const NoMemoComponent = ({ name, value }) => {
  useEffect(() => {
    console.log(`Component ${name} has updated!`);
  });

  return (
    <div className='flex flex-col gap-5 border p-2 rounded-lg w-full shadow'>
      <div className="font-bold">{name}</div>

      <div>{value}</div>
    </div>
  );
}

// All we had to do to memoize the component was to pass it to a memo() function.
// The resultant component only re-renders if the props it consumes change.
// It will not re-render if the props are the same- even if the parent component re-rendered!
// This function also takes a second argument where we can specify the comparison method to check for prop changes.
const YesMemoComponent = memo(NoMemoComponent);