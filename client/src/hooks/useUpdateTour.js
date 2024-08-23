import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTour as updateTourAPI } from "../services/tours/UpdateTour";

export function useUpdateTour() {
  const queryClient = useQueryClient();
  const { mutate: updateTour, isPending: isUpdating } = useMutation({
    mutationFn: ({ tourId, updatedData }) =>
      updateTourAPI({ tourId, updatedData }),
    onSuccess: async () => {
      await queryClient.refetchQueries(["user"]);

      toast.success("You have updated the Tour Successfully");
    },
    onError: () => {
      console.log("fail updating");
      toast.error("There was an issue with updating the Tour's data");
    },
  });
  return [updateTour, isUpdating];
}
