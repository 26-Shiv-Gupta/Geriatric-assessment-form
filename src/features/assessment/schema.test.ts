import { describe, expect, it } from 'vitest';
import { assessmentSchema } from './schema';

const validPatient = {
  mrn: 'MRN-004821',
  patientName: 'Sushila Deshpande',
  dateOfBirth: '1966-08-07',
  assessmentDate: '2026-08-07',
  mobility: 'cane',
  barthelIndex: 80,
  medicationCount: 3,
  pharmacistReviewRequested: false,
  followUpDate: '2026-09-04',
  consentObtained: true,
};

describe('assessmentSchema', () => {
  it('accepts a patient who is exactly 60 years old', () => {
    const result = assessmentSchema.safeParse(validPatient);

    expect(result.success).toBe(true);
  });

  it('rejects a patient who is one day short of 60', () => {
    const result = assessmentSchema.safeParse({
      ...validPatient,
      dateOfBirth: '1966-08-08',
    });

    expect(result.success).toBe(false);

    const issuePath = result.success ? undefined : result.error.issues[0]?.path;

    expect(issuePath).toEqual(['dateOfBirth']);
  });
});
