import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsData {
  ageDistribution: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string;
    }>;
  };
  conditionPrevalence: {
    labels: string[];
    data: number[];
    backgroundColor: string[];
  };
  severityDistribution: {
    labels: string[];
    data: number[];
    backgroundColor: string[];
  };
  monthlyTrends: {
    labels: string[];
    data: number[];
  };
}

interface DashboardChartsProps {
  analytics: AnalyticsData;
}

declare global {
  interface Window {
    Chart: any;
  }
}

export default function DashboardCharts({ analytics }: DashboardChartsProps) {
  const ageChartRef = useRef<HTMLCanvasElement>(null);
  const conditionChartRef = useRef<HTMLCanvasElement>(null);
  const severityChartRef = useRef<HTMLCanvasElement>(null);
  const trendsChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Load Chart.js dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = initializeCharts;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [analytics]);

  const initializeCharts = () => {
    if (!window.Chart) return;

    // Age Distribution Chart
    if (ageChartRef.current) {
      new window.Chart(ageChartRef.current, {
        type: 'bar',
        data: {
          labels: analytics.ageDistribution.labels,
          datasets: analytics.ageDistribution.datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // Condition Prevalence Chart
    if (conditionChartRef.current) {
      new window.Chart(conditionChartRef.current, {
        type: 'doughnut',
        data: {
          labels: analytics.conditionPrevalence.labels,
          datasets: [{
            data: analytics.conditionPrevalence.data,
            backgroundColor: analytics.conditionPrevalence.backgroundColor
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

    // Severity Distribution Chart
    if (severityChartRef.current) {
      new window.Chart(severityChartRef.current, {
        type: 'pie',
        data: {
          labels: analytics.severityDistribution.labels,
          datasets: [{
            data: analytics.severityDistribution.data,
            backgroundColor: analytics.severityDistribution.backgroundColor
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

    // Trends Chart
    if (trendsChartRef.current) {
      new window.Chart(trendsChartRef.current, {
        type: 'line',
        data: {
          labels: analytics.monthlyTrends.labels,
          datasets: [{
            label: 'Assessments Completed',
            data: analytics.monthlyTrends.data,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Age Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Mental Health Conditions by Age Group</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <canvas ref={ageChartRef}></canvas>
          </div>
        </CardContent>
      </Card>

      {/* Condition Prevalence Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Most Common Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <canvas ref={conditionChartRef}></canvas>
          </div>
        </CardContent>
      </Card>

      {/* Severity Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Severity Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <canvas ref={severityChartRef}></canvas>
          </div>
        </CardContent>
      </Card>

      {/* Trends Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Detection Trends (Last 12 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <canvas ref={trendsChartRef}></canvas>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
