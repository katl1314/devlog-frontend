'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { Button, buttonVariants } from './ui/button';
import { VariantProps } from 'class-variance-authority';

interface AuthButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: React.ReactElement;
	iconPosition?: 'left' | 'right';
}

export default function AuthButton({
	value,
	icon,
	iconPosition,
	...props
}: AuthButton & VariantProps<typeof buttonVariants>) {
	const content = generateIconButton(icon, value, iconPosition);
	return (
		<Button className={props.className} {...props}>
			{content}
		</Button>
	);
}

function generateIconButton(
	icon: React.ReactNode,
	value: string | number | readonly string[] | undefined,
	iconPosition = 'left'
) {
	return icon ? (
		iconPosition === 'left' ? (
			<div className="flex items-center ">
				<div>{icon}</div> <div className="flex-1">{value}</div>
			</div>
		) : (
			<div className="flex items-center ">
				<div className="flex-1">{value}</div> <div>{icon}</div>
			</div>
		)
	) : (
		<>{value}</>
	);
}
