"use client";

import { useState, useCallback } from "react";
import type {
  CompanyData,
  DirectoryPerson,
  IndividualData,
  EmploymentData,
} from "@/lib/types";
import { isApiError } from "@/lib/types";
import ProviderSelect from "@/components/ProviderSelect";
import CompanyInfo from "@/components/CompanyInfo";
import EmployeeDirectory from "@/components/EmployeeDirectory";
import EmployeeDetail from "@/components/EmployeeDetail";
import ErrorBanner from "@/components/ErrorBanner";

export default function Home() {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedProvider, setConnectedProvider] = useState<string | null>(null);
  const [connectError, setConnectError] = useState<string | null>(null);

  const [company, setCompany] = useState<CompanyData | null>(null);
  const [companyError, setCompanyError] = useState<string | null>(null);

  const [directory, setDirectory] = useState<DirectoryPerson[]>([]);
  const [directoryError, setDirectoryError] = useState<string | null>(null);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [individual, setIndividual] = useState<IndividualData | null>(null);
  const [employment, setEmployment] = useState<EmploymentData | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [individualError, setIndividualError] = useState<string | null>(null);
  const [employmentError, setEmploymentError] = useState<string | null>(null);

  const handleConnect = useCallback(async () => {
    if (!selectedProvider) return;

    setIsConnecting(true);
    setConnectError(null);
    setCompany(null);
    setCompanyError(null);
    setDirectory([]);
    setDirectoryError(null);
    setSelectedEmployeeId(null);
    setIndividual(null);
    setEmployment(null);
    setIndividualError(null);
    setEmploymentError(null);

    try {
      const connectRes = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider_id: selectedProvider }),
      });
      const connectData = await connectRes.json();

      if (isApiError(connectData)) {
        setConnectError(connectData.message);
        setIsConnecting(false);
        return;
      }

      setIsConnected(true);
      setConnectedProvider(selectedProvider);

      const [companyRes, directoryRes] = await Promise.all([
        fetch("/api/company"),
        fetch("/api/directory"),
      ]);

      const companyJson = await companyRes.json();
      if (isApiError(companyJson)) {
        setCompanyError(companyJson.message);
      } else {
        setCompany(companyJson);
      }

      const directoryJson = await directoryRes.json();
      if (isApiError(directoryJson)) {
        setDirectoryError(directoryJson.message);
      } else {
        setDirectory(directoryJson.individuals ?? []);
      }
    } catch {
      setConnectError("An unexpected error occurred. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  }, [selectedProvider]);

  const handleSelectEmployee = useCallback(async (id: string) => {
    setSelectedEmployeeId(id);
    setIsLoadingDetail(true);
    setIndividual(null);
    setEmployment(null);
    setIndividualError(null);
    setEmploymentError(null);

    try {
      const [indRes, empRes] = await Promise.all([
        fetch("/api/individual", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ individual_ids: [id] }),
        }),
        fetch("/api/employment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ individual_ids: [id] }),
        }),
      ]);

      const indJson = await indRes.json();
      if (isApiError(indJson)) {
        setIndividualError(indJson.message);
      } else {
        const person = indJson.individuals?.[0]?.body;
        setIndividual(person ?? null);
      }

      const empJson = await empRes.json();
      if (isApiError(empJson)) {
        setEmploymentError(empJson.message);
      } else {
        const emp = empJson.employments?.[0]?.body;
        setEmployment(emp ?? null);
      }
    } catch {
      setIndividualError("Failed to load employee details.");
    } finally {
      setIsLoadingDetail(false);
    }
  }, []);

  return (
    <div className="app">
      <ProviderSelect
        selectedProvider={selectedProvider}
        onProviderChange={setSelectedProvider}
        onConnect={handleConnect}
        isConnecting={isConnecting}
        isConnected={isConnected}
        connectedProvider={connectedProvider}
      />

      <main className="main-content">
        {connectError && (
          <ErrorBanner message={connectError} onDismiss={() => setConnectError(null)} />
        )}

        {!isConnected && !isConnecting && (
          <div className="welcome">
            <h2>Welcome</h2>
            <p>Select a payroll provider above and click Connect to get started.</p>
          </div>
        )}

        {isConnecting && (
          <div className="welcome">
            <p className="loading-state">Connecting to provider...</p>
          </div>
        )}

        {isConnected && (
          <>
            {companyError ? (
              <ErrorBanner message={companyError} onDismiss={() => setCompanyError(null)} />
            ) : (
              <CompanyInfo company={company} />
            )}

            {directoryError && (
              <ErrorBanner message={directoryError} onDismiss={() => setDirectoryError(null)} />
            )}

            <div className="directory-detail-layout">
              <EmployeeDirectory
                employees={directory}
                selectedId={selectedEmployeeId}
                onSelect={handleSelectEmployee}
              />
              <EmployeeDetail
                individual={individual}
                employment={employment}
                isLoading={isLoadingDetail}
                individualError={individualError}
                employmentError={employmentError}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
