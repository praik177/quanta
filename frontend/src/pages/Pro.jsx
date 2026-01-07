import React, { useState } from 'react';
import { Sparkles, Code2, Play, Download, BarChart3 } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  Cell
} from 'recharts';

const Pro = () => {
  const [activeTab, setActiveTab] = useState('ai-generator');
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedStrategy, setGeneratedStrategy] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedChart, setSelectedChart] = useState('monte-carlo');
  
  const [ticker, setTicker] = useState('AAPL');
  const [timeframe, setTimeframe] = useState('5');
  const [riskLevel, setRiskLevel] = useState('moderate');
  const [strategyType, setStrategyType] = useState('momentum');
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  const generateChartData = () => {
    const monteCarloPaths = [];
    for (let month = 0; month <= 60; month++) {
      const dataPoint = { month };
      for (let path = 1; path <= 5; path++) {
        const trend = 10000 * Math.pow(1.006, month);
        const volatility = trend * 0.15 * (Math.random() - 0.5);
        dataPoint[`path${path}`] = Math.round(trend + volatility);
      }
      monteCarloPaths.push(dataPoint);
    }

    const returnsDistribution = [];
    for (let i = -30; i <= 50; i += 5) {
      returnsDistribution.push({
        returnPct: i,
        frequency: Math.round(100 * Math.exp(-Math.pow(i - 10, 2) / 200))
      });
    }

    const drawdownData = [];
    let peak = 10000;
    let current = 10000;
    for (let day = 0; day <= 365; day++) {
      current = current * (1 + (Math.random() - 0.48) * 0.02);
      peak = Math.max(peak, current);
      const drawdown = ((current - peak) / peak) * 100;
      drawdownData.push({ day, drawdown: parseFloat(drawdown.toFixed(2)) });
    }

    const riskReturnData = [
      { name: 'Conservative', risk: 8, returnVal: 12 },
      { name: 'Moderate', risk: 15, returnVal: 22 },
      { name: 'Aggressive', risk: 25, returnVal: 35 },
      { name: 'AI-Optimized', risk: 18, returnVal: 32 },
      { name: 'Current', risk: 16, returnVal: 25 }
    ];

    const probabilityCone = [];
    for (let month = 0; month <= 60; month++) {
      const mean = 10000 * Math.pow(1.006, month);
      probabilityCone.push({
        month,
        mean: mean,
        upper95: mean * 1.4,
        upper75: mean * 1.2,
        lower75: mean * 0.8,
        lower95: mean * 0.6
      });
    }

    return {
      monteCarloPaths,
      returnsDistribution,
      drawdownData,
      riskReturnData,
      probabilityCone
    };
  };

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedStrategy({
        name: 'AI-Optimized Momentum Strategy',
        description: `Custom ${strategyType} strategy for ${ticker} optimized for ${riskLevel} risk`,
        code: `# AI-Generated Strategy for ${ticker}
def custom_strategy(data):
    # Entry: RSI < 30 and volume spike
    # Exit: RSI > 70 or 10% stop loss
    # Risk level: ${riskLevel}
    
    signals = []
    for i in range(len(data)):
        if data['rsi'][i] < 30:
            signals.append('BUY')
        elif data['rsi'][i] > 70:
            signals.append('SELL')
        else:
            signals.append('HOLD')
    return signals`,
        parameters: {
          rsi_buy: 30,
          rsi_sell: 70,
          stop_loss: 10,
          position_size: riskLevel === 'aggressive' ? 0.25 : riskLevel === 'moderate' ? 0.15 : 0.10
        }
      });
      setIsGenerating(false);
    }, 2000);
  };

  const runProSimulation = async () => {
    setLoading(true);
    setTimeout(() => {
      setResults({
        median_return: 18500,
        median_roi: 85.0,
        win_rate: 72.5,
        sharpe_ratio: 2.34,
        max_drawdown: -15.2,
        volatility: 12.8
      });
      setChartData(generateChartData());
      setLoading(false);
      setActiveTab('advanced-charts');
    }, 1500);
  };

  const exportToPython = () => {
    if (!generatedStrategy) return;
    const blob = new Blob([generatedStrategy.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `strategy_${ticker}_${Date.now()}.py`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #7e22ce 50%, #1e293b 100%)',
      color: 'white',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    content: { maxWidth: '1400px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #c084fc, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    proBadge: {
      backgroundColor: '#eab308',
      color: '#000',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    subtitle: { fontSize: '1.125rem', color: '#cbd5e1', marginBottom: '2rem' },
    tabs: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      borderBottom: '1px solid rgba(71, 85, 105, 0.5)',
      paddingBottom: '1rem',
      flexWrap: 'wrap'
    },
    tab: (isActive) => ({
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      background: isActive ? 'linear-gradient(to right, #9333ea, #db2777)' : 'rgba(71, 85, 105, 0.3)',
      color: 'white',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }),
    card: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(12px)',
      borderRadius: '1rem',
      padding: '2rem',
      border: '1px solid rgba(71, 85, 105, 0.5)',
      marginBottom: '1.5rem'
    },
    inputGroup: { marginBottom: '1.5rem' },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#cbd5e1'
    },
    input: {
      width: '100%',
      backgroundColor: 'rgba(15, 23, 42, 0.5)',
      border: '1px solid rgb(71, 85, 105)',
      borderRadius: '0.5rem',
      padding: '0.75rem',
      color: 'white',
      fontSize: '1rem'
    },
    textarea: {
      width: '100%',
      backgroundColor: 'rgba(15, 23, 42, 0.5)',
      border: '1px solid rgb(71, 85, 105)',
      borderRadius: '0.5rem',
      padding: '0.75rem',
      color: 'white',
      fontSize: '1rem',
      minHeight: '120px',
      resize: 'vertical'
    },
    select: {
      width: '100%',
      backgroundColor: 'rgba(15, 23, 42, 0.5)',
      border: '1px solid rgb(71, 85, 105)',
      borderRadius: '0.5rem',
      padding: '0.75rem',
      color: 'white',
      fontSize: '1rem'
    },
    button: {
      background: 'linear-gradient(to right, #9333ea, #db2777)',
      color: 'white',
      fontWeight: '600',
      padding: '1rem 2rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    secondaryButton: {
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
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    },
    codeBlock: {
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      border: '1px solid rgba(71, 85, 105, 0.5)',
      borderRadius: '0.5rem',
      padding: '1rem',
      fontFamily: 'monospace',
      fontSize: '0.875rem',
      overflowX: 'auto',
      whiteSpace: 'pre-wrap',
      color: '#4ade80'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem'
    },
    statCard: {
      background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(126, 34, 206, 0.2))',
      border: '1px solid rgba(147, 51, 234, 0.3)',
      borderRadius: '0.75rem',
      padding: '1.5rem'
    },
    chartSelector: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    chartCard: (isSelected) => ({
      backgroundColor: isSelected ? 'rgba(147, 51, 234, 0.3)' : 'rgba(15, 23, 42, 0.5)',
      border: isSelected ? '2px solid rgb(147, 51, 234)' : '1px solid rgba(71, 85, 105, 0.5)',
      borderRadius: '0.75rem',
      padding: '1rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s'
    })
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Pro Strategies</h1>
          <span style={styles.proBadge}>
            <Sparkles size={16} />
            PRO
          </span>
        </div>
        <p style={styles.subtitle}>
          AI-powered strategy generation, advanced analytics, and custom simulations
        </p>

        <div style={styles.tabs}>
          <button style={styles.tab(activeTab === 'ai-generator')} onClick={() => setActiveTab('ai-generator')}>
            <Sparkles size={20} />
            AI Generator
          </button>
          <button style={styles.tab(activeTab === 'advanced-charts')} onClick={() => setActiveTab('advanced-charts')}>
            <BarChart3 size={20} />
            Advanced Charts
          </button>
          <button style={styles.tab(activeTab === 'code-editor')} onClick={() => setActiveTab('code-editor')}>
            <Code2 size={20} />
            Code Editor
          </button>
        </div>

        {activeTab === 'ai-generator' && (
          <>
            <div style={styles.card}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                <Sparkles style={{ display: 'inline', marginRight: '0.5rem' }} />
                AI Strategy Generator
              </h2>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Describe Your Strategy</label>
                <textarea
                  style={styles.textarea}
                  placeholder="Example: I want a momentum strategy that buys on RSI dips below 30..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
              </div>

              <div style={styles.grid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Ticker Symbol</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Timeframe</label>
                  <select style={styles.select} value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
                    <option value="1">1 Year</option>
                    <option value="3">3 Years</option>
                    <option value="5">5 Years</option>
                    <option value="10">10 Years</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Risk Level</label>
                  <select style={styles.select} value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>
                    <option value="conservative">Conservative</option>
                    <option value="moderate">Moderate</option>
                    <option value="aggressive">Aggressive</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Strategy Type</label>
                  <select style={styles.select} value={strategyType} onChange={(e) => setStrategyType(e.target.value)}>
                    <option value="momentum">Momentum</option>
                    <option value="mean-reversion">Mean Reversion</option>
                    <option value="breakout">Breakout</option>
                  </select>
                </div>
              </div>

              <button style={styles.button} onClick={handleAIGenerate} disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate AI Strategy'}
              </button>
            </div>

            {generatedStrategy && (
              <>
                <div style={styles.card}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                    ✨ {generatedStrategy.name}
                  </h3>
                  <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
                    {generatedStrategy.description}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button style={styles.button} onClick={runProSimulation} disabled={loading}>
                      <Play size={20} />
                      {loading ? 'Running...' : 'Run Simulation'}
                    </button>
                    <button style={styles.secondaryButton} onClick={exportToPython}>
                      <Download size={20} />
                      Export Python Code
                    </button>
                  </div>
                </div>

                <div style={styles.card}>
                  <h4 style={{ marginBottom: '1rem' }}>Generated Python Code:</h4>
                  <div style={styles.codeBlock}>{generatedStrategy.code}</div>
                </div>

                {results && (
                  <div style={styles.card}>
                    <h3 style={{ marginBottom: '1rem' }}>📊 Simulation Results</h3>
                    <div style={styles.statsGrid}>
                      <div style={styles.statCard}>
                        <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Median Return</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>${results.median_return.toLocaleString()}</div>
                        <div style={{ color: '#4ade80' }}>+{results.median_roi}% ROI</div>
                      </div>
                      <div style={styles.statCard}>
                        <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Win Rate</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{results.win_rate}%</div>
                      </div>
                      <div style={styles.statCard}>
                        <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Sharpe Ratio</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{results.sharpe_ratio}</div>
                      </div>
                      <div style={styles.statCard}>
                        <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Max Drawdown</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{results.max_drawdown}%</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {activeTab === 'advanced-charts' && (
          <>
            {!chartData ? (
              <div style={styles.card}>
                <p style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
                  Run a simulation first to see charts
                </p>
              </div>
            ) : (
              <>
                <div style={styles.chartSelector}>
                  {[
                    { id: 'monte-carlo', name: 'Monte Carlo Paths', icon: '📈' },
                    { id: 'returns', name: 'Returns Distribution', icon: '📊' },
                    { id: 'drawdown', name: 'Drawdown Analysis', icon: '📉' },
                    { id: 'risk-return', name: 'Risk/Return', icon: '🎯' },
                    { id: 'probability', name: 'Probability Cone', icon: '📐' }
                  ].map(chart => (
                    <div
                      key={chart.id}
                      style={styles.chartCard(selectedChart === chart.id)}
                      onClick={() => setSelectedChart(chart.id)}
                    >
                      <div style={{ fontSize: '2rem' }}>{chart.icon}</div>
                      <div style={{ fontWeight: '600', fontSize: '0.875rem', marginTop: '0.5rem' }}>{chart.name}</div>
                    </div>
                  ))}
                </div>

                <div style={styles.card}>
                  {selectedChart === 'monte-carlo' && (
                    <>
                      <h3 style={{ marginBottom: '1rem' }}>📈 Monte Carlo Paths</h3>
                      <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData.monteCarloPaths}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="month" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                          <Legend />
                          <Line type="monotone" dataKey="path1" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="path2" stroke="#ec4899" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="path3" stroke="#3b82f6" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="path4" stroke="#10b981" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="path5" stroke="#f59e0b" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </>
                  )}

                  {selectedChart === 'returns' && (
                    <>
                      <h3 style={{ marginBottom: '1rem' }}>📊 Returns Distribution</h3>
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={chartData.returnsDistribution}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="returnPct" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                          <Bar dataKey="frequency" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </>
                  )}

                  {selectedChart === 'drawdown' && (
                    <>
                      <h3 style={{ marginBottom: '1rem' }}>📉 Drawdown Analysis</h3>
                      <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={chartData.drawdownData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="day" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                          <Area type="monotone" dataKey="drawdown" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </>
                  )}

                  {selectedChart === 'risk-return' && (
                    <>
                      <h3 style={{ marginBottom: '1rem' }}>🎯 Risk vs Return</h3>
                      <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="risk" stroke="#94a3b8" />
                          <YAxis dataKey="returnVal" stroke="#94a3b8" />
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                          <Scatter data={chartData.riskReturnData} fill="#8b5cf6">
                            {chartData.riskReturnData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={['#10b981', '#3b82f6', '#ef4444', '#eab308', '#8b5cf6'][index]} />
                            ))}
                          </Scatter>
                        </ScatterChart>
                      </ResponsiveContainer>
                    </>
                  )}

                  {selectedChart === 'probability' && (
                    <>
                      <h3 style={{ marginBottom: '1rem' }}>📐 Probability Cone</h3>
                      <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={chartData.probabilityCone}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="month" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                          <Area type="monotone" dataKey="upper95" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                          <Area type="monotone" dataKey="upper75" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                          <Area type="monotone" dataKey="mean" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} strokeWidth={3} />
                          <Area type="monotone" dataKey="lower75" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                          <Area type="monotone" dataKey="lower95" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {activeTab === 'code-editor' && (
          <div style={styles.card}>
            <h2 style={{ marginBottom: '1.5rem' }}>💻 Custom Python Strategy Editor</h2>
            <textarea
              style={{...styles.textarea, minHeight: '300px', fontFamily: 'monospace'}}
              placeholder="Write your custom Python strategy here..."
            />
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <button style={styles.button}>
                <Play size={20} />
                Test Strategy
              </button>
              <button style={styles.secondaryButton}>
                <Download size={20} />
                Save Template
              </button>
            </div>
          </div>
        )}
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

export default Pro;