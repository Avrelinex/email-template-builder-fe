export type FormValues = {
  displayName: string;
  image: File;
};

export type SubmitFormState = {
  submitting: boolean;
  submitted: boolean;
  error: Error | null;
};
