import React from 'react';
import { useParams } from 'react-router-dom';
import slaData from '../data/slaMockData.json';
import { SlaTachometerCard } from '../components/SlaTachometerCard';
import { LineChartWithSLA } from '../components/LineChartWithSLA';
import { CallTable } from '../components/CallTable';

export const ClientDetails: React.FC = () => {
  const { clientId } = useParams();
  const clientName = clientId === 'acme' ? 'AcmeRx' : clientId;
  const records = (slaData as any[]).filter(r => r.client === clientName);

  const api = records.filter(r => r.callType === 'API');
  const ncpdp = records.filter(r => r.callType === 'NCPDP');

  const avg = (arr: any[]) =>
    arr.length ? arr.reduce((sum, r) => sum + r.responseTimeMs, 0) / arr.length : 0;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Client: {clientName}</h1>
      <div className="flex gap-4 mb-6">
        <SlaTachometerCard label="API Avg" value={avg(api)} slaThreshold={500} />
        <SlaTachometerCard label="NCPDP Avg" value={avg(ncpdp)} slaThreshold={1000} />
      </div>
      <h2 className="text-xl font-semibold mb-2">Response Time Chart</h2>
      <div className="mb-6">
        {api.length > 0 ? (
          <LineChartWithSLA
            timestamps={api.slice(0, 10).map(r => r.timestamp)}
            responseTimes={api.slice(0, 10).map(r => r.responseTimeMs)}
            slaThreshold={500}
          />
        ) : (
          <p className="text-gray-500">Loading chart data...</p>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-2">Call Log</h2>
      <CallTable records={records.slice(0, 25)} />
    </div>
  );
};
