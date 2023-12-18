import { useState } from "react";

export default function useTags() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagInput = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedInput = tagInput.trim();

      if (trimmedInput && !tags.includes(trimmedInput)) {
        setTags((prevTags) => [...prevTags, trimmedInput]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  return {
    tags,
    setTags,
    tagInput,
    setTagInput,
    handleTagInput,
    removeTag,
  };
}
