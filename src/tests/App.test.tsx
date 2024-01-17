import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders a main', () => {
  const {container} = render(<App />);
  const pokedex = container.getElementsByClassName('pokedex');

  expect(pokedex).toBeInTheDocument;
});
