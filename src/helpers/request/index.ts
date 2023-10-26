const url = process.env.NEXT_PUBLIC_URL_API;
const api = `${url}/api/services`;

export const myApis = {
  towns: `${api}/towns`,
  streetLightings: `${api}/streetLighting`,
  securityRates: `${api}/securityRate`,
  panelsDB: `${api}/phvsPanels`,
  inverterDB: `${api}/inverters`,
};

const request = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export default request;
