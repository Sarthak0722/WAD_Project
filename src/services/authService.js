// Mock user data - will be replaced with actual backend integration later
const MOCK_USERS = [
  {
    email: 'customer@example.com',
    password: 'customer123',
    role: 'customer',
    name: 'Test Customer'
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    name: 'Test Admin'
  }
];

const authService = {
  login: async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      const userData = {
        email: user.email,
        role: user.role,
        name: user.name,
        token: 'mock-jwt-token' // Mock token
      };
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    }
    
    throw { message: 'Invalid email or password' };
  },

  register: async (userData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === userData.email)) {
      throw { message: 'User already exists' };
    }

    // In a real app, we would save this to a database
    const newUser = {
      ...userData,
      role: 'customer'
    };

    const responseData = {
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
      token: 'mock-jwt-token'
    };

    localStorage.setItem('user', JSON.stringify(responseData));
    return responseData;
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  isAuthenticated: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return !!user && !!user.token;
  },

  isAdmin: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role === 'admin';
  },
};

export default authService;