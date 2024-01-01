import { createSlice } from "@reduxjs/toolkit"
import { FaLessThanEqual } from "react-icons/fa"

const initialState = {
    step:1,
    course: null,
    editCourse: FaLessThanEqual,
    paymentLoading: false,
}

const courseSlice = createSlice( {
    name:"course",
    initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload
        },
        setCOurse: (state, action) => {
            state.course = action.payload
        },
        setEditCourse: (state, action) => {
            state.editCourse = action.payload
        },
        setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload
        },
        resetCourseState: (state) => {
            state.step = 1,
            state.course = null,
            state.editCourse = false
        },
    },
  
} )

export default courseSlice

