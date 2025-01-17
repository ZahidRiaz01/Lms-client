import Cookies from 'js-cookie';

const TokenService = {
  setToken: (token: string) => {
    Cookies.set('auth_token', token, { expires: 7 }); // Token expires in 7 days
  },

  // Get the token from cookies
  getToken: (): string | undefined => {
    return Cookies.get('auth_token');
  },

  removeToken: () => {
    Cookies.remove('auth_token');
  },
};

export default TokenService;
