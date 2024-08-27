import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserAPI } from "../services/user/deleteUser";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: (userId) => deleteUserAPI(userId),
    onSuccess: async () => {
      console.log("success deleting");
      toast.success("You have deleted the user Successfully");
      await queryClient.refetchQueries(["users"]);
    },
    onError: (err) => {
      console.log(err);
      console.log("fail deleting");
      toast.error(
        "There was an issue with deleting the user ! try again later"
      );
    },
  });
  return [deleteUser, isDeleting];
}
