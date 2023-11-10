import { URL } from "../URL";

const Fetch = async (
  method = "GET",
  url = "",
  data = undefined,
  contentType = "application/json"
) => {
  const user = JSON.parse(localStorage.getItem("user"));

  let header = { "Content-Type": contentType };
  if (
    user.authorization &&
    user.authorization.token &&
    user.authorization.token != ""
  ) {
    header={...header,authorization:user.authorization.token}
  }
  console.log({header})
  const response = await fetch(URL + url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: header,
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  try {
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export default Fetch;
