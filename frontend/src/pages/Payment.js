import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { validate } from '../utils/validation';

const Payment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    provider: 'SWIFT',
    payeeAccountNumber: '',
    payeeName: '',
    swiftCode: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'ZAR', 'JPY', 'AUD', 'CAD', 'CHF'];
  const providers = ['SWIFT', 'SEPA', 'ACH', 'WIRE'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
    if (success) {
      setSuccess('');
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (validate[name]) {
      const error = validate[name](value);
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(key => {
      if (key !== 'notes' && validate[key]) {
        const error = validate[key](formData[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    // Validate optional notes field
    if (formData.notes) {
      const notesError = validate.notes(formData.notes);
      if (notesError) {
        newErrors.notes = notesError;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/payments', formData);
      setSuccess(`Payment created successfully! Reference: ${response.data.payment.transactionReference}`);
      
      // Reset form
      setFormData({
        amount: '',
        currency: 'USD',
        provider: 'SWIFT',
        payeeAccountNumber: '',
        payeeName: '',
        swiftCode: '',
        notes: ''
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to create payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card card-large">
        <h2>International Payment</h2>
        <p className="text-center" style={{ marginBottom: '1.5rem', color: '#666' }}>
          Enter payment details securely
        </p>

        {serverError && (
          <div className="alert alert-error">{serverError}</div>
        )}

        {success && (
          <div className="alert alert-success">{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="1000.00"
                disabled={loading}
              />
              {errors.amount && <div className="error">{errors.amount}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                disabled={loading}
              >
                {currencies.map(curr => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
              {errors.currency && <div className="error">{errors.currency}</div>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="provider">Payment Provider</label>
            <select
              id="provider"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              disabled={loading}
            >
              {providers.map(prov => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
            {errors.provider && <div className="error">{errors.provider}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="payeeName">Payee Name</label>
            <input
              type="text"
              id="payeeName"
              name="payeeName"
              value={formData.payeeName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="John Smith"
              disabled={loading}
            />
            {errors.payeeName && <div className="error">{errors.payeeName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="payeeAccountNumber">Payee Account Number (IBAN or Account)</label>
            <input
              type="text"
              id="payeeAccountNumber"
              name="payeeAccountNumber"
              value={formData.payeeAccountNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="GB29NWBK60161331926819"
              maxLength="34"
              disabled={loading}
              style={{ textTransform: 'uppercase' }}
            />
            {errors.payeeAccountNumber && <div className="error">{errors.payeeAccountNumber}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="swiftCode">SWIFT/BIC Code</label>
            <input
              type="text"
              id="swiftCode"
              name="swiftCode"
              value={formData.swiftCode}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="NWBKGB2L"
              maxLength="11"
              disabled={loading}
              style={{ textTransform: 'uppercase' }}
            />
            {errors.swiftCode && <div className="error">{errors.swiftCode}</div>}
            <small style={{ color: '#666', fontSize: '0.75rem' }}>
              8 or 11 character SWIFT code (e.g., NWBKGB2L or NWBKGB2LXXX)
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Payment reference or additional notes..."
              maxLength="500"
              disabled={loading}
            />
            {errors.notes && <div className="error">{errors.notes}</div>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/dashboard')}
            disabled={loading}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;

