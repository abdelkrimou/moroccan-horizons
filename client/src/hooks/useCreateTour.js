import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTour as createTourAPI } from "../services/tours/CreateTour";

export function useCreateTour() {
  const queryClient = useQueryClient();
  const { mutate: createTour, isPending: isCreating } = useMutation({
    mutationFn: (userId) => createTourAPI(userId),
    onSuccess: async () => {
      await queryClient.refetchQueries(["tours"]);
      toast.success("You have create a new tour Successfully");
    },
    onError: (err) => {
      console.log(err);
      console.log("fail creating");
      toast.error("There was an issue with creating the new tour");
    },
  });
  return [createTour, isCreating];
}
