import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const API_NEXT_PUBLIC_BASE_URL = process.env.API_NEXT_PUBLIC_BASE_URL || "";

export const patientApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_NEXT_PUBLIC_BASE_URL,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  reducerPath: "patientApi",
  tagTypes: [],
  endpoints: (build) => ({
    getPatientDetails: build.query({
      query: (message: string) => {
        return {
          url: `/chatgpt`,
          method: "POST",
          body: {
            message: message,
          },
        };
      },
    }),
  }),
});

export const {
  useLazyGetPatientDetailsQuery,
  util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = patientApi;
export const { getPatientDetails } = patientApi.endpoints;
