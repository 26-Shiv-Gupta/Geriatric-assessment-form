import { useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Code,
  Container,
  Group,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, schemaResolver } from '@mantine/form';
import { assessmentSchema, MOBILITY, type Assessment } from './schema';

type AssessmentFormProps = {
  onSave?: (values: Assessment) => void | Promise<void>;
};

type AssessmentFormValues = {
  [K in keyof Assessment]: Assessment[K] extends boolean ? boolean : Assessment[K] | '';
};

const samplePatient: AssessmentFormValues = {
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
};

export function AssessmentForm({ onSave }: AssessmentFormProps) {
  const [loading, setLoading] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<Assessment | null>(null);

  const form = useForm<AssessmentFormValues, Assessment>({
    mode: 'uncontrolled',

    initialValues: {
      mrn: '',
      patientName: '',
      dateOfBirth: '',
      assessmentDate: '',
      mobility: '',
      barthelIndex: '',
      medicationCount: '',
      pharmacistReviewRequested: false,
      followUpDate: '',
      consentObtained: false,
    },

    validate: schemaResolver(assessmentSchema, {
      sync: true,
    }),

    validateInputOnBlur: true,
    validateInputOnChange: false,
  });

  const handleSubmit = form.onSubmit(async (values) => {
    setLoading(true);
    setSubmittedValues(null);

    try {
      const parsedValues = assessmentSchema.parse(values);

      await new Promise((resolve) => setTimeout(resolve, 800));

      await onSave?.(parsedValues);

      setSubmittedValues(parsedValues);
    } finally {
      setLoading(false);
    }
  });

  const handleLoadSample = () => {
    form.setValues(samplePatient);
    form.clearErrors();
    setSubmittedValues(null);
  };

  const mobilityOptions = MOBILITY.map((value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }));

  return (
    <Container size="md" py="xl">
      <Paper p="xl" radius="md" withBorder>
        <form onSubmit={handleSubmit}>
          <Stack gap="xl">
            {/* Page Header */}
            <div>
              <Title order={2}>Geriatric Care Assessment</Title>
              <Text c="dimmed" size="sm" mt={5}>
                Complete the assessment details for the patient.
              </Text>
            </div>

            {/* Patient Information */}
            <div>
              <Title order={4} mb="md">
                Patient Information
              </Title>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <TextInput
                  label="Medical Record Number"
                  placeholder="MRN-004821"
                  key={form.key('mrn')}
                  {...form.getInputProps('mrn')}
                />

                <TextInput
                  label="Patient Name"
                  placeholder="Enter patient name"
                  key={form.key('patientName')}
                  {...form.getInputProps('patientName')}
                />

                <DateInput
                  label="Date of Birth"
                  placeholder="Select date of birth"
                  valueFormat="DD MMM YYYY"
                  key={form.key('dateOfBirth')}
                  {...form.getInputProps('dateOfBirth')}
                />

                <DateInput
                  label="Assessment Date"
                  placeholder="Select assessment date"
                  valueFormat="DD MMM YYYY"
                  maxDate={new Date()}
                  key={form.key('assessmentDate')}
                  {...form.getInputProps('assessmentDate')}
                />
              </SimpleGrid>
            </div>

            {/* Clinical Assessment */}
            <div>
              <Title order={4} mb="md">
                Clinical Assessment
              </Title>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <Select
                  label="Mobility"
                  placeholder="Select mobility level"
                  data={mobilityOptions}
                  key={form.key('mobility')}
                  {...form.getInputProps('mobility')}
                />

                <NumberInput
                  label="Barthel Index"
                  placeholder="Enter score (0-100)"
                  min={0}
                  max={100}
                  step={5}
                  key={form.key('barthelIndex')}
                  {...form.getInputProps('barthelIndex')}
                />

                <NumberInput
                  label="Medication Count"
                  placeholder="Enter number of medications"
                  min={0}
                  max={30}
                  key={form.key('medicationCount')}
                  {...form.getInputProps('medicationCount')}
                />

                <div>
                  <Text size="sm" fw={500} mb="xs">
                    Additional Review
                  </Text>

                  <Checkbox
                    label="Pharmacist review requested"
                    key={form.key('pharmacistReviewRequested')}
                    {...form.getInputProps('pharmacistReviewRequested', {
                      type: 'checkbox',
                    })}
                  />
                </div>
              </SimpleGrid>
            </div>

            {/* Follow-up and Consent */}
            <div>
              <Title order={4} mb="md">
                Follow-up and Consent
              </Title>

              <Stack gap="md">
                <DateInput
                  label="Follow-up Date"
                  placeholder="Select follow-up date"
                  valueFormat="DD MMM YYYY"
                  key={form.key('followUpDate')}
                  {...form.getInputProps('followUpDate')}
                />

                <Checkbox
                  label="Patient or representative has given consent"
                  key={form.key('consentObtained')}
                  {...form.getInputProps('consentObtained', {
                    type: 'checkbox',
                  })}
                />
              </Stack>
            </div>

            {/* Action Buttons */}
            <Group justify="space-between">
              <Button type="button" variant="light" color="gray" onClick={handleLoadSample}>
                Load Sample Patient
              </Button>

              <Button type="submit" loading={loading}>
                Submit Assessment
              </Button>
            </Group>

            {/* Success Message */}
            {submittedValues && (
              <Alert color="green" title="Assessment saved successfully!">
                <Text size="sm" mb="sm">
                  The submitted assessment data is shown below:
                </Text>

                <Code block>{JSON.stringify(submittedValues, null, 2)}</Code>
              </Alert>
            )}
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
