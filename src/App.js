import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';
import { Fragment, useState } from 'react';

function App() {
  const Questions = [
    {
      id: "q1",
      question: "What language is spoken in Brazil",
      options: ["Protgues", "English", "French", "German"],
      answer: "1"
    },
    {
      id: "q2",
      question: "Which countries have the highest and lowest life expectancy in the world",
      options: ["Australia and Afganistan", "Japan and Sierra", "Italy", "Brazil"],
      answer: "2"
    }
  ];

  const [success, setSuccess] = useState(0);
  const [error, setError] = useState(0);
  const [disabled, setDisabled] = useState([{}]);

  const handleSucess = (name, value) => {
    setSuccess(success + 100 / Questions.length);
    setDisabled([...disabled, { name, value }]);

  }
  const handleError = (name, value) => {
    setError(error + 100 / Questions.length);
    setDisabled([...disabled, { name, value }]);
  }

  const handleSelect = (event) => {
    const { name, value } = event.target;

    let question = Questions.filter(x => x.id === name);
    if (question.length > 0) {
      if (question[0].answer === value)
        handleSucess(name, value);
      else
        handleError(name, value)
    }
   
  }



  return (
    <Fragment>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6"> <ProgressBar now={success} /></div>
          <div className="col-md-6"> <ProgressBar now={error} variant="danger" /></div>
        </div>
        {(Questions || []).map((item, index) => {
          return (
            <p key={index} className="mt-5">
              <h3>Ques {index + 1}: {item.question} </h3>
              {(item.options || []).map((option, idx) => {
                return (
                  <div key={idx} >
                    <input type="radio"
                      name={item.id}
                      value={idx + 1}
                      onChange={handleSelect}
                      disabled={disabled.filter(x => x.name === item.id).length > 0 ? true : false} /> {option}
                  </div>)
              })}
            </p>
          )
        })}

      </div>
    </Fragment>
  );
}

export default App;