import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTourById } from "../services/tours/DeleteTourById";

export function useDeleteTour() {
  const queryClient = useQueryClient();
  const { mutate: deleteTour, isPending: isDeleting } = useMutation({
    mutationFn: (tourId) => deleteTourById(tourId),
    onSuccess: async () => {
      console.log("success deleting");
      await queryClient.refetchQueries(["tours"]);
      toast.success("You have deleted the Tour Successfully");
    },
    onError: (err) => {
      console.log(err);
      console.log("fail deleting");
      toast.error("There was an issue with deleting the Tour");
    },
  });
  return [deleteTour, isDeleting];
}
