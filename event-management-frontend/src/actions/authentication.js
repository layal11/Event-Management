import Fetch from "./fetch";

export const Login = async (payload = {}) => {
  const reponse = await Fetch("POST", "user/login", payload);
  console.log(reponse);
  return reponse;
};
