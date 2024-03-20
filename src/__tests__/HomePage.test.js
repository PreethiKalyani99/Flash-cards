import { render, screen } from '@testing-library/react';
import { HomePage } from '../components/HomePage';

test('renders learn react link', () => {
  const data = [{
    cardLabel: 'label',
    description: 'description'
}] 
const navigate = '/'
  render(<HomePage  data={data} navigate={navigate}/>);
  expect(screen.getByText('Create Cards')).toBeInTheDocument();
  expect(screen.getByText('Display Cards')).toBeInTheDocument();
});
