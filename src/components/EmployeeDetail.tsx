"use client";

import type { IndividualData, EmploymentData } from "@/lib/types";
import FieldValue from "./FieldValue";
import ErrorBanner from "./ErrorBanner";

interface EmployeeDetailProps {
  individual: IndividualData | null;
  employment: EmploymentData | null;
  isLoading: boolean;
  individualError: string | null;
  employmentError: string | null;
}

export default function EmployeeDetail({
  individual,
  employment,
  isLoading,
  individualError,
  employmentError,
}: EmployeeDetailProps) {
  if (isLoading) {
    return (
      <div className="detail-panel">
        <p className="loading-state">Loading employee details...</p>
      </div>
    );
  }

  if (!individual && !employment && !individualError && !employmentError) {
    return (
      <div className="detail-panel">
        <p className="empty-state">Select an employee to view their details.</p>
      </div>
    );
  }

  return (
    <div className="detail-panel">
      {individualError && <ErrorBanner message={individualError} />}
      {individual && (
        <section className="detail-section">
          <h2>Individual Information</h2>
          <dl className="field-grid">
            <FieldValue label="First Name" value={individual.first_name} />
            <FieldValue label="Middle Name" value={individual.middle_name} />
            <FieldValue label="Last Name" value={individual.last_name} />
            <FieldValue label="Preferred Name" value={individual.preferred_name} />
            <FieldValue label="Date of Birth" value={individual.dob} />
            <FieldValue label="Gender" value={individual.gender} />
            <FieldValue label="Ethnicity" value={individual.ethnicity} />
            <FieldValue label="SSN" value={individual.ssn ? "****" + individual.ssn.slice(-4) : null} />
          </dl>

          {individual.emails && individual.emails.length > 0 && (
            <div className="sub-section">
              <h3>Emails</h3>
              <dl className="field-grid">
                {individual.emails.map((email, i) => (
                  <FieldValue
                    key={i}
                    label={email.type ?? "Email"}
                    value={email.data}
                  />
                ))}
              </dl>
            </div>
          )}

          {individual.phone_numbers && individual.phone_numbers.length > 0 && (
            <div className="sub-section">
              <h3>Phone Numbers</h3>
              <dl className="field-grid">
                {individual.phone_numbers.map((phone, i) => (
                  <FieldValue
                    key={i}
                    label={phone.type ?? "Phone"}
                    value={phone.data}
                  />
                ))}
              </dl>
            </div>
          )}

          {individual.residence && (
            <div className="sub-section">
              <h3>Residence</h3>
              <dl className="field-grid">
                <FieldValue
                  label="Address"
                  value={
                    [individual.residence.line1, individual.residence.line2]
                      .filter(Boolean)
                      .join(", ") || null
                  }
                />
                <FieldValue label="City" value={individual.residence.city} />
                <FieldValue label="State" value={individual.residence.state} />
                <FieldValue label="Postal Code" value={individual.residence.postal_code} />
                <FieldValue label="Country" value={individual.residence.country} />
              </dl>
            </div>
          )}
        </section>
      )}

      {employmentError && <ErrorBanner message={employmentError} />}
      {employment && (
        <section className="detail-section">
          <h2>Employment Information</h2>
          <dl className="field-grid">
            <FieldValue label="Title" value={employment.title} />
            <FieldValue label="Department" value={employment.department?.name} />
            <FieldValue label="Start Date" value={employment.start_date} />
            <FieldValue label="End Date" value={employment.end_date} />
            <FieldValue label="Active" value={employment.is_active} />
            <FieldValue label="Employment Type" value={employment.employment?.type} />
            <FieldValue label="Employment Subtype" value={employment.employment?.subtype} />
            <FieldValue label="Class Code" value={employment.class_code} />
            <FieldValue label="Source ID" value={employment.source_id} />
          </dl>

          {employment.income && (
            <div className="sub-section">
              <h3>Income</h3>
              <dl className="field-grid">
                <FieldValue
                  label="Amount"
                  value={
                    employment.income.amount !== null
                      ? `${(employment.income.amount / 100).toLocaleString("en-US", { style: "currency", currency: employment.income.currency ?? "USD" })}`
                      : null
                  }
                />
                <FieldValue label="Currency" value={employment.income.currency} />
              </dl>
            </div>
          )}

          {employment.location && (
            <div className="sub-section">
              <h3>Work Location</h3>
              <dl className="field-grid">
                <FieldValue
                  label="Address"
                  value={
                    [employment.location.line1, employment.location.line2]
                      .filter(Boolean)
                      .join(", ") || null
                  }
                />
                <FieldValue label="City" value={employment.location.city} />
                <FieldValue label="State" value={employment.location.state} />
                <FieldValue label="Postal Code" value={employment.location.postal_code} />
                <FieldValue label="Country" value={employment.location.country} />
              </dl>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
