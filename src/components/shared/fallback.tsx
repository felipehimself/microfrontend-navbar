import { Field, ProgressBar } from '@fluentui/react-components';

export const Fallback = () => {
  return (
    <Field validationMessage="Indeterminate ProgressBar" validationState="none">
      <ProgressBar />
    </Field>
  );
};
