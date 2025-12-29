const BaseUrl = import.meta.env.VITE_SERVER_API;
const api = {
  Auth: {
    register: `${BaseUrl}/api/auth/register`,
    verifyEmail: `${BaseUrl}/api/auth/verify-email`,
    requestLoginOTP: `${BaseUrl}/api/auth/login/request-otp`,
    verifyLoginOTP: `${BaseUrl}/api/auth/login/verify-otp`,
    loginWithPassword: `${BaseUrl}/api/auth/login/password`,
    forgotPassword: `${BaseUrl}/api/auth/forgot-password`,
    resetPassword: `${BaseUrl}/api/auth/reset-password`,
    changePassword: `${BaseUrl}/api/auth/change-password`,
    userProfile: `${BaseUrl}/api/auth/profile`
  }
};

export default api;
