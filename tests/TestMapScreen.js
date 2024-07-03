import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import MapScreen from './MapScreen';

describe('MapScreen', () => {
  it('displays and handles postcode search input', () => {
    const { getByPlaceholderText } = render(<MapScreen />);
    const searchBar = getByPlaceholderText('Enter postcode');
    fireEvent.changeText(searchBar, '12345');
    expect(searchBar.props.value).toBe('12345');
  });

  it('allows clicking on map areas to view group details', async () => {
    const { getByTestId, getByText } = render(<MapScreen />);
    const mapArea = getByTestId('map-area-1');
    fireEvent.press(mapArea);
    await waitFor(() => {
      const groupDetailsModal = getByText('Group Details');
      expect(groupDetailsModal).toBeTruthy();
    });
  });
});