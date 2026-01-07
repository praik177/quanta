import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, TrendingUp, Users, Hash, Image, Send, MoreHorizontal } from 'lucide-react';

const Social = () => {
  const [newPost, setNewPost] = useState('');
  const [likedPosts, setLikedPosts] = useState([]);

  // Mock posts data
  const posts = [
    {
      id: 1,
      author: {
        name: 'Sarah Chen',
        username: '@tradingSarah',
        avatar: '👩‍💼',
        verified: true
      },
      timestamp: '2 hours ago',
      content: 'Just ran a Monte Carlo simulation on $AAPL with my custom momentum strategy. Results are insane! 📈',
      strategy: {
        ticker: 'AAPL',
        roi: 127.5,
        winRate: 78.3,
        timeframe: '5Y'
      },
      chartPreview: true,
      likes: 234,
      comments: 45,
      shares: 12,
      hashtags: ['momentum', 'AAPL', 'MonteCarloSimulation']
    },
    {
      id: 2,
      author: {
        name: 'Mike Trader',
        username: '@mikeTrades',
        avatar: '👨‍💻',
        verified: false
      },
      timestamp: '5 hours ago',
      content: 'New to Quanta - can someone explain how the Sharpe Ratio works? I keep seeing it everywhere 🤔',
      strategy: null,
      chartPreview: false,
      likes: 89,
      comments: 34,
      shares: 3,
      hashtags: ['help', 'beginner']
    },
    {
      id: 3,
      author: {
        name: 'Crypto Queen',
        username: '@cryptoQueen',
        avatar: '👑',
        verified: true
      },
      timestamp: '8 hours ago',
      content: 'BTC breakout strategy absolutely crushing it! Who else is long on crypto right now? 🚀💎',
      strategy: {
        ticker: 'BTC',
        roi: 203.7,
        winRate: 65.4,
        timeframe: '10Y'
      },
      chartPreview: true,
      likes: 567,
      comments: 128,
      shares: 89,
      hashtags: ['Bitcoin', 'crypto', 'breakout', 'HODL']
    },
    {
      id: 4,
      author: {
        name: 'Alex Rodriguez',
        username: '@quantAlex',
        avatar: '🧑‍🔬',
        verified: true
      },
      timestamp: '1 day ago',
      content: 'Just published my new mean reversion strategy for $TSLA. Check it out and let me know what you think!',
      strategy: {
        ticker: 'TSLA',
        roi: 94.2,
        winRate: 71.8,
        timeframe: '3Y'
      },
      chartPreview: true,
      likes: 445,
      comments: 67,
      shares: 34,
      hashtags: ['TSLA', 'meanReversion', 'ProStrategy']
    }
  ];

  const trendingTopics = [
    { tag: 'MonteCarloSimulation', posts: 1243 },
    { tag: 'AAPL', posts: 892 },
    { tag: 'crypto', posts: 2341 },
    { tag: 'momentum', posts: 567 },
    { tag: 'ProStrategies', posts: 1876 }
  ];

  const suggestedUsers = [
    { name: 'Warren AI', username: '@warrenAI', followers: '12.4K', avatar: '🤖' },
    { name: 'Quant Master', username: '@quantMaster', followers: '8.9K', avatar: '🎯' },
    { name: 'Day Trader Pro', username: '@dayTrader', followers: '15.2K', avatar: '💹' }
  ];

  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

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
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr',
      gap: '1.5rem'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      background: 'linear-gradient(to right, #c084fc, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      gridColumn: '1 / -1'
    },
    subtitle: {
      fontSize: '1.125rem',
      color: '#cbd5e1',
      marginBottom: '2rem',
      gridColumn: '1 / -1'
    },
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    card: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(12px)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid rgba(71, 85, 105, 0.5)'
    },
    feed: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    createPost: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(12px)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid rgba(71, 85, 105, 0.5)',
      marginBottom: '1rem'
    },
    textarea: {
      width: '100%',
      backgroundColor: 'rgba(15, 23, 42, 0.5)',
      border: '1px solid rgb(71, 85, 105)',
      borderRadius: '0.5rem',
      padding: '0.75rem',
      color: 'white',
      fontSize: '1rem',
      minHeight: '100px',
      resize: 'vertical',
      marginBottom: '1rem'
    },
    postButton: {
      background: 'linear-gradient(to right, #9333ea, #db2777)',
      color: 'white',
      fontWeight: '600',
      padding: '0.75rem 2rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    post: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(12px)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid rgba(71, 85, 105, 0.5)',
      transition: 'all 0.2s'
    },
    postHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    avatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: 'rgba(147, 51, 234, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem'
    },
    username: {
      fontWeight: '600',
      marginBottom: '0.25rem'
    },
    handle: {
      fontSize: '0.875rem',
      color: '#94a3b8'
    },
    verified: {
      display: 'inline-block',
      marginLeft: '0.25rem',
      color: '#3b82f6'
    },
    timestamp: {
      fontSize: '0.875rem',
      color: '#94a3b8'
    },
    moreButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#94a3b8',
      cursor: 'pointer',
      padding: '0.25rem'
    },
    postContent: {
      marginBottom: '1rem',
      lineHeight: '1.6'
    },
    hashtag: {
      color: '#3b82f6',
      cursor: 'pointer'
    },
    strategyCard: {
      backgroundColor: 'rgba(15, 23, 42, 0.5)',
      borderRadius: '0.75rem',
      padding: '1rem',
      marginBottom: '1rem',
      border: '1px solid rgba(71, 85, 105, 0.5)'
    },
    strategyGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '0.75rem',
      marginTop: '0.5rem'
    },
    strategyMetric: {
      textAlign: 'center'
    },
    metricLabel: {
      fontSize: '0.75rem',
      color: '#94a3b8',
      marginBottom: '0.25rem'
    },
    metricValue: {
      fontSize: '1.125rem',
      fontWeight: 'bold'
    },
    chartPreview: {
      width: '100%',
      height: '200px',
      backgroundColor: 'rgba(15, 23, 42, 0.5)',
      borderRadius: '0.5rem',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#94a3b8',
      fontSize: '0.875rem'
    },
    postActions: {
      display: 'flex',
      gap: '2rem',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(71, 85, 105, 0.3)'
    },
    actionButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#94a3b8',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      transition: 'color 0.2s'
    },
    sidebarTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    trendingItem: {
      padding: '0.75rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginBottom: '0.5rem'
    },
    userCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginBottom: '0.5rem'
    },
    followButton: {
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      color: '#3b82f6',
      padding: '0.375rem 0.875rem',
      borderRadius: '0.375rem',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.75rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Social</h1>
        <p style={styles.subtitle}>
          Share strategies, discuss trades, and learn from the community
        </p>

        {/* Left Sidebar - User Stats */}
        <div style={styles.sidebar}>
          <div style={styles.card}>
            <div style={styles.sidebarTitle}>
              <Users size={20} />
              Your Stats
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>24</div>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Strategies Shared</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>892</div>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Followers</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1.2K</div>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Following</div>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.sidebarTitle}>
              <Hash size={20} />
              Trending Topics
            </div>
            {trendingTopics.map((topic, i) => (
              <div
                key={i}
                style={styles.trendingItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(71, 85, 105, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ fontWeight: '600' }}>#{topic.tag}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {topic.posts.toLocaleString()} posts
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Feed */}
        <div style={styles.feed}>
          {/* Create Post */}
          <div style={styles.createPost}>
            <textarea
              style={styles.textarea}
              placeholder="Share your trading insights, strategies, or ask questions..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={styles.postButton}>
                <Send size={18} />
                Post
              </button>
              <button
                style={{
                  backgroundColor: 'rgba(71, 85, 105, 0.3)',
                  color: '#94a3b8',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Image size={18} />
                Add Chart
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          {posts.map((post) => (
            <div
              key={post.id}
              style={styles.post}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(147, 51, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(71, 85, 105, 0.5)';
              }}
            >
              <div style={styles.postHeader}>
                <div style={styles.userInfo}>
                  <div style={styles.avatar}>{post.author.avatar}</div>
                  <div>
                    <div style={styles.username}>
                      {post.author.name}
                      {post.author.verified && (
                        <span style={styles.verified}>✓</span>
                      )}
                    </div>
                    <div style={styles.handle}>
                      {post.author.username} • {post.timestamp}
                    </div>
                  </div>
                </div>
                <button style={styles.moreButton}>
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div style={styles.postContent}>
                {post.content}
                {post.hashtags && (
                  <div style={{ marginTop: '0.5rem' }}>
                    {post.hashtags.map((tag, i) => (
                      <span key={i} style={{ ...styles.hashtag, marginRight: '0.5rem' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {post.strategy && (
                <div style={styles.strategyCard}>
                  <div style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TrendingUp size={16} />
                    Strategy: {post.strategy.ticker}
                  </div>
                  <div style={styles.strategyGrid}>
                    <div style={styles.strategyMetric}>
                      <div style={styles.metricLabel}>ROI</div>
                      <div style={{ ...styles.metricValue, color: '#4ade80' }}>
                        +{post.strategy.roi}%
                      </div>
                    </div>
                    <div style={styles.strategyMetric}>
                      <div style={styles.metricLabel}>Win Rate</div>
                      <div style={styles.metricValue}>{post.strategy.winRate}%</div>
                    </div>
                    <div style={styles.strategyMetric}>
                      <div style={styles.metricLabel}>Timeframe</div>
                      <div style={styles.metricValue}>{post.strategy.timeframe}</div>
                    </div>
                  </div>
                </div>
              )}

              {post.chartPreview && (
                <div style={styles.chartPreview}>
                  📈 Chart Preview (Click to view full simulation)
                </div>
              )}

              <div style={styles.postActions}>
                <button
                  style={{
                    ...styles.actionButton,
                    color: likedPosts.includes(post.id) ? '#ef4444' : '#94a3b8'
                  }}
                  onClick={() => handleLike(post.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ef4444';
                  }}
                  onMouseLeave={(e) => {
                    if (!likedPosts.includes(post.id)) {
                      e.currentTarget.style.color = '#94a3b8';
                    }
                  }}
                >
                  <Heart size={18} fill={likedPosts.includes(post.id) ? '#ef4444' : 'none'} />
                  {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                </button>
                <button
                  style={styles.actionButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#94a3b8';
                  }}
                >
                  <MessageCircle size={18} />
                  {post.comments}
                </button>
                <button
                  style={styles.actionButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#10b981';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#94a3b8';
                  }}
                >
                  <Share2 size={18} />
                  {post.shares}
                </button>
                <button
                  style={{ ...styles.actionButton, marginLeft: 'auto' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#eab308';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#94a3b8';
                  }}
                >
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar - Suggested Users */}
        <div style={styles.sidebar}>
          <div style={styles.card}>
            <div style={styles.sidebarTitle}>
              <Users size={20} />
              Suggested Users
            </div>
            {suggestedUsers.map((user, i) => (
              <div
                key={i}
                style={styles.userCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(71, 85, 105, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(147, 51, 234, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem'
                  }}>
                    {user.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {user.followers} followers
                    </div>
                  </div>
                </div>
                <button
                  style={styles.followButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
                  }}
                >
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;