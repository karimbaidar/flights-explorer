export default class ApiService {
  static async fetchAPI(
    url: string,
    method: string,
    params: Record<string, any> | null = null
  ) {
    const headers: Record<string, string> = {
      "Content-type": "application/json",
    };

    //Authorization could be done via JWT -> bearer tokens.

    const options: RequestInit = {
      method,
      headers,
      body: params ? JSON.stringify(params) : undefined,
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        return await response.json();
      } else {
        let msg = null;
        try {
          msg = await response.json();
        } catch (err) {
          console.error(err);
        }
        throw { status: response.status, msg };
      }
    } catch (error) {
      console.error("Error calling the API:", error);
      throw error;
    }
  }
}
