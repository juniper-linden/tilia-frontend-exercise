import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import App from "./App";

it("renders search box", () => {
  render(<App />);
  const search = screen.getByLabelText(/Search/i);
  expect(search).toBeInTheDocument();
});

describe('Search', () => {
  it('return values when input it give', async () => {
    const app = render(<App />);

    // get input
    const input = app.getByLabelText(/Search/i);

    // update input
    userEvent.type(input, 'French');

    // check input value
    expect(input.value).toBe('French')
    // check all relevant countries display correctly
    await waitFor(() => { 
      const countries = app.getAllByTestId("country-result");
      expect(countries).toHaveLength(3)
    }, { timeout: 350 }); // But will get called within 350ms
  });

  it('display results in correct format when selected', () => {
    // this is checking css, which i know goes against what kent c dodds says I know but like
    // this is how its happening rn okay
    const app = render(<App />);

    // uncheck vertical
    fireEvent.click(app.getByText('Vertical'));

    // check input value
    expect(app.getByTestId('results-list')).toHaveClass('results')

    // toggle to see that it changes
    fireEvent.click(app.getByText('Vertical'));
    expect(app.getByTestId('results-list')).toHaveClass('vertical-results')
  });
})

