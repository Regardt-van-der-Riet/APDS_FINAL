import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [expandedPayment, setExpandedPayment] = useState(null);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    navigate('/login');
  }, [navigate]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const [paymentsRes, statsRes] = await Promise.all([
        api.get(`/admin/payments?status=${filter}`, config),
        api.get('/admin/stats', config)
      ]);

      setPayments(paymentsRes.data.payments);
      setStats(statsRes.data.stats);
      setError('');
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error:', err);
      
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [filter, handleLogout]);

  useEffect(() => {
    const adminData = localStorage.getItem('admin');
    const token = localStorage.getItem('adminToken');
    
    if (!adminData || !token) {
      navigate('/login');
      return;
    }
    
    setAdmin(JSON.parse(adminData));
    fetchData();
  }, [filter, navigate, fetchData]);

  const handleVerify = async (paymentId) => {
    if (!window.confirm('Are you sure you want to verify this payment?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      await api.patch(
        `/admin/payments/${paymentId}/verify`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSuccess('✓ Payment verified successfully!');
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to verify payment');
      console.error('Error:', err);
    }
  };

  const handleReject = async (paymentId) => {
    const reason = prompt('Enter rejection reason (optional):');
    if (reason === null) return; // User cancelled
    
    try {
      const token = localStorage.getItem('adminToken');
      await api.patch(
        `/admin/payments/${paymentId}/reject`,
        { reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSuccess('✗ Payment rejected!');
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to reject payment');
      console.error('Error:', err);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-badge status-pending';
      case 'verified':
        return 'status-badge status-verified';
      case 'completed':
        return 'status-badge status-completed';
      case 'failed':
        return 'status-badge status-failed';
      default:
        return 'status-badge';
    }
  };

  return (
    <div className="container">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#333' }}>🛡️ Admin Dashboard</h2>
            <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.95rem' }}>
              Welcome, <strong>{admin?.fullName}</strong> ({admin?.role})
            </p>
          </div>
          <button 
            onClick={handleLogout} 
            style={{
              padding: '0.6rem 1.5rem',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(255, 65, 108, 0.3)'
            }}>
              <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.totalPayments}</h3>
              <p style={{ margin: '0.5rem 0 0 0', opacity: 0.95, fontSize: '0.95rem' }}>Total Payments</p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)'
            }}>
              <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.pendingPayments}</h3>
              <p style={{ margin: '0.5rem 0 0 0', opacity: 0.95, fontSize: '0.95rem' }}>Pending Review</p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)'
            }}>
              <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.verifiedPayments}</h3>
              <p style={{ margin: '0.5rem 0 0 0', opacity: 0.95, fontSize: '0.95rem' }}>Verified</p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(67, 233, 123, 0.3)'
            }}>
              <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>${stats.totalAmount?.toFixed(2)}</h3>
              <p style={{ margin: '0.5rem 0 0 0', opacity: 0.95, fontSize: '0.95rem' }}>Total Processed</p>
            </div>
          </div>
        )}

        {/* Alerts */}
        {success && (
          <div style={{
            background: '#d1fae5',
            color: '#065f46',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            border: '1px solid #6ee7b7',
            fontWeight: '600'
          }}>
            {success}
          </div>
        )}
        
        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#991b1b',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            border: '1px solid #fca5a5',
            fontWeight: '600'
          }}>
            {error}
          </div>
        )}

        {/* Payments Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem', color: '#333' }}>Payment Verification</h3>
          
          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {['pending', 'verified', 'failed', 'all'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: filter === status ? 'none' : '2px solid #e0e0e0',
                  background: filter === status 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : 'white',
                  color: filter === status ? 'white' : '#666',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s',
                  boxShadow: filter === status ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (filter !== status) {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.color = '#667eea';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== status) {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.color = '#666';
                  }
                }}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#667eea', fontSize: '1.1rem' }}>
              Loading payments...
            </div>
          )}

          {/* No Payments */}
          {!loading && payments.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
              <p style={{ fontSize: '1.1rem' }}>No {filter} payments found.</p>
            </div>
          )}

          {/* Payment Cards */}
          {!loading && payments.length > 0 && (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {payments.map((payment) => (
                <div 
                  key={payment._id}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedPayment === payment._id}
                  style={{
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    background: expandedPayment === payment._id ? '#f7fafc' : 'white'
                  }}
                  onClick={() => setExpandedPayment(expandedPayment === payment._id ? null : payment._id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setExpandedPayment(expandedPayment === payment._id ? null : payment._id);
                    }
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <span style={{ 
                          fontFamily: 'monospace', 
                          fontSize: '1.1rem', 
                          fontWeight: 'bold',
                          color: '#667eea'
                        }}>
                          {payment.transactionReference}
                        </span>
                        <span className={getStatusBadgeClass(payment.status)}>
                          {payment.status}
                        </span>
                      </div>
                      <div style={{ color: '#666', fontSize: '0.9rem' }}>
                        {formatDate(payment.createdAt)}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#333' }}>
                        {formatAmount(payment.amount, payment.currency)}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#999' }}>
                        {payment.provider}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '1rem',
                    padding: '1rem 0',
                    borderTop: '1px solid #e0e0e0',
                    borderBottom: '1px solid #e0e0e0'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '0.25rem' }}>User</div>
                      <div style={{ fontWeight: '600', color: '#333' }}>{payment.userId?.fullName}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>{payment.userId?.username}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '0.25rem' }}>Payee</div>
                      <div style={{ fontWeight: '600', color: '#333' }}>{payment.payeeName}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666', fontFamily: 'monospace' }}>
                        {payment.payeeAccountNumber}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '0.25rem' }}>SWIFT Code</div>
                      <div style={{ fontWeight: '600', color: '#333', fontFamily: 'monospace' }}>
                        {payment.swiftCode}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedPayment === payment._id && payment.notes && (
                    <div style={{ marginTop: '1rem', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
                      <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '0.5rem' }}>Notes</div>
                      <div style={{ color: '#666' }}>{payment.notes}</div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {payment.status === 'pending' && (
                    <div style={{ 
                      display: 'flex', 
                      gap: '1rem', 
                      marginTop: '1.5rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #e0e0e0'
                    }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVerify(payment._id);
                        }}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: '600',
                          transition: 'transform 0.2s',
                          boxShadow: '0 4px 12px rgba(67, 233, 123, 0.3)'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        ✓ Verify Payment
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(payment._id);
                        }}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: '600',
                          transition: 'transform 0.2s',
                          boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        ✗ Reject Payment
                      </button>
                    </div>
                  )}

                  {payment.status !== 'pending' && (
                    <div style={{ 
                      marginTop: '1rem', 
                      paddingTop: '1rem',
                      borderTop: '1px solid #e0e0e0',
                      textAlign: 'center',
                      color: '#999',
                      fontSize: '0.9rem'
                    }}>
                      Payment already processed
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
