import { create } from 'zustand'

export default function useStores() {
    const useMemoStore = create((set) => ({
        memo: '',
        setMemo: (text: string) => set({ memo: text }),
        memos: [],
        setMemos: (newMemo: { memo: string }) =>
            set((prev) => ({
                memos: [...prev.memos, newMemo],
            })),
    }))

    return { useMemoStore }
}
