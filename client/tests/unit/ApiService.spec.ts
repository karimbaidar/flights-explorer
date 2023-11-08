import ApiService from "@/services/ApiService"; // Import your ApiService module
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

describe("ApiService", () => {
  it("fetchAPI should make a GET request and return data", async () => {

    const url = `http://localhost:8081/promotions/priceoffers/ond/FRA/CDG`;
    const mockData = [
      {
        origin: "FRA",
        destination: "CDG",
        departureDate: "2023-02-01",
        returnDate: "2023-02-05",
        seatAvailability: 10,
        price: {
          amount: 145.75,
          currency: "EUR",
        },
        offerType: "BestPrice",
        uuid: "SA00005-6c7d3b14-8e7d-487b-943f-e2389f6a2711",
      },
      {
        origin: "FRA",
        destination: "CDG",
        departureDate: "2023-02-15",
        returnDate: "2023-02-19",
        seatAvailability: 7,
        price: {
          amount: 160.25,
          currency: "EUR",
        },
        offerType: "BestPrice",
        uuid: "SA00007-9e7f2d2b-9e3f-4d8c-9f8f-d9f8e42f4c62",
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
      ok: true,
    });
    const response = await ApiService.fetchAPI(url, "GET");
    expect(response).toEqual(mockData);
  });

  it("fetchAPI should handle errors", async () => {
    const url = `http://localhost:8081/promotions/priceoffers/ond/FRA/CDG`;
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
      ok: false,
      status: 404,
    });

    try {
      await ApiService.fetchAPI(url, "GET");
    } catch (error: any) {
      expect(error.status).toBe(404);
    }
  });

  // Add more test cases for other functions in your ApiService module
});
