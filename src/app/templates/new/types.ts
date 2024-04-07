export type FormValues = {
  name: string;
  body: string;
};

export type SubmitFormState = {
  submitting: boolean;
  submitted: boolean;
  error: Error | null;
};
