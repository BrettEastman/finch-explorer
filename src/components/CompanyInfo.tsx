"use client";

import type { CompanyData } from "@/lib/types";
import FieldValue from "./FieldValue";

interface CompanyInfoProps {
  company: CompanyData | null;
}

export default function CompanyInfo({ company }: CompanyInfoProps) {
  if (!company) return null;

  return (
    <section className="company-section">
      <h2>Company Information</h2>
      <dl className="field-grid">
        <FieldValue label="Legal Name" value={company.legal_name} />
        <FieldValue label="EIN" value={company.ein} />
        <FieldValue label="Entity Type" value={company.entity?.type} />
        <FieldValue label="Entity Subtype" value={company.entity?.subtype} />
        <FieldValue label="Primary Email" value={company.primary_email} />
        <FieldValue label="Primary Phone" value={company.primary_phone_number} />
      </dl>

      {company.departments && company.departments.length > 0 && (
        <div className="sub-section">
          <h3>Departments</h3>
          <ul className="tag-list">
            {company.departments.map((dept, i) => (
              <li key={i} className="tag">{dept.name ?? "N/A"}</li>
            ))}
          </ul>
        </div>
      )}

      {company.locations && company.locations.length > 0 && (
        <div className="sub-section">
          <h3>Locations</h3>
          {company.locations.map((loc, i) => (
            <div key={i} className="location-card">
              <FieldValue label="Address" value={[loc.line1, loc.line2].filter(Boolean).join(", ") || null} />
              <FieldValue label="City" value={loc.city} />
              <FieldValue label="State" value={loc.state} />
              <FieldValue label="Postal Code" value={loc.postal_code} />
              <FieldValue label="Country" value={loc.country} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
