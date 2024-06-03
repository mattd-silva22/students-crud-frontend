"use client";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export function useApp() {
  return useContext(AppContext);
}
