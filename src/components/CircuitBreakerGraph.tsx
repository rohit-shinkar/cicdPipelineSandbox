import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ServiceHealth } from '../types/circuitBreaker';

interface Props {
  services: ServiceHealth[];
}

const getStateColor = (state: string) => {
  switch (state) {
    case 'CLOSED':
      return '#16a34a';
    case 'OPEN':
      return '#dc2626';
    case 'HALF_OPEN':
      return '#ca8a04';
    default:
      return '#6b7280';
  }
};

export const CircuitBreakerGraph: React.FC<Props> = ({ services }) => {
  // Generate mock historical data for the graph
  const historicalData = Array.from({ length: 12 }, (_, i) => {
    const timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - i);
    
    return {
      timestamp: timestamp.toISOString(),
      ...services.reduce((acc, service) => ({
        ...acc,
        [service.id]: Math.max(0, Math.min(100, 
          service.errorRate + (Math.random() * 5 - 2.5)
        ))
      }), {})
    };
  }).reverse();

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Error Rate Trends</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(time) => {
                const date = new Date(time);
                return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
              }}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(time) => new Date(time as string).toLocaleString()}
              formatter={(value, name) => [
                `${Number(value).toFixed(2)}%`,
                services.find(s => s.id === name)?.name || name
              ]}
            />
            <Legend />
            {services.map((service) => (
              <Line
                key={service.id}
                type="monotone"
                dataKey={service.id}
                name={service.name}
                stroke={getStateColor(service.state)}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};