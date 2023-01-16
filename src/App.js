import {folders} from "./fixtures/Folder"
import Root from "./components/Tree/root/Root"
import "./App.css";

function App() {
  const handleSelectedNodes = () => {} // no-op
  return (
    <div className="App w-screen h-screen flex">
      <div className="w-11/12 h-full bg-gray-100"></div>
      <Root nodes={folders} onChangeSelectedNodes={handleSelectedNodes} />
    </div>
  );
}

export default App;
