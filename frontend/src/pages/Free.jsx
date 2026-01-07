import React, { useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Zap, BarChart3, DollarSign, Code, Crown, Info, Plus, Trash2, Download, FileText } from 'lucide-react';

// All 10 strategy templates
const STRATEGY_TEMPLATES = {
  'buy_hold': { name: '📈 Buy & Hold', description: 'Simple long position - buy and hold' },
  'ma_50': { name: '📊 50-Week MA', description: 'Buy on MA retracement' },
  'dca': { name: '💵 DCA', description: 'Dollar cost averaging' },
  'momentum': { name: '🚀 Momentum', description: 'Follow the trend' },
  'bollinger': { name: '📉 Bollinger Bands', description: 'Trade volatility bands' },
  'rsi': { name: '📈 RSI', description: 'Relative strength trading' },
  'breakout': { name: '💥 Breakout', description: 'New highs strategy' },
  'macd': { name: '📊 MACD', description: 'Moving average crossover' },
  'golden_cross': { name: '✨ Golden Cross', description: '50/200 MA strategy' },
  'rebalance': { name: '⚖️ Rebalance', description: 'Portfolio allocation' }
};

const METRIC_EXPLANATIONS = {
  median_return: {
    title: "Median Return",
    what: "The middle value when all simulations are ranked",
    why: "More reliable than average - not affected by outliers",
    interpret: "Your most likely outcome. Positive = profit",
    serious: "Take Very Seriously"
  },
  win_rate: {
    title: "Win Rate", 
    what: "Percentage of simulations that made money",
    why: "Shows probability of profit",
    interpret: "Above 50% = tends to profit. Above 70% = very reliable",
    serious: "Take Seriously"
  },
  sharpe_ratio: {
    title: "Sharpe Ratio",
    what: "Return per unit of risk (risk-adjusted performance)",
    why: "Shows if returns justify the volatility",
    interpret: "<0=Losing, 0-1=Sub-par, 1-2=Good, 2-3=Very Good, 3+=Excellent",
    serious: "Take Very Seriously - Professional Standard"
  },
  return_range: {
    title: "Return Range",
    what: "Best and worst case scenarios",
    why: "Shows spread of possible outcomes",
    interpret: "Wide range = high uncertainty. Know your risks!",
    serious: "Take Seriously"
  }
};

