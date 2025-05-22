import ChildrenRenderer from "./components/children-renderer";
import ListComponent from "./components/list-component";

function App() {
  return (
    <div>
      <h1 id="test">Hello World</h1>
      <ChildrenRenderer>
        <p>Jo macker, wie gehts? </p>
        <ListComponent />
      </ChildrenRenderer>
    </div>
  );
}

export default App;
