import getCSRFToken from "../common/getCSRFToken.تس";

export async function fetchApi() {
  const csrf = await getCSRFToken();
}
