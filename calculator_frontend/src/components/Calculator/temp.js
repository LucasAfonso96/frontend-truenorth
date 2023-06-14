import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Calculator.css';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import CalculateIcon from '@material-ui/icons/Equalizer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  digitButton: {
    flexGrow: 1,
  },
  operationButton: {
    flexGrow: 1,
  },
  clearButton: {
    marginRight: theme.spacing(1),
  },
  calculateButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Calculator = ({ isLoggedIn }) => {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('');
  const [operations, setOperations] = useState([]);
  const [result, setResult] = useState('');
  const [userBalance, setUserBalance] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/operations/')
      .then(response => {
        setOperations(response.data);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Request failed',
          text: 'Server Error'
        });
      });
  }, []);

  const handleOperationClick = operation => {
    setSelectedOperation(operation);
    setNumber2('');
  };

  const handleNumberClick = num => {
    if (selectedOperation === '') {
      setNumber1(prevNumber => prevNumber + num);
    } else {
      setNumber2(prevNumber => prevNumber + num);
    }
  };

  const handleClearClick = () => {
    setNumber1('');
    setNumber2('');
    setSelectedOperation('');
    setResult('');
  };

  const handleEqualClick = () => {
    const token = localStorage.getItem('authToken');
    let num2 = selectedOperation === 'square_root' || selectedOperation === 'random_string' ? parseFloat(number1) : parseFloat(number2);

    axios
      .post(
        'http://localhost:8000/api/calculate/',
        {
          number1: parseFloat(number1),
          number2: num2,
          operationType: selectedOperation
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )
      .then(response => {
        setResult(response.data.result);
        setUserBalance(response.data.user_balance);
        setNumber1('');
        setNumber2('');
        setSelectedOperation('');
      })
      .catch(error => {
        if (error.response) {
          Swal.fire({
            icon: 'error',
            title: 'Request failed',
            text: `Insufficient balance, user balance = ${error.response.data.user_balance}`
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Request failed',
            text: 'Server Error'
          });
        }
      });
  };

  const isNumber2Disabled = selectedOperation === 'square_root' || selectedOperation === 'random_string';

  const isCalculateDisabled = () => {
    if (selectedOperation === '') {
      return true; // Disable if no operation is selected
    }

    if (selectedOperation === 'square_root' || selectedOperation === 'random_string') {
      // Enable for square root and random string with only one number
      return parseFloat(number1) === 0 || isNaN(parseFloat(number1));
    }

    // Enable for other operations with two numbers
    return (
      parseFloat(number1) === 0 ||
      isNaN(parseFloat(number1)) ||
      parseFloat(number2) === 0 ||
      isNaN(parseFloat(number2))
    );
  };

  return (
    <>
    {isLoggedIn ? (
      <div className="private-component">
        <h2 className="section-title">Calculator</h2>
        <div className="calculator">
          <div className="calculator-screen">
            <input
              type="text"
              className="calculator-input"
              value={selectedOperation ? `${number1} ${selectedOperation} ${number2}` : number1}
              readOnly
            />
          </div>
          <div className="calculator-buttons">
            <div className="digit-buttons">
              {[...Array(10).keys()].map((num) => (
                <Button
                  key={num}
                  className={classes.digitButton}
                  variant="contained"
                  color="primary"
                  onClick={() => handleNumberClick(num)}
                >
                  {num}
                </Button>
              ))}
            </div>
            <div className="operation-buttons">
              {operations.map((operation) => (
                <Button
                  key={operation.id}
                  className={classes.operationButton}
                  variant="contained"
                  color="secondary"
                  onClick={() => handleOperationClick(operation.type)}
                  disabled={isNumber2Disabled && number1 === ''}
                >
                  {operation.type}
                  <span className="cost">{operation.cost}</span>
                </Button>
              ))}
            </div>
            <div className="other-buttons">
              <Button
                className={`${classes.clearButton} btn btn-danger`}
                variant="contained"
                color="secondary"
                onClick={handleClearClick}
              >
                <ClearIcon />
                Clear
              </Button>
              <Button
                className={`${classes.calculateButton} btn btn-success`}
                variant="contained"
                color="primary"
                onClick={handleEqualClick}
                disabled={isCalculateDisabled()}
              >
                <CalculateIcon />
                Calculate
              </Button>
            </div>
           
              {result !== null && <p data-testid="result" className="result">Result: {result}</p>}
              {userBalance >= 0 && (<p className="calculator-balance">User Balance: {userBalance}</p>)}
            
          </div>
        </div>
      </div>
    ) : (
      <>
        <br />
        <h2>Must do the Login to use the Calculator</h2>
      </>
    )}
  </>
  );
};

export default Calculator;
