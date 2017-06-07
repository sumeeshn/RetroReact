import jwtDecode from 'jwt-decode';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  // Default initialState
  let initialState = {
    isAuthenticated: false,
    token: null,
    name: null
  };
  if (token) {
    // This is the same result as LOGIN_USER_SUCCESS
    initialState = {
      isAuthenticated: true,
      token: token,
      name: jwtDecode(token).sub
    };
  }

  return initialState;
};

export default isAuthenticated;
