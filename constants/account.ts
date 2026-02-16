export type AccountProfile = {
  fullName: string;
  email: string;
  phone?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  dateOfBirth?: string; // e.g. '1998-06-12'
  nationality?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  idType?: string;
  idNumber?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
};

// NOTE: App currently has stubbed auth (no API / no persistence). This is the single
// source of truth for "My Account" details until backend/auth state is implemented.
export const accountProfile: AccountProfile = {
  fullName: 'Ranjan Rawat',
  email: 'ranjanrawat@gmail.com',
  phone: '+91 98765 43210',
  gender: 'Male',
  dateOfBirth: '1999-01-12',
  nationality: 'Indian',
  addressLine1: '123, Example Street',
  addressLine2: 'Near City Mall',
  city: 'Delhi',
  state: 'Delhi',
  postalCode: '110001',
  country: 'India',
  idType: 'Aadhaar',
  idNumber: 'XXXX-XXXX-1234',
  emergencyContactName: 'Family Contact',
  emergencyContactPhone: '+91 90000 00000',
};


