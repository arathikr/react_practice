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
  return (
    <>
      <h1>Counters</h1>
      <section>
        <CounterList
          counterData={counterData}
          increment={increment}
          decrement={decrement}
        />
        <CounterTool>
          <CounterSummary counterData={counterData} />
        </CounterTool>
      </section>
    </>
  );
}

function Counter({ counter, index, increment, decrement }) {
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
function CounterList({ counterData, increment, decrement }) {
  //   const updateTitle = useDocumentTitle(
  //     'Clicks: ' +
  //       counterData.map((counter) => {
  //         return counter.total;
  //       })
  //   ).join(',');
  return (
    <section>
      {counterData.map((counter, index) => (
        <Counter
          counter={counter}
          index={index}
          increment={increment}
          decrement={decrement}
        />
      ))}
    </section>
  );
}

function CounterTool({ children }) {
  return <>{children}</>;
}
function CounterSummary({ counterData }) {
  //sort will change the data
  const sortedData = [...counterData].sort((a, b) => {
    return b.total - a.total;
  });
  const summary = sortedData
    .map((counter) => {
      return counter.name + '(' + counter.total + ')';
    })
    .join(',');
  return <p>Summary: {summary}</p>;
}
