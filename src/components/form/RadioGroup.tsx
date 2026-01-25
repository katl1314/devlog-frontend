'use client';

import { cn } from '@/utils';
import { useContext, createContext, useRef, MouseEventHandler } from 'react';

interface RadioGroupContext {
	value: string | undefined;
	name: string;
	onChangeItem: (value: 'PUBLIC' | 'PRIVATE') => void;
}

interface IRadioGroup {
	name: string;
	children: React.ReactNode[] | React.ReactNode;
	className?: string;
	value?: string;
	onChangeItem: (value: 'PUBLIC' | 'PRIVATE') => void;
}

interface IRadioItem {
	value: string;
	children: React.ReactNode;
}

const RadioGroupContext = createContext<RadioGroupContext | null>(null);

export function RadioGroup({ children, className, name, value, onChangeItem }: IRadioGroup) {
	return (
		<RadioGroupContext.Provider value={{ name, value, onChangeItem }}>
			<div role="radiogroup" className={cn('flex ', className)}>
				{children}
			</div>
		</RadioGroupContext.Provider>
	);
}

export function RadioItem({ value, children }: IRadioItem) {
	const context = useContext(RadioGroupContext);
	const radioRef = useRef<HTMLInputElement | null>(null);
	const isOn = value === context?.value;

	const handleClickRadio: MouseEventHandler = () => {
		const target = radioRef?.current as HTMLInputElement;
		context?.onChangeItem(target.value as 'PUBLIC' | 'PRIVATE');
	};

	const radioCSS = cn(
		'cursor-pointer px-2 py-2 border-1 border-neutral-100 min-w-[60px] text-center first:rounded-l-[8px] last:rounded-r-[8px] border-box',
		isOn ? 'bg-[rgb(32,142,252)] text-white' : 'bg-white text-black'
	);

	return (
		<label htmlFor={value} onClick={handleClickRadio} className={radioCSS}>
			<input type="radio" name={context?.name} value={value} className="hidden" ref={radioRef} />
			<div>{children}</div>
		</label>
	);
}
