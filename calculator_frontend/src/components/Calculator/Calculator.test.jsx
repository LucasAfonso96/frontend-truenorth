import React from 'react';
import { render, fireEvent, debug , screen } from '@testing-library/react';
import { debugDOM } from '@testing-library/react';
import Calculator from './Calculator';
import axios from 'axios';


// Mock axios and Swal
jest.mock('axios');
jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

describe('Calculator', () => {
  beforeEach(() => {
    // Mock operations data
    const mockOperations = [
      { id: 1, type: 'addition', cost: 5 },
      { id: 2, type: 'subtraction', cost: 3 },
      { id: 3, type: 'multiplication', cost: 10 },
      { id: 4, type: 'division', cost: 8 },
      { id: 5, type: 'square_root', cost: 2 },
      { id: 6, type: 'random_string', cost: 7 }
    ];

    // Mock the API response
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockOperations });

    render(<Calculator isLoggedIn={true} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the calculator component', () => {
    // Check if the component renders correctly
    const calculatorTitle = screen.getByText('Calculator');
    expect(calculatorTitle).toBeInTheDocument();
  });

  test('allows entering numbers', () => {
    // Click on number buttons
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));

    // Check if the numbers are displayed in the input
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('123');
  });

 
  /*  test('renders operation buttons with correct icons', async () => {
    */
  afterEach(() => {
    jest.clearAllMocks();
  });
});
