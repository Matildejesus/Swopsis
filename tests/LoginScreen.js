import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';

jest.mock('../components/authentication/useLogin', () => ({
  useLogin: () => ({
    login: jest.fn(),
    isLoading: false,
    error: null,
  }),
}));

describe('LoginScreen', () => {
  it('renders login screen correctly', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    expect(getByText('Email')).toBeTruthy();
    expect(getByPlaceholderText('youremail@email.com')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
    expect(getByPlaceholderText('password')).toBeTruthy();
    expect(getByText('LOG IN')).toBeTruthy();
    expect(getByText('Forgot your Password?')).toBeTruthy();
    expect(getByText('Not a user? Register')).toBeTruthy();
  });

  it('handles input changes', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText('youremail@email.com');
    const passwordInput = getByPlaceholderText('password');

    fireEvent.changeText(emailInput, 'testuser@example.com');
    fireEvent.changeText(passwordInput, 'Test12345');

    expect(emailInput.props.value).toBe('testuser@example.com');
    expect(passwordInput.props.value).toBe('Test12345');
  });

  it('navigates to ResetPassword screen on "Forgot your Password?" link press', () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(<LoginScreen navigation={{ navigate: mockNavigate }} />);

    fireEvent.press(getByText('Forgot your Password?'));
    expect(mockNavigate).toHaveBeenCalledWith('ResetPassword');
  });

  it('navigates to Register screen on "Not a user? Register" link press', () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(<LoginScreen navigation={{ navigate: mockNavigate }} />);

    fireEvent.press(getByText('Not a user? Register'));
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });

  it('calls login function with entered email and password on LOG IN button press', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText('youremail@email.com');
    const passwordInput = getByPlaceholderText('password');
    const loginButton = getByText('LOG IN');

    fireEvent.changeText(emailInput, 'testuser@example.com');
    fireEvent.changeText(passwordInput, 'Test12345');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(useLogin().login).toHaveBeenCalledWith({ email: 'testuser@example.com', password: 'Test12345' }, expect.any(Object));
    });
  });
});
