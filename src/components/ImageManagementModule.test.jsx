import { render, screen } from '@testing-library/react';
import ImageManagementModule from './ImageManagementModule';

describe('ImageManagementModule', () => {
  it('renders the dashboard heading', () => {
    render(<ImageManagementModule />);
    expect(screen.getByText(/single-page image crud dashboard/i)).toBeInTheDocument();
  });
});
