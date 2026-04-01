"use client";

import type { DirectoryPerson } from "@/lib/types";

interface EmployeeDirectoryProps {
  employees: DirectoryPerson[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function EmployeeDirectory({
  employees,
  selectedId,
  onSelect,
}: EmployeeDirectoryProps) {
  if (employees.length === 0) {
    return (
      <div className="directory-panel">
        <h2>Employee Directory</h2>
        <p className="empty-state">No employees found.</p>
      </div>
    );
  }

  return (
    <div className="directory-panel">
      <h2>Employee Directory</h2>
      <ul className="employee-list">
        {employees.map((emp) => {
          const name = [emp.first_name, emp.last_name].filter(Boolean).join(" ") || "Unknown";
          const isActive = emp.is_active !== false;

          return (
            <li key={emp.id}>
              <button
                className={`employee-item ${selectedId === emp.id ? "selected" : ""}`}
                onClick={() => onSelect(emp.id)}
              >
                <span className="employee-name">{name}</span>
                <span className="employee-meta">
                  {emp.department?.name && (
                    <span className="employee-dept">{emp.department.name}</span>
                  )}
                  <span className={`status-dot ${isActive ? "active" : "inactive"}`} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
