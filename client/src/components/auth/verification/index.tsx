"use client";

import { FC, useEffect } from "react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";

import { IoReloadSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

interface indexProps {}

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const VerificationPage: FC<indexProps> = ({}) => {
  const router = useRouter();

  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isLoading, isSuccess, error }] = useActivationMutation();
  const [InvalidError, setInvalidError] = useState<boolean>(false);
  const [limitText, setLimitText] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      router.push("/login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log("An error occured in activation:", error);
      }
    }
  }, [error, isSuccess, router]);

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If the value is longer than 1 character, truncate it to a single character
      value = value[0];
    }

    setInvalidError(false);

    // Update the input field value
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "") {
      // If the value is empty and backspace is pressed, focus on the previous input field
      if (index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    } else if (value.length === 1) {
      // If a single character is entered, focus on the next input field if it's not the last one
      if (index < Object.keys(verifyNumber).length - 1) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">{` Verify your email`}</h2>
      <h6>
        <span className="opacity-75">{`Please enter the 4 digit code sent to your email`}</span>
      </h6>
      <div className=" w-full mt-4 flex items-center justify-center space-x-4">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={` w-[40px] h-[40px] bg-transparent text-[18px] outline-none font-Poppins text-center  rounded-xl shadow-sm flex items-center text-black dark:text-white justify-center ${
              InvalidError
                ? " animate-shake ring-2 ring-red-500"
                : "ring-1 dark:ring-gray-300 ring-gray-400 "
            } `}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Backspace" && e.currentTarget.value === "") {
                e.preventDefault(); // Prevent the default backspace behavior
                handleInputChange(index, ""); // Handle backspace as if a value was cleared
              }
            }}
          />
        ))}
      </div>
      <div className=" cursor-pointer w-full mt-6 text-primary space-x-1 dark:text-white justify-center flex items-center">
        <IoReloadSharp className=" w-5 h-5 " />
        <p className=" text-primary dark:text-white font-Poppins text-sm font-light">
          Resend
        </p>
      </div>
      {isLoading ? (
        <div className=" mt-6 w-full px-[80px] p-3 flex justify-center items-center overflow-hidden box-border">
          <div className=" justify-center flex items-center">
            <div className=" w-2 h-2 rounded-full mr-1.5 bg-primary animate-loading"></div>
            <div
              style={{ animationDelay: "0.1s" }}
              className=" w-2 h-2 rounded-full mr-1.5 bg-primary animate-loading"
            ></div>
            <div
              style={{ animationDelay: "0.2s" }}
              className=" w-2 h-2 rounded-full mr-1.5 bg-primary animate-loading"
            ></div>
          </div>
        </div>
      ) : (
        <div className=" w-full mt-6 flex justify-center">
          <button
            className={` h-[44px] cursor-pointer items-center flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 `}
            onClick={verificationHandler}
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default VerificationPage;
