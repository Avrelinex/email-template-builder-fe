export type CreateFormValues = {
  displayName: string;
  file: File;
};

export type UpdateFormValues = {
  displayName: string;
};

export type SubmitFormState = {
  submitting: boolean;
  submitted: boolean;
  error: Error | null;
};
