const rootNode = document.getElementById('app');
const root = ReactDOM.createRoot(rootNode);
let counterName = 'One';
root.render(<App />);

function App() {
  return (
    <>
      <h1>Counters</h1>
      <section>
        <Counter name={counterName} />
      </section>
    </>
  );
}

function Counter(props) {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { count: state.count + 1 };
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });
  return (
    <article>
      <h2>Counter {props.name}</h2>
      <p>You clicked {state.count} times</p>
      <button
        className='button'
        onClick={() => dispatch({ type: 'INCREMENT' })}
      >
        Click me
      </button>
    </article>
  );
}
