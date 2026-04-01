interface FieldValueProps {
  label: string;
  value: string | number | boolean | null | undefined;
}

export default function FieldValue({ label, value }: FieldValueProps) {
  const displayValue = formatValue(value);
  const isNull = value === null || value === undefined;

  return (
    <div className="field-value">
      <dt className="field-label">{label}</dt>
      <dd className={`field-data ${isNull ? "field-null" : ""}`}>{displayValue}</dd>
    </div>
  );
}

function formatValue(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "N/A";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return value.toLocaleString();
  return value;
}
