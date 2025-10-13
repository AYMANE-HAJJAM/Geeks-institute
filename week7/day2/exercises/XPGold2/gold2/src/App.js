import logo from './logo.svg';
import './App.css';
import FormExercise1 from './formexercise1';
import FormExercise2 from './formexercise2';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div className="container mt-4">
        <h1 className="text-center mb-5">React Form Exercises</h1>

        {/* Exercise 1 */}
        <div className="card mb-5 p-4 shadow-sm grid w-50 mx-auto">
          <FormExercise1 />
        </div>

        {/* Exercise 2 */}
        <div className="card mb-5 p-4 shadow-sm grid w-50 mx-auto">
          <FormExercise2 />
        </div>
      </div>
    </div>
  );
}

export default App;
