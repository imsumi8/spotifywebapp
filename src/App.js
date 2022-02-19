import { DndProvider } from 'react-dnd';
import './App.css';
import Homepage from './pages/Homepage';
import {HTML5Backend as Backend} from 'react-dnd-html5-backend';
import Header from './components/Header';
import { Messages } from "./constants/messages";


function App() {
  return (
    <DndProvider backend={Backend}>
    <Header message={Messages.APP_NAME}/>
    <Homepage />
</DndProvider>
  );
}

export default App;
