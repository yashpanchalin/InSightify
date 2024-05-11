"use client";
import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const InputFieldPage = () => {
  const [videoUrl, setVideoURL] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/generatedText", {
        videoUrl,
      });
      setGeneratedText(response.data.generatedText);
    } catch (error) {
      console.error("Error generating text:", error);
    }
  };

  return (
    <>
      <div className="flex items-center mt-6 ">
        <div className="flex w-full max-s-sm items-center space-x-2">
          <Input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoURL(e.target.value)}
            placeholder=" Enter your Youtube URL"
          />
          <Button type="submit" onClick={handleSubmit}>
            Generate Text
          </Button>
          <br />

          <div>{generatedText}</div>
        </div>
      </div>
    </>
  );
};

export default InputFieldPage;
