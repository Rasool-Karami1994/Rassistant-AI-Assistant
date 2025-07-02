export interface FormLabelProps {
  label: string;
}
const FormLabel: React.FC<FormLabelProps> = ({ label }) => {
  return (
    <label className="text-base leading-7 font-medium text-[var(--primary-color)]">
      {label}
    </label>
  );
};

export default FormLabel;
