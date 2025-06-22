'use client';
import { FiMoreVertical } from 'react-icons/fi';
import { CiGrid41, CiGrid2H } from 'react-icons/ci';
import useLayout from '@/store/layout';

export default function LayoutControl() {
	const { layout, setLayout } = useLayout();
	const theme: string = ''; // 'dark' or ''

	const changeLayout = (layout: 'grid' | 'column') => {
		setLayout(layout);
	};

	const unfocused = theme === 'dark' ? 'white' : 'black';
	const focused = theme === 'dark' ? 'red' : 'black';
	return (
		<div className="hidden md:flex items-center gap-4">
			<div className="flex gap-2">
				<CiGrid41
					size={26}
					className={'cursor-pointer '}
					fill={layout === 'grid' ? focused : unfocused}
					onClick={changeLayout.bind(null, 'grid')}
				/>
				<CiGrid2H
					size={26}
					className={'cursor-pointer'}
					fill={layout === 'column' ? focused : unfocused}
					onClick={changeLayout.bind(null, 'column')}
				/>
			</div>
			<FiMoreVertical size={22} className={'cursor-pointer'} />
		</div>
	);
}
