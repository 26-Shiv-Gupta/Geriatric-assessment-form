import { render, screen, fireEvent, waitFor } from '@test-utils';
import { vi } from 'vitest';
import { AssessmentForm } from './AssessmentForm';

describe('AssessmentForm', () => {
  it('loads sample patient details when button is clicked', () => {
    render(<AssessmentForm />);

    fireEvent.click(screen.getByRole('button', { name: /load sample patient/i }));

    expect(screen.getByLabelText(/medical record number/i)).toHaveValue('MRN-004821');

    expect(screen.getByLabelText(/patient name/i)).toHaveValue('Sushila Deshpande');

    expect(screen.getByLabelText(/barthel index/i)).toHaveValue('80');

    expect(screen.getByLabelText(/medication count/i)).toHaveValue('3');

    expect(screen.getByLabelText(/pharmacist review requested/i)).not.toBeChecked();

    expect(screen.getByLabelText(/patient or representative has given consent/i)).toBeChecked();
  });

  it('submits valid sample patient data successfully', async () => {
    render(<AssessmentForm />);

    fireEvent.click(screen.getByRole('button', { name: /load sample patient/i }));

    fireEvent.click(screen.getByRole('button', { name: /submit assessment/i }));

    expect(screen.getByRole('button', { name: /submit assessment/i })).toBeDisabled();

    expect(
      await screen.findByText(/assessment saved successfully/i, {}, { timeout: 3000 })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/"mrn": "MRN-004821"/)).toBeInTheDocument();

      expect(screen.getByText(/"patientName": "Sushila Deshpande"/)).toBeInTheDocument();
    });
  });

  it('calls onSave with parsed values when valid form is submitted', async () => {
    const onSave = vi.fn();

    render(<AssessmentForm onSave={onSave} />);

    fireEvent.click(screen.getByRole('button', { name: /load sample patient/i }));

    fireEvent.click(screen.getByRole('button', { name: /submit assessment/i }));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledTimes(1);

      expect(onSave).toHaveBeenCalledWith({
        mrn: 'MRN-004821',
        patientName: 'Sushila Deshpande',
        dateOfBirth: '1949-03-12',
        assessmentDate: '2026-08-07',
        mobility: 'cane',
        barthelIndex: 80,
        medicationCount: 3,
        pharmacistReviewRequested: false,
        followUpDate: '2026-09-04',
        consentObtained: true,
      });
    });
  });
});
