import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import { fetchPostsWithRedux } from './userActions';


class App extends React.Component {

    componentDidMount(){
        this.props.fetchPostsWithRedux()
    }
        render(){
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Email</th>
                    </tr>
                    </thead>
                    {
                        this.props.posts &&
                        this.props.posts.map((post) =>{
                            return(
                                <tbody>
                                    <tr>
                                        <td>{post.firstName}</td>
                                        <td>{post.lastName}</td>
                                        <td>{post.email}</td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        posts: state.posts
    }
}

const reducer = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return state;
        case "FETCH_SUCCESS":
            return {...state, posts: action.payload};
        default:
            return state;
    }
}

let Container = connect(mapStateToProps, {fetchPostsWithRedux})(App);

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);
ReactDOM.render(
    <Provider store={store}>
        <Container/>
    </Provider>,
    document.getElementById('container')
);
