import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/payments');
      setPayments(response.data.payments);
      setError('');
    } catch (err) {
      setError('Failed to fetch payments');
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="container">
      <div className="card card-large">
        <h2>Welcome, {user?.fullName}!</h2>
        
        <div className="grid">
          <div className="stat-card">
            <h3>{payments.length}</h3>
            <p>Total Transactions</p>
          </div>
          <div className="stat-card">
            <h3>{payments.filter(p => p.status === 'pending').length}</h3>
            <p>Pending</p>
          </div>
          <div className="stat-card">
            <h3>{payments.filter(p => p.status === 'completed').length}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link to="/payment" className="btn btn-primary" style={{ maxWidth: '300px', display: 'inline-block' }}>
            Make New Payment
          </Link>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Recent Transactions</h3>

          {loading && <div className="loading">Loading payments...</div>}

          {error && <div className="alert alert-error">{error}</div>}

          {!loading && !error && payments.length === 0 && (
            <div className="text-center" style={{ padding: '2rem', color: '#666' }}>
              <p>No transactions yet. Make your first payment to get started!</p>
            </div>
          )}

          {!loading && !error && payments.length > 0 && (
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Payee</th>
                  <th>Amount</th>
                  <th>Provider</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td>{payment.transactionReference}</td>
                    <td>{payment.payeeName}</td>
                    <td>{formatAmount(payment.amount, payment.currency)}</td>
                    <td>{payment.provider}</td>
                    <td>{formatDate(payment.createdAt)}</td>
                    <td>
                      <span className={getStatusBadgeClass(payment.status)}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

