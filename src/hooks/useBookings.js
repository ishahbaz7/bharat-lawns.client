import useAxios from "./useAxios";

const useBookings = () => {
  const api = useAxios();

  const getBookings = () => {
    return api
      .get("/booking")
      .then(({ data }) => {
        return { success: true, bookings: data };
      })
      .catch((error) => {
        return { success: false, error };
      });
  };
  const getBooking = (id) => {
    return api
      .get("/booking/" + id)
      .then(({ data }) => {
        return { success: true, booking: data };
      })
      .catch((error) => {
        console.log(error);
        return { success: false, error };
      });
  };
  const postBooking = (booking) => {
    return api
      .post("booking", booking)
      .then(({ data }) => {
        return { success: true, data };
      })
      .catch((error) => {
        console.log(error);
        return { success: false, error };
      });
  };
  const putBooking = (booking) => {
    return api
      .put("booking/" + booking.id, booking)
      .then(({ data }) => {
        return { success: true, data };
      })
      .catch((error) => {
        console.log(error);
        return { success: false, error };
      });
  };
  const deleteBooking = (id) => {
    return api
      .delete("booking/" + id)
      .then(({ data }) => {
        return { success: true, data };
      })
      .catch((error) => {
        console.log(error);
        return { success: false, error };
      });
  };
  const cancelBooking = (id) => {
    return api
      .put("/booking/cancel-booking/" + id)
      .then((res) => {
        return { success: true, data: res };
      })
      .catch((error) => {
        console.log(error);
        return { success: false, error };
      });
  };
  return {
    getBookings,
    getBooking,
    postBooking,
    putBooking,
    deleteBooking,
    cancelBooking,
  };
};

export default useBookings;
