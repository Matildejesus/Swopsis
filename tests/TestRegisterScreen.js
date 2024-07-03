import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterScreen from './RegisterScreen';

jest.mock('../components/authentication/useRegister', () => ({
  useRegister: () => ({
    register: jest.fn(),
    isLoading: false,
  }),
}));

describe('RegisterScreen', () => {
  it('renders register screen correctly', () => {
    const { getByText, getByPlaceholderText } = render(<RegisterScreen />);

    expect(getByText('Already a user? Sign in')).toBeTruthy();
    expect(getByPlaceholderText('youremail@email.com')).toBeTruthy();
    expect(getByPlaceholderText('Enter username')).toBeTruthy();
    expect(getByPlaceholderText('password')).toBeTruthy();
    expect(getByText('REGISTER')).toBeTruthy();
  });

  it('handles input changes', () => {
    const { getByPlaceholderText } = render(<RegisterScreen />);

    const emailInput = getByPlaceholderText('youremail@email.com');
    const usernameInput = getByPlaceholderText('Enter username');
    const passwordInput = getByPlaceholderText('password');

    fireEvent.changeText(emailInput, 'testuser@example.com');
    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'Test12345');

    expect(emailInput.props.value).toBe('testuser@example.com');
    expect(usernameInput.props.value).toBe('testuser');
    expect(passwordInput.props.value).toBe('Test12345');
  });

  it('calls register function with entered username, email, and password on REGISTER button press', async () => {
    const { getByPlaceholderText, getByText } = render(<RegisterScreen />);

    const emailInput = getByPlaceholderText('youremail@email.com');
    const usernameInput = getByPlaceholderText('Enter username');
    const passwordInput = getByPlaceholderText('password');
    const registerButton = getByText('REGISTER');

    fireEvent.changeText(emailInput, 'testuser@example.com');
    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'Test12345');
    fireEvent.press(registerButton);

    await waitFor(() => {
      expect(useRegister().register).toHaveBeenCalledWith(
        { userName: 'testuser', email: 'testuser@example.com', password: 'Test12345' },
        expect.any(Object)
      );
    });
  });

  it('navigates to Login screen on "Already a user? Sign in" link press', () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(<RegisterScreen navigation={{ navigate: mockNavigate }} />);

    fireEvent.press(getByText('Already a user? Sign in'));
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
});
