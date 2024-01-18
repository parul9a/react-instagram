import React, { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import useProfileStore from "../store/useProfileStore";

function useGetFeedPost() {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const { posts, setPosts } = usePostStore();
  const { setUserProfile } = useProfileStore();
  useEffect(() => {
    const getFeedPost = async () => {
      setIsLoading(true);
      if (authUser.following.length === 0) {
        setIsLoading(false);
        setPosts([]);
        return;
      }
      const q = query(
        collection(fireStore, "posts"),
        where("createdBy", "in", authUser.following)
      );
      try {
        const querySnapshot = await getDocs(q);
        const feedPosts = [];
        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });
        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(feedPosts);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) getFeedPost();
  }, [authUser, showToast, setPosts, setUserProfile]);
  return { isLoading, posts };
}

export default useGetFeedPost;
