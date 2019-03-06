function fetchPostsRequest(){
    return {
        type: "FETCH_REQUEST"
    }
}

function fetchPostsSuccess(payload) {
    return {
        type: "FETCH_SUCCESS",
        payload
    }
}

function fetchPostsError() {
    return {
        type: "FETCH_ERROR"
    }
}

export function fetchPostsWithRedux() {
    return (dispatch) => {
        dispatch(fetchPostsRequest());
        return fetchPosts().then(([response, json]) =>{
            if(response.status === 200){
                dispatch(fetchPostsSuccess(json))
            }
            else{
                dispatch(fetchPostsError())
            }
        })
    }
}

function fetchPosts() {
    const URL = "http://localhost:8080/api/v1/users";
    return fetch(URL, { method: 'GET'})
        .then( response => Promise.all([response, response.json()]));
}