const Free = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('buy_hold');
  const [ticker, setTicker] = useState('AAPL');
  const [years, setYears] = useState(5);
  const [simulations, setSimulations] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [showInfo, setShowInfo] = useState(null);
  const [savedComparisons, setSavedComparisons] = useState([]);
  const chartRef = useRef(null);

  const runSimulation = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: STRATEGY_TEMPLATES[selectedStrategy].description,
          ticker: ticker,
          years: years,
          initial_investment: 10000,
          num_simulations: simulations
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      setResults({
        pathData: data.paths,
        stats: data.statistics,
        ticker: ticker,
        strategy: STRATEGY_TEMPLATES[selectedStrategy].name,
        timestamp: new Date().toLocaleString()
      });
    } catch (err) {
      setError(`Failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = async () => {
    if (!results) return;
    
    const pdfContent = `
QUANTA SIMULATION REPORT
========================

Strategy: ${results.strategy}
Ticker: ${results.ticker}
Period: ${years} years
Simulations: ${simulations}
Generated: ${results.timestamp}

RESULTS:
--------
Median Return: ${results.stats.median?.toLocaleString()} (${results.stats.median_roi?.toFixed(2)}% ROI)
Win Rate: ${results.stats.probability_of_profit?.toFixed(1)}%
Sharpe Ratio: ${results.stats.sharpe_ratio?.toFixed(2)}
Return Range: ${results.stats.min?.toLocaleString()} - ${results.stats.max?.toLocaleString()}

INTERPRETATION:
--------------
${results.stats.median_roi > 0 ? '✓ Strategy showed positive returns' : '✗ Strategy showed negative returns'}
${results.stats.probability_of_profit > 50 ? '✓ More likely to profit than lose' : '✗ More likely to lose than profit'}
Sharpe Ratio indicates: ${
  results.stats.sharpe_ratio < 1 ? 'Sub-par risk-adjusted returns' :
  results.stats.sharpe_ratio < 2 ? 'Good risk-adjusted returns' :
  results.stats.sharpe_ratio < 3 ? 'Very good risk-adjusted returns' : 
  'Excellent risk-adjusted returns'
}

Note: This is a Monte Carlo simulation based on historical volatility.
Past performance does not guarantee future results.

Generated by Quanta - quanta.com
    `;
    
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quanta-report-${results.ticker}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveForComparison = () => {
    if (!results) return;
    setSavedComparisons([...savedComparisons, { ...results, id: Date.now() }]);
  };

  const InfoTooltip = ({ metricKey }) => {
    const info = METRIC_EXPLANATIONS[metricKey];
    return (
      <div style={{
        position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
        marginTop: '0.5rem', backgroundColor: '#0f172a', border: '1px solid #475569',
        borderRadius: '0.5rem', padding: '1rem', minWidth: '300px', zIndex: 1000,
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#c084fc' }}>{info.title}</div>
        <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}><strong>What:</strong> {info.what}</div>
        <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}><strong>Why:</strong> {info.why}</div>
        <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}><strong>How to Read:</strong> {info.interpret}</div>
        <div style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: '600', marginTop: '0.5rem' }}>
          ⚠️ {info.serious}
        </div>
      </div>
    );
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #7e22ce 50%, #1e293b 100%)',
      color: 'white',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    card: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(12px)',
      borderRadius: '1rem',
      padding: '2rem',
      marginBottom: '2rem',
      border: '1px solid rgba(71, 85, 105, 0.5)'
    },
    button: {
      background: 'linear-gradient(to right, #9333ea, #db2777)',
      color: 'white',
      fontWeight: '600',
      padding: '1rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    statCard: {
      position: 'relative',
      backdropFilter: 'blur(12px)',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(126, 34, 206, 0.2))',
      border: '1px solid rgba(147, 51, 234, 0.3)'
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            color: '#4ade80',
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '1rem',
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }}>
            ✨ FREE TIER
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Zap style={{ width: '2.5rem', height: '2.5rem', color: '#c084fc', marginRight: '0.75rem' }} />
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #c084fc, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Quanta
            </h1>
          </div>
          <p style={{ fontSize: '1.125rem', color: '#cbd5e1' }}>
            Monte Carlo Simulations • 10 Strategies • PDF Export • Comparisons
          </p>
        </div>

        {/* Strategy Selection */}
        <div style={styles.card}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
            <Code style={{ marginRight: '0.5rem' }} />
            Choose Strategy
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {Object.entries(STRATEGY_TEMPLATES).map(([key, strategy]) => (
              <div
                key={key}
                onClick={() => setSelectedStrategy(key)}
                style={{
                  backgroundColor: selectedStrategy === key ? 'rgba(147, 51, 234, 0.2)' : 'rgba(15, 23, 42, 0.5)',
                  border: selectedStrategy === key ? '2px solid rgb(147, 51, 234)' : '2px solid rgba(71, 85, 105, 0.5)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  transform: selectedStrategy === key ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  {strategy.name.split(' ')[0]}
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: '600' }}>
                  {strategy.name.substring(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parameters */}
        <div style={styles.card}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
            <TrendingUp style={{ marginRight: '0.5rem' }} />
            Parameters
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#cbd5e1', display: 'block' }}>
                Ticker
              </label>
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgb(71, 85, 105)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  color: 'white',
                  fontSize: '1rem'
                }}
                placeholder="AAPL, TSLA..."
              />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#cbd5e1', display: 'block' }}>
                Years
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgb(71, 85, 105)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  color: 'white',
                  fontSize: '1rem'
                }}
                min="1"
                max="20"
              />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#cbd5e1', display: 'block' }}>
                Simulations
              </label>
              <input
                type="number"
                value={simulations}
                onChange={(e) => setSimulations(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgb(71, 85, 105)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  color: 'white',
                  fontSize: '1rem'
                }}
                min="100"
                max="10000"
                step="100"
              />
            </div>
          </div>

          {error && (
            <div style={{
              backgroundColor: 'rgba(127, 29, 29, 0.5)',
              border: '1px solid rgb(185, 28, 28)',
              borderRadius: '0.5rem',
              padding: '1rem',
              color: '#fecaca',
              marginBottom: '1rem'
            }}>
              {error}
            </div>
          )}

          <button
            onClick={runSimulation}
            disabled={loading}
            style={{
              ...styles.button,
              width: '100%',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? (
              <>
                <div style={{
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTop: '3px solid white',
                  borderRadius: '50%',
                  width: '1.25rem',
                  height: '1.25rem',
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.75rem'
                }}></div>
                Running...
              </>
            ) : (
              <>
                <Zap style={{ marginRight: '0.5rem' }} />
                Run Simulation
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {results && (
          <>
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={exportToPDF}
                style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  color: '#3b82f6',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Download size={20} />
                Export Report
              </button>
              <button
                onClick={saveForComparison}
                style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  color: '#4ade80',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Plus size={20} />
                Save for Comparison
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {['median_return', 'win_rate', 'sharpe_ratio', 'return_range'].map((metric) => (
                <div key={metric} style={styles.statCard}>
                  <button
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      backgroundColor: 'rgba(192, 132, 252, 0.2)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#c084fc'
                    }}
                    onMouseEnter={() => setShowInfo(metric)}
                    onMouseLeave={() => setShowInfo(null)}
                  >
                    <Info size={14} />
                  </button>
                  {showInfo === metric && <InfoTooltip metricKey={metric} />}
                  
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {METRIC_EXPLANATIONS[metric].title}
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {metric === 'median_return' && `${results.stats.median?.toLocaleString()}`}
                    {metric === 'win_rate' && `${results.stats.probability_of_profit?.toFixed(1)}%`}
                    {metric === 'sharpe_ratio' && results.stats.sharpe_ratio?.toFixed(2)}
                    {metric === 'return_range' && `${results.stats.min?.toLocaleString()} - ${results.stats.max?.toLocaleString()}`}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#cbd5e1', marginTop: '0.25rem' }}>
                    {metric === 'median_return' && `${results.stats.median_roi > 0 ? '+' : ''}${results.stats.median_roi?.toFixed(2)}% ROI`}
                    {metric === 'win_rate' && 'Profitable Simulations'}
                    {metric === 'sharpe_ratio' && (
                      results.stats.sharpe_ratio < 1 ? 'Sub-par' :
                      results.stats.sharpe_ratio < 2 ? 'Good' :
                      results.stats.sharpe_ratio < 3 ? 'Very Good' : 'Excellent'
                    )}
                    {metric === 'return_range' && 'Min - Max'}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div style={styles.card} ref={chartRef}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                Simulation Paths
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={results.pathData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" label={{ value: 'Months', position: 'insideBottom', offset: -5, fill: '#94a3b8' }} />
                  <YAxis stroke="#94a3b8" label={{ value: 'Value ($)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
                  <Legend />
                  {Object.keys(results.pathData[0] || {})
                    .filter(key => key.startsWith('path_'))
                    .map((key, index) => (
                      <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'][index % 5]}
                        dot={false}
                        strokeWidth={2}
                        name={`Path ${index + 1}`}
                      />
                    ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* Comparisons */}
        {savedComparisons.length > 0 && (
          <div style={styles.card}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
              Saved Comparisons
            </h2>
            {savedComparisons.map((comp) => (
              <div key={comp.id} style={{
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                borderRadius: '0.75rem',
                padding: '1rem',
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    {comp.ticker} - {comp.strategy}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                    ROI: {comp.stats.median_roi?.toFixed(2)}% | Win: {comp.stats.probability_of_profit?.toFixed(1)}%
                  </div>
                </div>
                <button
                  onClick={() => setSavedComparisons(savedComparisons.filter(c => c.id !== comp.id))}
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.5rem',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    color: '#ef4444'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '3rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
          <p>Quanta Free Tier - 10 Strategies • PDF Export • Unlimited Simulations</p>
          <p style={{ marginTop: '0.5rem' }}>Upgrade to Pro for AI-Generated Strategies</p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Free;