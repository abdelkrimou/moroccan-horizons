import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserAPI } from "../services/user/updateUser";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ userId, updatedData }) =>
      updateUserAPI({ userId, updatedData }),
    onSuccess: async () => {
      toast.success("You have updated the user Successfully");
      await queryClient.refetchQueries(["user"]);
    },
    onError: () => {
      console.log("fail Updating ");
      toast.error("There was an issue with updating the user's Data");
    },
  });
  return [updateUser, isUpdating];
}
