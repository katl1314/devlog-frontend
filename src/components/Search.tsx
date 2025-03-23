'use client';
// import { useState, useEffect } from "react";
// import { useFormState } from "react-dom";
import { CiSearch } from 'react-icons/ci';

export default function Search() {
	return (
		<div className="flex items-center max-w-[500px] justify-between p-[10px] box-border border-1 border-[#d4d2d2] rounded-[20px] gap-[10px] my-0 mx-auto">
			<input type="text" name="search" id="search" className="w-full flex-1 border-0" />
			<CiSearch size={20} />
		</div>
	);
}
