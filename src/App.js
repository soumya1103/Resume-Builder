import ViewResume from './Pages/ViewResume/ViewResume';
import './App.css';

function App() {
  const userId = 3; 
  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <ViewResume userId={userId} />
    </div>
  );
}


export default App;
