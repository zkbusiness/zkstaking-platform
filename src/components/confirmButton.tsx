import React, { useEffect, useState } from "react";
import { Spinner } from "./spinner";
import Button from "./Button";

interface ConfirmButtonTypes {
  showMsg: string;
  text: string;
  isLoading: boolean;
  handleFunc: any;
}
export const ConfirmButton = ({
  showMsg,
  text,
  isLoading,
  handleFunc,
}: ConfirmButtonTypes) => {
  return (
    <Button
      type="primary"
      rounded
      className="py-3 mt-2"
      onClick={() => {
        !isLoading && handleFunc();
      }}
    >
      {isLoading ? (
        <div className="flex  items-center justify-between gap-8 ">
          <Spinner color="#10B981" />

          <div className="">{showMsg}</div>
        </div>
      ) : (
        <>{text}</>
      )}
    </Button>
  );
};
