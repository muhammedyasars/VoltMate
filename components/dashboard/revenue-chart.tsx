'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function RevenueChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  

  useEffect(() => {
    if (!chartRef.current) return;
    
    // Destroy existing chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Mock data for the chart
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Revenue',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          borderColor: 'rgb(34, 197, 94)',
          borderWidth: 2,
          data: [5200, 6500, 7800, 8100, 9500, 10200, 12500, 13800, 14200, 15500, 16800, 18200],
          tension: 0.4,
          fill: true
        }
      ]
    };
    
    // Create chart
    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#1f2937',
            bodyColor: '#1f2937',
            borderColor: 'rgba(229, 231, 235, 1)',
            borderWidth: 1,
            padding: 10,
            boxPadding: 6,
            usePointStyle: true,
            callbacks: {
              label: function(context) {
                return `Revenue: $${context.raw}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              color: 'rgba(229, 231, 235, 0.8)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value;
              }
            }
          }
        }
      }
    });
    
    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="h-64">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}