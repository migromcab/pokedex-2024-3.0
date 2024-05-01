import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('Should render a button with the text indicated', () => {
    const text = 'hola';

    render(<Button>{text}</Button>);
    const button = screen.getByText(text);

    expect(button).toBeInTheDocument();
    expect(button.classList.contains(`btn--md`)).toBe(true);
    expect(button.classList.contains(`btn--outlined`)).toBe(true);
  });

  it('Should render a button with the correct size, color and variant classes', () => {
    const size = 'sm';
    const variant = 'ghost';
    const color = 'primary';

    render(<Button size={size} variant={variant} color={color} />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button.classList.contains(`btn--${size}`)).toBe(true);
    expect(button.classList.contains(`btn--${variant}`)).toBe(true);
    expect(button.classList.contains(`btn--${color}`)).toBe(true);
  });

  it('Should disabled the button when the prop is true', () => {
    render(<Button disabled />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).not.toBeEnabled();
  });
});
