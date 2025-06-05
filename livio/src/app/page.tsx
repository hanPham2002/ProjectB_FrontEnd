//Login page
// link : authenticate/login
"use client";
import React from "react";
import "antd/dist/reset.css";
import { redirect } from "next/navigation";

// Make the Root page/ Root layout to the  Login  Page with url  "/authenticate/login"  as  a default
export default function Home() {
  redirect("/authenticate/login");
}
