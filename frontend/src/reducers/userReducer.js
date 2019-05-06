//**User reducer manages user */
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET':
            console.log(action.data);
            return action.data;
        default:
            return state;
    }
}

//**User setting action creator */
export const setUser = (user) => {
    return {
        type: 'SET',
        data: user
    }
}

export default userReducer;