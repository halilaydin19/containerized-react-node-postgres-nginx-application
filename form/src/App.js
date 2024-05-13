import './App.css';
import Form from './form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NextPage from './nextpage';
function App() {
  const handleFormSubmit = (firstName, lastName) => {
    console.log('Submitted:', firstName, lastName);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Form />} />
        <Route path="/NextPage" element={<NextPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
