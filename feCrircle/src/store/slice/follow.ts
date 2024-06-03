import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFollowState {
    // Definisikan state yang akan digunakan untuk menyimpan informasi follow
    // Contoh: 
    followingList: number[]; // Array ID pengguna yang di-follow
    loading: boolean; // Status loading saat memproses follow
    errorMessage: string; // Pesan kesalahan jika ada kesalahan saat follow
}

const initialState: IFollowState = {
    followingList: [],
    loading: false,
    errorMessage: "",
};

export const followSlice = createSlice({
    name: "follow",
    initialState,
    reducers: {
        // Tambahkan action creator untuk mengatur status loading saat memulai follow
        followRequest: (state) => {
            state.loading = true;
            state.errorMessage = "";
        },
        // Tambahkan action creator untuk mengatur state setelah berhasil follow
        followSuccess: (state, action: PayloadAction<number>) => {
            state.loading = false;
            state.followingList.push(action.payload);
        },
        // Tambahkan action creator untuk mengatur state jika terjadi kesalahan saat follow
        followFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
    },
});

export const { followRequest, followSuccess, followFailure } = followSlice.actions;
export default followSlice.reducer;
