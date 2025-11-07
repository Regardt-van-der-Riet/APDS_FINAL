import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validate } from '../utils/validation';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [loginType, setLoginType] = useState('user'); // 'user' or 'admin'
  const [formData, setFormData] = useState({
    username: '',
    accountNumber: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTabChange = (type) => {
    setLoginType(type);
    setFormData({ username: '', accountNumber: '', password: '' });
    setErrors({});
    setServerError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name !== 'password' && loginType === 'user') {
      const error = validate[name] ? validate[name](value) : null;
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (loginType === 'user') {
      const error = validate.username(formData.username);
      if (error) newErrors.username = error;
    }

    if (loginType === 'user') {
      if (!formData.accountNumber) {
        newErrors.accountNumber = 'Account number is required';
      } else {
        const error = validate.accountNumber(formData.accountNumber);
        if (error) newErrors.accountNumber = error;
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (loginType === 'admin') {
        // Admin login
        const response = await api.post('/admin/login', {
          username: formData.username,
          password: formData.password
        });
        
        if (response.data.status === 'success') {
          localStorage.setItem('adminToken', response.data.token);
          localStorage.setItem('admin', JSON.stringify(response.data.admin));
          navigate('/admin/dashboard');
        }
      } else {
        // User login
        const result = await login(formData);
        
        if (result.success) {
          navigate('/dashboard');
        } else {
          setServerError(result.message);
        }
      }
    } catch (error) {
      setServerError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>🔒 APDS Banking</h2>
        <p className="text-center" style={{ marginBottom: '1.5rem', color: '#666' }}>
          Secure Banking Portal
        </p>

        {/* Login Type Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem',
          borderBottom: '2px solid #e0e0e0'
        }}>
          <button
            type="button"
            onClick={() => handleTabChange('user')}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              background: 'transparent',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              color: loginType === 'user' ? '#667eea' : '#999',
              borderBottom: loginType === 'user' ? '3px solid #667eea' : '3px solid transparent',
              transition: 'all 0.3s',
              marginBottom: '-2px'
            }}
          >
            👤 User Login
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('admin')}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              background: 'transparent',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              color: loginType === 'admin' ? '#667eea' : '#999',
              borderBottom: loginType === 'admin' ? '3px solid #667eea' : '3px solid transparent',
              transition: 'all 0.3s',
              marginBottom: '-2px'
            }}
          >
            🛡️ Admin Login
          </button>
        </div>

        {serverError && (
          <div className="alert alert-error">{serverError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={loginType === 'admin' ? 'admin' : 'johndoe'}
              disabled={loading}
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>

          {loginType === 'user' && (
            <div className="form-group">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="1234567890"
                maxLength="16"
                disabled={loading}
              />
              {errors.accountNumber && <div className="error">{errors.accountNumber}</div>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : `Login as ${loginType === 'admin' ? 'Admin' : 'User'}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
