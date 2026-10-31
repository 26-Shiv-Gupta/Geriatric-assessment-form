# Geriatric Care Assessment Form

A responsive, single-page Geriatric Care Assessment Form built with React, TypeScript, Mantine UI, and Zod. The application allows users to enter patient information, complete clinical assessments, validate form data, and submit an assessment.

## Live Demo

**[View Live Application](https://geriatricform.netlify.app/)**

## Tech Stack

- React 19
- TypeScript
- Mantine UI
- Mantine Form
- Zod 4
- Vite
- Vitest
- React Testing Library
- Day.js

## Features

- **Patient Information:** Capture MRN, patient name, date of birth, and assessment date.
- **Clinical Assessment:** Select mobility level, enter Barthel Index score, and record medication count.
- **Additional Review:** Request a pharmacist review when required.
- **Follow-up and Consent:** Select a follow-up date and record patient or representative consent.
- **Schema-based Validation:** Centralized validation using Zod and Mantine's `schemaResolver`.
- **Validation Timing:** Validate fields on blur and validate the form on submission.
- **Date Restrictions:** Prevent selecting a future assessment date.
- **Sample Patient:** Populate the form with predefined sample data.
- **Submission State:** Display a loading state during the simulated save operation.
- **Success Feedback:** Display successfully parsed assessment data after submission.
- **Responsive Layout:** Adapt the form layout for different screen sizes.

## Getting Started

### Prerequisites

- Node.js
- Corepack
- Yarn 4.18.1

### 1. Clone the repository

```bash
git clone <your-public-github-repository-url>
cd <your-project-folder>
```

### 2. Install dependencies

```bash
corepack yarn install
```

### 3. Start the development server

```bash
corepack yarn dev
```

Open the local URL displayed in your terminal to access the application.

## Available Scripts

| Command | Description |
|---|---|
| `corepack yarn dev` | Starts the development server |
| `corepack yarn build` | Creates a production build |
| `corepack yarn vitest` | Runs the test suite |
| `corepack yarn test` | Runs formatting, lint, type checks, tests, and build |
| `corepack yarn preview` | Previews the production build |

## Validation Rules

Form validation is centralized in the Zod schema rather than duplicated across individual form fields.

The schema validates:

- MRN format.
- Patient name length and required value.
- Patient age of at least 60 years on the assessment date.
- Assessment date and date of birth.
- Mobility selection.
- Barthel Index as an integer between 0 and 100 in increments of 5.
- Medication count between 0 and 30.
- Pharmacist review requirement when medication count is 5 or more.
- Follow-up date after the assessment date.
- Mandatory patient or representative consent.

## Testing

Automated tests cover:

- Zod schema validation and age boundary conditions.
- Loading sample patient details.
- Successful form submission.
- Calling the save handler with parsed assessment values.

Run the tests using:

```bash
corepack yarn vitest
```

Run all project checks using:

```bash
corepack yarn test
```

## Unfinished Work and Limitations

The core assessment form and its validation, submission flow, and automated tests are implemented.

The following items are not included in this assignment:

- **Backend integration:** Assessment data is not persisted to a database. Submission currently uses a simulated save operation.
- **Authentication and authorization:** User login and role-based access control are not implemented.
- **Production data integration:** The application uses fictional sample patient data rather than real patient records.

These features were kept out of scope for the current frontend-focused assignment.

## Development Time

**Total time spent:** [Add your actual approximate development time]

This includes project setup, form implementation, schema validation, testing, debugging, and deployment.

## Deployment

The application is deployed on Netlify:

**https://geriatricform.netlify.app/**

---

Built as a frontend assessment project using React, TypeScript, Mantine, and Zod.