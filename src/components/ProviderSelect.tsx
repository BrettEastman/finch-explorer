"use client";

import { PROVIDERS } from "@/lib/providers";

interface ProviderSelectProps {
  selectedProvider: string;
  onProviderChange: (providerId: string) => void;
  onConnect: () => void;
  isConnecting: boolean;
  isConnected: boolean;
  connectedProvider: string | null;
}

export default function ProviderSelect({
  selectedProvider,
  onProviderChange,
  onConnect,
  isConnecting,
  isConnected,
  connectedProvider,
}: ProviderSelectProps) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="app-title">Finch Sandbox Explorer</h1>
        <div className="connect-controls">
          <select
            value={selectedProvider}
            onChange={(e) => onProviderChange(e.target.value)}
            disabled={isConnecting}
            className="provider-select"
          >
            <option value="">Select a provider...</option>
            {PROVIDERS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <button
            onClick={onConnect}
            disabled={!selectedProvider || isConnecting}
            className="connect-button"
          >
            {isConnecting ? "Connecting..." : "Connect"}
          </button>
          {isConnected && connectedProvider && (
            <span className="connection-status">
              Connected to{" "}
              <strong>{PROVIDERS.find((p) => p.id === connectedProvider)?.name ?? connectedProvider}</strong>
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
