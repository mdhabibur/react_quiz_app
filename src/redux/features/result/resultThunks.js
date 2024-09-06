import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, getDatabase, ref, set } from "firebase/database";

export const fetchCorrectAnswers = createAsyncThunk(
	"result/fetchCorrectAnswers",
	async (videoId, { rejectWithValue }) => {
		try {
			const db = getDatabase();
			const answersRef = ref(db, `answers/${videoId}/questions`);
			const snapshot = await get(answersRef);

			if (snapshot.exists()) {
				return snapshot.val();
			} else {
				return rejectWithValue("No answers available");
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchResult = createAsyncThunk(
	"result/fetchResult",
	async ({ uid, videoId }, { rejectWithValue }) => {
		try {
			const db = getDatabase();
			const resultRef = ref(db, `result/${uid}/${videoId}/questions`);
			const snapshot = await get(resultRef);

			if (snapshot.exists()) {
				return snapshot.val();
			} else {
				return rejectWithValue("No result available");
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);


export const fetchResultScore = createAsyncThunk(
	"result/fetchResultScore",
	async ({ uid, videoId }, { rejectWithValue }) => {
		try {
			const db = getDatabase();
			const resultRef = ref(db, `result/${uid}/${videoId}/score`);
			const snapshot = await get(resultRef);

			if (snapshot.exists()) {
				return snapshot.val();
			} else {
				return rejectWithValue("No result available");
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateResult = createAsyncThunk(
	"result/updateResult",
	async ({ videoId, uid, resultWithCorrectAnswers }, { rejectWithValue }) => {
		//upload to firebase
		const db = getDatabase();

		const resultRef = ref(db, `result/${uid}/${videoId}/questions`);
		// const resultRefForScore = ref(db, `result/${uid}/${id}/score`)

        try {

            return await set(resultRef, resultWithCorrectAnswers)
            
        } catch (error) {
            return rejectWithValue(error.message);
            
        }


	}
);

export const updateResultScore = createAsyncThunk(
	"result/updateResultScore",
	async ({ videoId, uid, userScore }, { rejectWithValue }) => {
		//upload to firebase
		const db = getDatabase();

		const resultRef = ref(db, `result/${uid}/${videoId}/score`);
		// const resultRefForScore = ref(db, `result/${uid}/${id}/score`)

        try {

            await set(resultRef, userScore)
            return userScore
            
        } catch (error) {
            return rejectWithValue(error.message);
            
        }


	}
);
