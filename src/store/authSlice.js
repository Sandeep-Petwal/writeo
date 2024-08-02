import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: JSON.parse(localStorage.getItem("authStatus")) || false,
    userData: JSON.parse(localStorage.getItem("userData")) || null,
    posts: JSON.parse(localStorage.getItem("posts")) || null, // array of post object
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            localStorage.setItem("authStatus", JSON.stringify(true));
            localStorage.setItem("userData", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            localStorage.setItem("authStatus", JSON.stringify(false));
            localStorage.removeItem("userData");
            localStorage.removeItem("posts");
            },
        statePosts: (state, action) => {
            state.posts = action.payload;
            localStorage.setItem("posts", JSON.stringify(action.payload));
        },
    },
});

export const { login, logout, statePosts } = authSlice.actions;

export default authSlice.reducer;





















// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     status : true,
//     userData: null,
//     posts : null, // array of post object
// }

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         login: (state, action) => {
//             console.log("setting status true");
//             state.status = true;
//             state.userData = action.payload;
//             console.log("state userData / payload.userData  : ", action.payload);

//         },
//         logout: (state) => {
//             console.log("setting status false");
//             state.status = false;
//             state.userData = null;
//         },
//         statePosts : (state, action) => {
            
//             state.posts = action.payload;
//         }
//      }
// })

// export const {login, logout, statePosts} = authSlice.actions;

// export default authSlice.reducer;