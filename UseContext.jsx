const rootNode = document.getElementById('app');
const root = ReactDOM.createRoot(rootNode);
root.render(<App />);

/* Objects */
class CounterObj {
  constructor(name, show, total) {
    this.name = name;
    this.show = show;
    this.total = total;
  }
}

const CounterContext = React.createContext(3);
function App() {
  const [counterData, setCounterData] = React.useState([
    new CounterObj('A', true, 0),
    new CounterObj('B', true, 0),
    new CounterObj('C', true, 0),
  ]);
  const increment = (index) => {
    const newData = [...counterData];
    newData[index].total = newData[index].total + 1;
    setCounterData(newData);
  };
  const decrement = (index) => {
    const newData = [...counterData];
    const decrmentCounter = newData[index].total - 1;
    newData[index].total = decrmentCounter >= 0 ? decrmentCounter : 0;
    setCounterData(newData);
  };
  const contextData = [counterData, increment, decrement];
  return (
    <>
      <CounterContext.Provider value={contextData}>
        <h1>Counters</h1>
        <section>
          <CounterList />
          <CounterTool />
        </section>
      </CounterContext.Provider>
    </>
  );
}

function Counter({ counter, index }) {
  const [contextData, increment, decrement] = React.useContext(CounterContext);
  function handleIncrementClick() {
    increment(index);
  }

  function handleDecrementClick() {
    decrement(index);
  }

  return (
    <dl className='counter'>
      <dt>{counter.name}</dt>

      <dd className='counter__value'>
        {counter.total > 0 ? (
          <button className='button' onClick={handleDecrementClick}>
            -
          </button>
        ) : (
          <div className='counter__empty'></div>
        )}
        {counter.total}
        <button className='button' onClick={handleIncrementClick}>
          +
        </button>
      </dd>
    </dl>
  );
}

function useDocumentTitle(title) {
  return React.useEffect(() => {
    const originalTitle = documentt.title;
    document.title = title;

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}
function CounterList() {
  const [contextData, increment, decrement] = React.useContext(CounterContext);
  //   const updateTitle = useDocumentTitle(
  //     'Clicks: ' +
  //       counterData.map((counter) => {
  //         return counter.total;
  //       })
  //   ).join(',');
  return (
    <section>
      {contextData.map((counter, index) => (
        <Counter counter={counter} index={index} />
      ))}
    </section>
  );
}

// Prop Drilling
function CounterTool() {
  const [counterData, setCounterData] = React.useState([
    new CounterObj('A', true, 3),
    new CounterObj('B', true, 2),
    new CounterObj('C', true, 0),
  ]);
  const contextData = [counterData, null, null];
  return (
    <>
      <CounterContext.Provider value={contextData}>
        <CounterSummary />
      </CounterContext.Provider>
    </>
  );
}

function CounterSummary() {
  const [contextData, increment, decrement] = React.useContext(CounterContext);
  //sort will change the data
  const sortedData = [...contextData].sort((a, b) => {
    return b.total - a.total;
  });
  const summary = sortedData
    .map((counter) => {
      return counter.name + '(' + counter.total + ')';
    })
    .join(',');
  return <p>Summary: {summary}</p>;
}
