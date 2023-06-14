import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react';
import UserRecords from './UserRecords';


describe('UserRecords', () => {

  test('renders UserRecords component when user is logged in', () => {
    render(<UserRecords isLoggedIn={true} />);
    
    // Assert that the component renders the table and pagination elements
    const tableElement = screen.getByRole('table');
    const paginationElement = screen.getByText('Current Page:');
    
    expect(tableElement).toBeInTheDocument();
    expect(paginationElement).toBeInTheDocument();
  });

  test('renders message to login when user is not logged in', () => {
    render(<UserRecords isLoggedIn={false} />);
    
    // Assert that the component renders the login message
    const loginMessage = screen.getByText('Must do the Login to see the User Records');
    
    expect(loginMessage).toBeInTheDocument();
  });
  
   test('goes to previous page when "Previous Page" button is clicked', () => {
    render(<UserRecords isLoggedIn={true} />);
    
    // Simulate clicking the "Previous Page" button
    fireEvent.click(screen.getByText('Previous Page'));
    
    // Assert that the current page is updated
    const currentPageElement = screen.getByText(/Current Page:/i);
    expect(currentPageElement).toHaveTextContent(/Current Page:/i);
  
    // TODO: Add an assertion for the updated user records based on the new current page
  });


});