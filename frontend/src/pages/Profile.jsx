const Profile = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #7e22ce 50%, #1e293b 100%)',
      color: 'white',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    content: {
      maxWidth: '900px',
      margin: '0 auto'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      background: 'linear-gradient(to right, #c084fc, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    profileCard: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(12px)',
      borderRadius: '1rem',
      padding: '2rem',
      border: '1px solid rgba(71, 85, 105, 0.5)',
      marginBottom: '1.5rem'
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1.5rem'
    },
    avatar: {
      width: '96px',
      height: '96px',
      background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
      borderRadius: '50%'
    },
    profileInfo: {
      flex: 1
    },
    name: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    handle: {
      color: '#94a3b8',
      marginBottom: '1rem'
    },
    bio: {
      color: '#cbd5e1'
    },
    editButton: {
      backgroundColor: 'rgba(71, 85, 105, 0.5)',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background-color 0.2s'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    statCard: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(12px)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid rgba(71, 85, 105, 0.5)',
      textAlign: 'center'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '0.25rem'
    },
    statLabel: {
      color: '#94a3b8',
      fontSize: '0.875rem'
    },
    strategiesCard: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(12px)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid rgba(71, 85, 105, 0.5)'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1rem'
    },
    emptyText: {
      color: '#94a3b8'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Profile</h1>
        
        {/* Profile Header */}
        <div style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <div style={styles.avatar}></div>
            <div style={styles.profileInfo}>
              <h2 style={styles.name}>Your Name</h2>
              <p style={styles.handle}>@username</p>
              <p style={styles.bio}>
                Trading enthusiast | Strategy builder | Data lover
              </p>
            </div>
            <button 
              style={styles.editButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(71, 85, 105, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(71, 85, 105, 0.5)';
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <p style={{...styles.statValue, color: '#3b82f6'}}>24</p>
            <p style={styles.statLabel}>Strategies</p>
          </div>
          <div style={styles.statCard}>
            <p style={{...styles.statValue, color: '#9333ea'}}>156</p>
            <p style={styles.statLabel}>Simulations</p>
          </div>
          <div style={styles.statCard}>
            <p style={{...styles.statValue, color: '#4ade80'}}>89</p>
            <p style={styles.statLabel}>Followers</p>
          </div>
        </div>

        {/* Your Strategies */}
        <div style={styles.strategiesCard}>
          <h3 style={styles.sectionTitle}>Your Strategies</h3>
          <p style={styles.emptyText}>No strategies yet. Create your first one!</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;