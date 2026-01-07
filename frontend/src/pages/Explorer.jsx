import React, { useState } from 'react';
import { TrendingUp, Flame, Clock, Search, Filter, BarChart3, Users, Zap, ArrowUpRight, Star } from 'lucide-react';

const Explorer = () => {
  const [selectedFilter, setSelectedFilter] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for trending strategies
  const trendingStrategies = [
    {
      id: 1,
      name: 'Golden Cross AAPL',
      author: '@traderMike',
      ticker: 'AAPL',
      type: 'Momentum',
      roi: 127.5,
      winRate: 78.3,
      simulations: 1243,
      likes: 589,
      trending: true,
      timeframe: '5Y'
    },
    {
      id: 2,
      name: 'RSI Mean Reversion',
      author: '@quantQueen',
      ticker: 'TSLA',
      type: 'Mean Reversion',
      roi: 94.2,
      winRate: 71.8,
      simulations: 892,
      likes: 423,
      trending: true,
      timeframe: '3Y'
    },
    {
      id: 3,
      name: 'Breakout Strategy',
      author: '@cryptoKing',
      ticker: 'BTC',
      type: 'Breakout',
      roi: 203.7,
      winRate: 65.4,
      simulations: 2341,
      likes: 1205,
      trending: true,
      timeframe: '10Y'
    },
    {
      id: 4,
      name: 'Bollinger Bands Gold',
      author: '@goldBull',
      ticker: 'GLD',
      type: 'Volatility',
      roi: 45.8,
      winRate: 82.1,
      simulations: 567,
      likes: 234,
      trending: false,
      timeframe: '5Y'
    },
    {
      id: 5,
      name: 'MACD Crossover NVDA',
      author: '@techTrader',
      ticker: 'NVDA',
      type: 'Momentum',
      roi: 156.3,
      winRate: 74.5,
      simulations: 1876,
      likes: 892,
      trending: true,
      timeframe: '3Y'
    },
    {
      id: 6,
      name: 'DCA + Momentum Hybrid',
      author: '@smartMoney',
      ticker: 'SPY',
      type: 'Hybrid',
      roi: 67.9,
      winRate: 88.2,
      simulations: 3421,
      likes: 1567,
      trending: true,
      timeframe: '5Y'
    }
  ];

  // Stats cards
  const stats = [
    { label: 'Total Strategies', value: '12.4K', icon: BarChart3, color: '#8b5cf6' },
    { label: 'Active Users', value: '8.9K', icon: Users, color: '#3b82f6' },
    { label: 'Simulations Run', value: '156K', icon: Zap, color: '#eab308' },
    { label: 'Avg Win Rate', value: '73.2%', icon: TrendingUp, color: '#10b981' }
  ];

  const filteredStrategies = trendingStrategies.filter(strategy => {
    if (selectedFilter === 'trending') return strategy.trending;
    if (selectedFilter === 'top-performers') return strategy.roi > 100;
    if (selectedFilter === 'recent') return true;
    return true;
  }).filter(strategy => {
    if (!searchQuery) return true;
    return strategy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           strategy.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
           strategy.author.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #7e22ce 50%, #1e293b 100%)',
      color: 'white',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    content: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    header: {
      marginBottom: '2rem'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      background: 'linear-gradient(to right, #c084fc, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    subtitle: {
      fontSize: '1.125rem',
      color: '#cbd5e1'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    statCard: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(12px)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid rgba(71, 85, 105, 0.5)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    statIcon: (color) => ({
      width: '48px',
      height: '48px',
      borderRadius: '0.75rem',
      backgroundColor: `${color}33`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color
    }),
    statInfo: {
      flex: 1
    },
    statValue: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      marginBottom: '0.25rem'
    },
    statLabel: {
      fontSize: '0.875rem',
      color: '#94a3b8'
    },
    searchBar: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(12px)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid rgba(71, 85, 105, 0.5)',
      marginBottom: '1.5rem'
    },
    searchInput: {
      width: '100%',
      backgroundColor: 'rgba(15, 23, 42, 0.5)',
      border: '1px solid rgb(71, 85, 105)',
      borderRadius: '0.5rem',
      padding: '0.75rem 1rem 0.75rem 3rem',
      color: 'white',
      fontSize: '1rem'
    },
    filterTabs: {
      display: 'flex',
      gap: '0.75rem',
      marginTop: '1rem',
      flexWrap: 'wrap'
    },
    filterTab: (isActive) => ({
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      background: isActive ? 'linear-gradient(to right, #9333ea, #db2777)' : 'rgba(71, 85, 105, 0.3)',
      color: 'white',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }),
    strategiesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
      gap: '1.5rem'
    },
    strategyCard: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(12px)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid rgba(71, 85, 105, 0.5)',
      transition: 'all 0.3s',
      cursor: 'pointer'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    strategyName: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '0.25rem'
    },
    author: {
      fontSize: '0.875rem',
      color: '#94a3b8'
    },
    trendingBadge: {
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      color: '#ef4444',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    ticker: {
      display: 'inline-block',
      backgroundColor: 'rgba(147, 51, 234, 0.2)',
      color: '#c084fc',
      padding: '0.25rem 0.75rem',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      marginBottom: '1rem'
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.75rem',
      marginBottom: '1rem'
    },
    metric: {
      backgroundColor: 'rgba(15, 23, 42, 0.5)',
      borderRadius: '0.5rem',
      padding: '0.75rem'
    },
    metricLabel: {
      fontSize: '0.75rem',
      color: '#94a3b8',
      marginBottom: '0.25rem'
    },
    metricValue: {
      fontSize: '1.25rem',
      fontWeight: 'bold'
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(71, 85, 105, 0.3)'
    },
    footerStat: {
      fontSize: '0.875rem',
      color: '#94a3b8',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    viewButton: {
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      color: '#3b82f6',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Explorer</h1>
          <p style={styles.subtitle}>
            Discover trending strategies and learn from top performers
          </p>
        </div>

        {/* Stats Overview */}
        <div style={styles.statsGrid}>
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} style={styles.statCard}>
                <div style={styles.statIcon(stat.color)}>
                  <Icon size={24} />
                </div>
                <div style={styles.statInfo}>
                  <div style={styles.statValue}>{stat.value}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div style={styles.searchBar}>
          <div style={{ position: 'relative' }}>
            <Search 
              size={20} 
              style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }} 
            />
            <input
              type="text"
              placeholder="Search strategies, tickers, or users..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div style={styles.filterTabs}>
            <button
              style={styles.filterTab(selectedFilter === 'trending')}
              onClick={() => setSelectedFilter('trending')}
            >
              <Flame size={16} />
              Trending
            </button>
            <button
              style={styles.filterTab(selectedFilter === 'top-performers')}
              onClick={() => setSelectedFilter('top-performers')}
            >
              <TrendingUp size={16} />
              Top Performers
            </button>
            <button
              style={styles.filterTab(selectedFilter === 'recent')}
              onClick={() => setSelectedFilter('recent')}
            >
              <Clock size={16} />
              Recent
            </button>
            <button
              style={styles.filterTab(selectedFilter === 'all')}
              onClick={() => setSelectedFilter('all')}
            >
              <Filter size={16} />
              All Strategies
            </button>
          </div>
        </div>

        {/* Strategies Grid */}
        <div style={styles.strategiesGrid}>
          {filteredStrategies.map((strategy) => (
            <div
              key={strategy.id}
              style={styles.strategyCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(147, 51, 234, 0.8)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(147, 51, 234, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(71, 85, 105, 0.5)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={styles.strategyName}>{strategy.name}</h3>
                  <p style={styles.author}>{strategy.author}</p>
                </div>
                {strategy.trending && (
                  <div style={styles.trendingBadge}>
                    <Flame size={12} />
                    HOT
                  </div>
                )}
              </div>

              <div>
                <span style={styles.ticker}>{strategy.ticker}</span>
                <span style={{ 
                  marginLeft: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#94a3b8'
                }}>
                  {strategy.type} • {strategy.timeframe}
                </span>
              </div>

              <div style={styles.metricsGrid}>
                <div style={styles.metric}>
                  <div style={styles.metricLabel}>ROI</div>
                  <div style={{ ...styles.metricValue, color: '#4ade80' }}>
                    +{strategy.roi}%
                  </div>
                </div>
                <div style={styles.metric}>
                  <div style={styles.metricLabel}>Win Rate</div>
                  <div style={styles.metricValue}>{strategy.winRate}%</div>
                </div>
              </div>

              <div style={styles.cardFooter}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span style={styles.footerStat}>
                    <BarChart3 size={14} />
                    {strategy.simulations.toLocaleString()}
                  </span>
                  <span style={styles.footerStat}>
                    <Star size={14} />
                    {strategy.likes}
                  </span>
                </div>
                <button 
                  style={styles.viewButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
                  }}
                >
                  View
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStrategies.length === 0 && (
          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(12px)',
            borderRadius: '1rem',
            padding: '3rem',
            border: '1px solid rgba(71, 85, 105, 0.5)',
            textAlign: 'center'
          }}>
            <p style={{ color: '#94a3b8', fontSize: '1.125rem' }}>
              No strategies found. Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explorer;