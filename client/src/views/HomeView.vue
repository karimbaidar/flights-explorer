<template>
  <div class="container mx-auto p-4">
    <FormComponent @submit="handleSubmit">
      <template #form-inputs>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mx-auto w-full sm:w-1/2"
        >
          <div class="relative">
            <v-select
              v-model="origin"
              :options="['FRA', 'CDG']"
              class="w-full h-full"
            >
            </v-select>
          </div>

          <div class="relative">
            <v-select
              v-model="destination"
              :options="['FRA', 'CDG']"
              class="w-full h-full"
            ></v-select>
          </div>
        </div>

        <div
          class="grid grid-cols-1 lg:grid-cols-3  gap-4 mb-4 mx-auto w-full sm:w-1/2"
        >
          <div class="relative">
            <FormInput
              v-model="departureDate"
              :type="dateType"
              class="w-full h-full pl-4"
            >
              <template #placeholder class="text-left">
                <div class="text-left">Departure Date</div>
              </template>
            </FormInput>
          </div>

          <div class="relative">
            <FormInput
              v-model="returnDate"
              :type="dateType"
              class="w-full h-full pl-4"
            >
              <template #placeholder>
                <div class="text-start">Return Date</div>
              </template>
            </FormInput>
          </div>
          <div class="flex mx-auto w-full">
            <button
              type="submit"
              class="bg-flight text-white w-full font-bold py-2 px-4 rounded p-2"
            >
              Submit
            </button>
          </div>
        </div>
      </template>
    </FormComponent>

    <div
      class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 mb-4 mx-auto w-full py-8 sm:w-1/2"
    >
      <Sort :sortOptions="sortOptions" @sort-change="sortFlights" />
    </div>

    <div class="max-w-[2xl] mx-auto">
      <div
        v-if="isLoading"
        class="flex justify-center items-start min-h-screen"
      >
        <div
          class="animate-spin w-10 h-10 border-t-4 border-blue-500 border-solid rounded-full"
        ></div>
      </div>

      <div
        v-if="
          !isLoading &&
          departureFlights.length === 0 &&
          returnFlights.length === 0
        "
        class="text-center"
      >
        No flights available.
      </div>
      <h1
        text-left
        v-if="departureFlights.length > 0"
        class="text-left font-bold text-lg px-4"
      >
        Choose Departure Flights
      </h1>
      <List :items="departureFlights" v-if="departureFlights.length > 0" />
      <h1
        v-if="returnFlights.length > 0"
        class="text-left font-bold text-lg px-4"
      >
        Choose Return Flights
      </h1>
      <List :items="returnFlights" v-if="returnFlights.length > 0" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FormComponent from "@/components/Form.vue";
import FormInput from "@/components/FormInput.vue";
import ApiService from "@/services/ApiService";
import List from "@/components/List.vue";
import Sort from "@/components/Sort.vue";
import vSelect from "vue-select";
import { formatDateToYYYYMMDD } from "@/services/utilities/DateUtils";

export default defineComponent({
  components: {
    FormComponent,
    FormInput,
    List,
    Sort,
    vSelect,
  },
  setup() {
    const origin = ref<string>("");
    const destination = ref("");
    const departureDate = ref("");
    const returnDate = ref("");
    const departureFlights = ref([]);
    const returnFlights = ref([]);
    const dateType = ref("date");
    const isLoading = ref(false);

    const sortOptions = [
      { value: "Departure", text: "Departure Date" },
      { value: "Price", text: "Price" },
    ];

    const customComparators: any = {
      Departure: (a: any, b: any) =>
        new Date(a).getTime() - new Date(b).getTime(),
      Price: (a: any, b: any) =>
        parseFloat(a.split(" ")[0]) - parseFloat(b.split(" ")[0]),
    };

    const sortFlights = ({
      sortOption,
      isAscending,
    }: {
      sortOption: string;
      isAscending: boolean;
    }) => {
      const comparator = customComparators[sortOption] || ((a, b) => a - b);

      const sorter = (a: any, b: any) => {
        const comparison = comparator(a[sortOption], b[sortOption]);
        return isAscending ? comparison : -comparison;
      };

      departureFlights.value.sort(sorter);
      returnFlights.value.sort(sorter);
    };

    const fetchAndFilterFlights = async (
      origin,
      destination,
      departureDate,
      returnDate
    ) => {
      const url = `http://localhost:8081/promotions/priceoffers/ond/${origin}/${destination}`;
      const method = "GET";
      let data = await ApiService.fetchAPI(url, method);

      if (departureDate.value && returnDate.value) {
        const selectedDepartureDate = formatDateToYYYYMMDD(departureDate.value);
        const selectedReturnDate = formatDateToYYYYMMDD(returnDate.value);

        data = data.filter((offer) => {
          const offerDate = formatDateToYYYYMMDD(offer.departureDate);
          return (
            offerDate >= selectedDepartureDate &&
            offerDate <= selectedReturnDate
          );
        });
      }

      const formattedData = data.map((offer) => {
        return {
          Origin: offer.origin,
          Destination: offer.destination,
          Departure: offer.departureDate,
          Return: offer.returnDate,
          Seats: offer.seatAvailability,
          Price: `${offer.price.amount} ${offer.price.currency}`,
        };
      });

      return formattedData;
    };

    const handleSubmit = async (): Promise<void> => {
      try {
        isLoading.value = true;
        departureFlights.value = await fetchAndFilterFlights(
          origin.value,
          destination.value,
          departureDate,
          returnDate
        );
        returnFlights.value = await fetchAndFilterFlights(
          destination.value,
          origin.value,
          departureDate,
          returnDate
        );
        departureFlights.value.forEach((flight) => delete flight.Return);
        returnFlights.value.forEach((flight) => delete flight.Departure);
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      origin,
      destination,
      departureDate,
      returnDate,
      departureFlights,
      returnFlights,
      handleSubmit,
      sortOptions,
      sortFlights,
      dateType,
      isLoading,
    };
  },
});
</script>
