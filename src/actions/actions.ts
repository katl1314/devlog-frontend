'use server';

import { redirect } from 'next/navigation';

export const registUser = async (_: unknown, formData: FormData) => {
	redirect('/');
};

export const savePost = async (_: unknown, formData: FormData) => {};

const validateByUser = async (id?: string) => {};

const saveStorageImage = async (file: File | undefined | null) => {};

const saveHashTags = async (tags: string[], path: string) => {};

// 댓글 추가
export const saveComments = async (_: unknown, formData: FormData) => {};

// 댓글 삭제
export const deleteComments = async (id: number) => {};

// 댓글 수정
export const updateComments = async (_: unknown, formData: FormData) => {};

// 좋아요
export const toggleLike = async (path: string) => {};
