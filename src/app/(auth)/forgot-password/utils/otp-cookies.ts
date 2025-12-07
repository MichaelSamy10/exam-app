import Cookies from "js-cookie";

export const setOtpCookie = (email: string) => {
  const now = Math.floor(Date.now());
  Cookies.set(`otp_${email}`, now.toString(), { expires: 1 / 1440 });
};

export const getOtpCookie = (email: string) => {
  const value = Cookies.get(`otp_${email}`);
  return value ? Number(value) : null;
};
