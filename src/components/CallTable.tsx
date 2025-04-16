import React from 'react';

interface CallRecord {
  timestamp: string;
  client: string;
  callType: string;
  responseTimeMs: number;
}

export const CallTable: React.FC<{ records: CallRecord[] }> = ({ records }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Call Type</th>
            <th className="px-4 py-2">Response Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i} className={r.responseTimeMs === 99000 ? 'bg-red-100 text-red-800' : ''}>
              <td className="px-4 py-2">{new Date(r.timestamp).toLocaleString()}</td>
              <td className="px-4 py-2">{r.callType}</td>
              <td className="px-4 py-2">{r.responseTimeMs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
