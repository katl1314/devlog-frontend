'use client';
import { FiMoreVertical } from 'react-icons/fi';
import { CiGrid41, CiGrid2H } from 'react-icons/ci';
import useLayout from '@/store/layout';
import { useTheme } from '@/store/theme';

export default function LayoutControl() {
	const { layout, setLayout } = useLayout();
	const { theme } = useTheme();

	const changeLayout = (layout: 'grid' | 'column') => {
		setLayout(layout);
	};
	console.log(theme);
	const unfocused = theme === 'dark' ? 'white' : 'black';
	const focused = theme === 'dark' ? 'red' : 'blue';
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
