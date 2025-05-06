'use client';

import { Dispatch, SetStateAction } from 'react';

interface TagEditor {
	onChange: Dispatch<SetStateAction<string[]>>;
	tags: string[];
}

export default function TagEditor(props: TagEditor) {
	return <div></div>;
}
