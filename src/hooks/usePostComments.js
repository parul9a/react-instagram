import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

function usePostComments() {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);
  const handlePostComment = async (postId, comment) => {
    if (isCommenting) return;
    if (!authUser)
      return showToast("Error", "You must be logged in for comment", "error");
    setIsCommenting(true);

    const newComment = {
      comment: comment,
      createdBy: authUser.uid,
      postId: postId,
      createdAt: Date.now(),
    };
    console.log(newComment);
    try {
      // Update Post Doc

      await updateDoc(doc(fireStore, "posts", postId), {
        comments: arrayUnion(newComment),
      });
      addComment(postId, comment);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };

  return { isCommenting, handlePostComment };
}

export default usePostComments;
