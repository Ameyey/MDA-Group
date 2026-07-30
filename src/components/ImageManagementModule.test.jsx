import { render, screen } from '@testing-library/react';
import ImageManagementModule from './ImageManagementModule';
import { DashboardPage } from './DashboardPage';

describe('ImageManagementModule', () => {
  it('renders the dashboard heading', () => {
    render(<ImageManagementModule />);
    expect(screen.getByText(/single-page image crud dashboard/i)).toBeInTheDocument();
  });

  it('renders the dashboard directly without requiring login', () => {
    render(<DashboardPage onBackToHome={() => {}} />);
    expect(screen.getByText(/image management studio/i)).toBeInTheDocument();
  });
});
