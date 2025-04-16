import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlaTachometerCard } from '../components/SlaTachometerCard';
import slaData from '../data/slaMockData.json';

interface CallRecord {
  timestamp: string;
  client: string;
  callType: string;
  responseTimeMs: number;
}

export const Dashboard: React.FC = () => {
  const [apiAvg, setApiAvg] = useState(0);
  const [ncpdpAvg, setNcpdpAvg] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date('2025-04-07T12:00:00Z');
    const targetDate = now.toISOString().split('T')[0];
    const filtered = (slaData as CallRecord[]).filter(
      (d) => d.timestamp.startsWith(targetDate)
    );

    const api = filtered.filter((d) => d.callType === 'API');
    const ncpdp = filtered.filter((d) => d.callType === 'NCPDP');

    const avg = (arr: CallRecord[]) =>
      arr.length ? arr.reduce((sum, d) => sum + d.responseTimeMs, 0) / arr.length : 0;

    setApiAvg(avg(api));
    setNcpdpAvg(avg(ncpdp));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col gap-8 items-center">
      <h1 className="text-3xl font-bold">SLA Performance Dashboard</h1>
      <div className="flex gap-8">
        <div onClick={() => navigate('/client/acme')} className="cursor-pointer">
          <SlaTachometerCard label="API Calls" value={apiAvg} slaThreshold={500} />
        </div>
        <div onClick={() => navigate('/client/acme')} className="cursor-pointer">
          <SlaTachometerCard label="NCPDP Claims" value={ncpdpAvg} slaThreshold={1000} />
        </div>
      </div>
    </div>
  );
};

