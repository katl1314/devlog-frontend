"use client";
// import { useState, useEffect } from "react";
// import { useFormState } from "react-dom";
import { CiSearch } from "react-icons/ci";
import style from "./Search.module.css";

export default function Search() {
  return (
    <div className={style.container}>
      <input type="text" name="search" id="search" className={style.input} />
      <CiSearch size={20} />
    </div>
  );
}
