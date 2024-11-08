"use client";

import { useState, useEffect } from "react";
import Footer from "@/app/component/Footer.js";

export default function Scoreboard() {
  const [formData, setFormData] = useState({
    category: "",
    fieldTakami: "",
    ageBracket: "",
    ageDirection: "",
    rank: "",
    ks: "",
    gender: "",
    match: "",
    participants1: "",
    participants2: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    fieldTakami: false,
    ks: false,
    gender: false,
  });

  const [messages, setMessages] = useState({
    errorMessage: "",
    successMessage: "",
  });

  const [socialMediaName, setSocialMediaName] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("sessionId");

    if (sessionId) {
      const savedScores = localStorage.getItem(`scores-${sessionId}`);
      if (savedScores) {
        setFormData({ ...formData, ...JSON.parse(savedScores) });
      }
    }
  }, []);

  const saveScores = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("sessionId");

    if (sessionId) {
      try {
        const response = await fetch("http://localhost:5000/api/save-scores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            formData,
          }),
        });

        const data = await response.json();
        if (data.message === "Scores saved successfully!") {
          setMessages({
            ...messages,
            successMessage: "Setup updated successfully!",
          });
          setTimeout(
            () => setMessages({ ...messages, successMessage: "" }),
            3000
          );
        }
      } catch (error) {
        setMessages({
          ...messages,
          errorMessage: "Error saving data to the server.",
        });
      }
    }
  };

  const validateFields = () => {
    const newFieldErrors = {
      fieldTakami: !formData.fieldTakami,
      ks: !formData.ks,
      gender: !formData.gender,
    };

    setFieldErrors(newFieldErrors);
    return !Object.values(newFieldErrors).includes(true);
  };

  const handleViewScores = () => {
    if (!validateFields()) {
      setMessages({
        ...messages,
        errorMessage: "Please fill out all required fields before viewing.",
      });
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("sessionId");
    const scoresURL = new URL("/scoreboard/scores", window.location.origin);
    scoresURL.search = new URLSearchParams({
      ...formData,
      sessionId,
    }).toString();

    window.open(scoresURL, "_blank");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFieldTakamiChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && (value === "" || parseInt(value, 10) <= 10)) {
      setFormData((prevState) => ({ ...prevState, fieldTakami: value }));
    }
  };

  const handleCopyLink = () => {
    if (!validateFields()) {
      setMessages({
        ...messages,
        errorMessage:
          "Please fill out all required fields before copying the link.",
      });
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("sessionId");
    const scoresURL = new URL("/scoreboard/scores", window.location.origin);
    scoresURL.search = new URLSearchParams({
      ...formData,
      sessionId,
    }).toString();

    navigator.clipboard
      .writeText(scoresURL.toString())
      .then(() => {
        setMessages({
          ...messages,
          successMessage: "Link copied to clipboard!",
        });
        setTimeout(
          () => setMessages({ ...messages, successMessage: "" }),
          3000
        );
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const handleGenerateSocialMediaName = () => {
    const generatedName = Object.values(formData).filter(Boolean).join(" - ");
    setSocialMediaName(generatedName);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="container mx-auto flex flex-col justify-center items-center p-5">
        {messages.errorMessage && (
          <div className="text-red-500 mb-4">{messages.errorMessage}</div>
        )}
        {messages.successMessage && (
          <div className="text-green-500 mb-4">{messages.successMessage}</div>
        )}

        <div className="flex w-full gap-10 bg-green-400 p-5 rounded-lg">
          {[
            {
              label: "Tatami",
              name: "fieldTakami",
              type: "text",
              placeholder: "Enter number",
              maxLength: 2,
              handleChange: handleFieldTakamiChange,
              isError: fieldErrors.fieldTakami,
            },
            {
              label: "Gender",
              name: "gender",
              type: "select",
              options: ["Boys", "Girls", "Open"],
              placeholder: "Select Gender",
              isError: fieldErrors.gender,
            },
            {
              label: "KS",
              name: "ks",
              type: "select",
              options: ["Kata", "Team Kata", "Kumite"],
              placeholder: "Select KS",
              isError: fieldErrors.ks,
            },
          ].map(({ label, ...props }) => (
            <div key={label} className="mb-6 w-full max-w-md">
              <div className="text-xl font-semibold mb-2 text-center">
                {label}
              </div>
              {props.type === "select" ? (
                <select
                  {...props}
                  value={formData[props.name]}
                  onChange={handleChange}
                  className={`border rounded-md p-2 w-full ${
                    props.isError ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="" disabled>
                    {props.placeholder}
                  </option>
                  {props.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...props}
                  value={formData[props.name]}
                  onChange={props.handleChange}
                  className={`border rounded-md p-2 w-full ${
                    props.isError ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="p-10 text-2xl font-bold">Optional Field</div>
        <div className="flex mx-auto w-full gap-5 bg-slate-500 p-5 rounded-lg">
          {[
            {
              label: "Match",
              name: "match",
              type: "text",
              placeholder: "Enter match number",
            },
            {
              label: "Playoffs",
              name: "category",
              type: "select",
              options: ["Group Stage", "Semi-Finals", "Championship"],
              placeholder: "Select Category",
            },
            {
              label: "Age Bracket",
              name: "ageBracket",
              type: "text",
              placeholder: "Enter age bracket (e.g., 8-9)",
            },
            {
              label: "Age Direction",
              name: "ageDirection",
              type: "select",
              options: ["Above", "Below"],
              placeholder: "Select Age Direction",
            },
            {
              label: "Rank",
              name: "rank",
              type: "select",
              options: [
                "Newbie",
                "Novice",
                "Intermediate",
                "Advance",
                "Junior",
                "Senior",
                "Open",
              ],
              placeholder: "Select Rank",
            },
            {
              label: "Participants 1",
              name: "participants1",
              type: "text",
              placeholder: "Enter Participants 1",
            },
            {
              label: "Participants 2",
              name: "participants2",
              type: "text",
              placeholder: "Enter Participants 2",
            },
          ].map(({ label, ...props }) => (
            <div key={label} className="mb-6 w-full max-w-md">
              <div className="text-xl font-semibold mb-2 text-center">
                {label}
              </div>
              {props.type === "select" ? (
                <select
                  {...props}
                  value={formData[props.name]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="" disabled>
                    {props.placeholder}
                  </option>
                  {props.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...props}
                  value={formData[props.name]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={saveScores}
          className="mt-6 bg-sky-500 text-white rounded-md p-2 hover:bg-sky-600 w-full max-w-md"
        >
          Upload/Update Setup
        </button>

        <button
          onClick={handleGenerateSocialMediaName}
          className="mt-6 bg-yellow-500 text-white rounded-md p-2 hover:bg-yellow-600 w-full max-w-md"
        >
          Generate Social Media Name
        </button>

        <div className="mb-6 w-full max-w-md">
          <div className="text-xl font-semibold mb-2 text-center p-5">
            Social Media Name
          </div>
          <input
            type="text"
            value={socialMediaName}
            className="border border-gray-300 rounded-md p-2 w-full bg-gray-100 cursor-default"
            readOnly
          />
        </div>

        <div className="flex justify-between w-full max-w-md">
          <button
            onClick={handleViewScores}
            className="mt-6 bg-green-500 text-white rounded-md p-2 hover:bg-green-600 w-full mr-2"
          >
            View Setup
          </button>
          <button
            onClick={handleCopyLink}
            className="mt-6 bg-indigo-500 text-white rounded-md p-2 hover:bg-indigo-600 w-full ml-2"
          >
            Copy Link
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
