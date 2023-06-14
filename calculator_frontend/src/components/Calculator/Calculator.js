import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Calculator.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes, faDivide, faSquareRootAlt, faRandom } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';

const Calculator = ({ isLoggedIn }) => {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('');
  const [operations, setOperations] = useState([]);
  const [result, setResult] = useState('');
  const [userBalance, setUserBalance] = useState('');

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/api/operations/`)
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
        `${config.apiUrl}/api/calculate/`,
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


  const getOperationSymbol = (operation) => {
    switch (operation) {
      case 'addition':
        return '+';
      case 'subtraction':
        return '-';
      case 'multiplication':
        return 'x';
      case 'division':
        return '/';
      case 'square_root':
        return '√';
      case 'random_string':
        return 'random string';
      default:
        return null;
    }
  };

  const displayValue = selectedOperation ? `${number1} ${getOperationSymbol(selectedOperation)} ${number2}` : number1;
  
  return (
    <>
      {isLoggedIn ? (
        <div className="private-component">
          <h2 className="section-title">Calculator</h2>
          <div className="calculator-container">
            <div className="calculator-display">
              <input
                type="text"
                className="calculator-input form-control"
                value={displayValue}
                readOnly
              />
            </div>
            <div className="calculator-buttons">
              <div className="row">
                {[...Array(10).keys()].map(num => (
                  <div className="col-3" key={num}>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleNumberClick(num)}
                    >
                      {num}
                    </button>
                  </div>
                ))}
              </div>
              <div className="operation-buttons">
                {operations.map(operation => (
                  <button
                    key={operation.id}
                    data-testid={operation.type}
                    className="btn btn-secondary operation-button"
                    onClick={() => handleOperationClick(operation.type)}
                    disabled={isNumber2Disabled && number1 === ''}
                  >
                    <FontAwesomeIcon
                      icon={
                        operation.type === 'addition'
                          ? faPlus
                          : operation.type === 'subtraction'
                          ? faMinus
                          : operation.type === 'multiplication'
                          ? faTimes
                          : operation.type === 'division'
                          ? faDivide
                          : operation.type === 'square_root'
                          ? faSquareRootAlt
                          : faRandom
                      }
                    />
                    <span className="cost">Cost: {operation.cost}</span>
                  </button>
                ))}
              </div>

              <div className="row">
                <div className="col-6">
                  <button className="btn btn-danger w-100" onClick={handleClearClick}>
                    Clear
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-success w-100"
                    onClick={handleEqualClick}
                    disabled={isCalculateDisabled()}
                  >
                    Calculate
                  </button>
                </div>
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
