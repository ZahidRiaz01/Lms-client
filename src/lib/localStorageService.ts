import Cookies from 'js-cookie';

const TokenService = {
  setToken: (token: string) => {
    Cookies.set('auth_token', token, { expires: 7 }); // Token expires in 7 days
  },
  setUser: (id: string) => {
    Cookies.set('user_id', id);
  },
  // Get the token from cookies
  getToken: (): string | undefined => {
    return Cookies.get('auth_token');
  },
  getUser: (): string | undefined => {
    return Cookies.get('user_id');
  },
  removeToken: () => {
    Cookies.remove('auth_token');
  },
};

export default TokenService;
