// Client-side validation patterns - Input Whitelisting with RegEx

export const patterns = {
  fullName: /^[a-zA-Z\s'-]+$/,
  idNumber: /^[0-9]{13}$/,
  accountNumber: /^[0-9]{10,16}$/,
  username: /^[a-z0-9_]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  amount: /^\d+(\.\d{1,2})?$/,
  currency: /^[A-Z]{3}$/,
  payeeAccountNumber: /^[A-Z0-9]{8,34}$/,
  payeeName: /^[a-zA-Z\s'-]+$/,
  swiftCode: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
  notes: /^[a-zA-Z0-9\s.,!?'-]*$/
};

export const validate = {
  fullName: (value) => {
    if (!value) return 'Full name is required';
    if (value.length < 2 || value.length > 100) {
      return 'Full name must be between 2 and 100 characters';
    }
    if (!patterns.fullName.test(value)) {
      return 'Full name can only contain letters, spaces, hyphens, and apostrophes';
    }
    return '';
  },

  idNumber: (value) => {
    if (!value) return 'ID number is required';
    if (!patterns.idNumber.test(value)) {
      return 'ID number must be exactly 13 digits';
    }
    return '';
  },

  accountNumber: (value) => {
    if (!value) return 'Account number is required';
    if (!patterns.accountNumber.test(value)) {
      return 'Account number must be between 10 and 16 digits';
    }
    return '';
  },

  username: (value) => {
    if (!value) return 'Username is required';
    if (value.length < 3 || value.length > 30) {
      return 'Username must be between 3 and 30 characters';
    }
    if (!patterns.username.test(value.toLowerCase())) {
      return 'Username can only contain lowercase letters, numbers, and underscores';
    }
    return '';
  },

  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!patterns.password.test(value)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
    return '';
  },

  amount: (value) => {
    if (!value) return 'Amount is required';
    if (!patterns.amount.test(value)) {
      return 'Amount must be a valid number with up to 2 decimal places';
    }
    const numValue = parseFloat(value);
    if (numValue < 0.01 || numValue > 1000000) {
      return 'Amount must be between 0.01 and 1,000,000';
    }
    return '';
  },

  currency: (value) => {
    if (!value) return 'Currency is required';
    const validCurrencies = ['USD', 'EUR', 'GBP', 'ZAR', 'JPY', 'AUD', 'CAD', 'CHF'];
    if (!validCurrencies.includes(value)) {
      return 'Invalid currency';
    }
    return '';
  },

  payeeAccountNumber: (value) => {
    if (!value) return 'Payee account number is required';
    if (!patterns.payeeAccountNumber.test(value.toUpperCase())) {
      return 'Payee account number must be alphanumeric and between 8-34 characters';
    }
    return '';
  },

  payeeName: (value) => {
    if (!value) return 'Payee name is required';
    if (value.length < 2 || value.length > 100) {
      return 'Payee name must be between 2 and 100 characters';
    }
    if (!patterns.payeeName.test(value)) {
      return 'Payee name can only contain letters, spaces, hyphens, and apostrophes';
    }
    return '';
  },

  swiftCode: (value) => {
    if (!value) return 'SWIFT code is required';
    if (!patterns.swiftCode.test(value.toUpperCase())) {
      return 'Invalid SWIFT/BIC code format (8 or 11 characters)';
    }
    return '';
  },

  notes: (value) => {
    if (value && value.length > 500) {
      return 'Notes cannot exceed 500 characters';
    }
    if (value && !patterns.notes.test(value)) {
      return 'Notes contain invalid characters';
    }
    return '';
  }
};

