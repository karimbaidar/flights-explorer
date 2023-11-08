export default class FilterService {
  static filterFlightsByDate(
    data: any[],
    departureDate: string,
    returnDate: string
  ): any[] {
    if (departureDate && returnDate) {
      const selectedDepartureDate = new Date(departureDate);
      const selectedReturnDate = new Date(returnDate);

      return data.filter((offer) => {
        const offerDate = new Date(offer.departureDate);
        return (
          offerDate >= selectedDepartureDate && offerDate <= selectedReturnDate
        );
      });
    } else {
      return data;
    }
  }
}
