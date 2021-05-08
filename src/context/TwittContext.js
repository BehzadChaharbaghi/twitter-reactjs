import React from "react";
import { getHashTags } from './../api/api_tweet';

var TwittStateContext = React.createContext();
var TwittDispatchContext = React.createContext();

//store bara rikhtan hame dakhelesh

function twittReducer(state, action) {
  switch (action.type) {
    case "SET_TWITT_TEXT":
      return { ...state, twittText: action.payload };
    case "SET_TWEET_LIST":
      return { ...state, tweetList: action.payload };
    case "SET_HASHTAG_LIST":
      return { ...state, hashTag: action.payload };
    case "LIKE_TWEET":
      const tweetId = action.payload;
      const findIndex = state.tweetList.findIndex(item => item._id === tweetId);
      if (findIndex === -1)
        return state;
      return { ...state, tweetList: [...state.tweetList.slice(0, findIndex), { ...state.tweetList[findIndex], likes: state.tweetList[findIndex].likes + 1 }, ...state.tweetList.slice(findIndex + 1)] };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function TwittProvider({ children }) {
  var [state, dispatch] = React.useReducer(twittReducer, {
    twittText: '',
    tweetList: [],
    hashTag: []
  });
  return (
    <TwittStateContext.Provider value={state}>
      <TwittDispatchContext.Provider value={dispatch}>
        {children}
      </TwittDispatchContext.Provider>
    </TwittStateContext.Provider>
  );
}

function useTwittState() {
  var context = React.useContext(TwittStateContext);
  if (context === undefined) {
    throw new Error("useTwittState must be used within a TwittProvider");
  }
  return context;
}

function useTwittDispatch() {
  var context = React.useContext(TwittDispatchContext);
  if (context === undefined) {
    throw new Error("useTwittDispatch must be used within a TwittProvider");
  }
  return context;
}

export { TwittProvider, useTwittState, useTwittDispatch, setTweetText, likeTweet, setTweetList, setHashTagList,updateHashTagList };

// ###########################_SetStates_################################
function setTweetText(dispatch, twittText) {
  dispatch({
    type: "SET_TWITT_TEXT",
    payload: twittText
  });
}

function likeTweet(dispatch, id) {
  dispatch({
    type: "LIKE_TWEET",
    payload: id
  });
}

function setTweetList(dispatch, list) {
  dispatch({
    type: "SET_TWEET_LIST",
    payload: list
  });
}
function setHashTagList(dispatch, list) {
  dispatch({
    type: "SET_HASHTAG_LIST",
    payload: list
  });
}
function updateHashTagList(dispatch) {
  getHashTags((isOK, data) => {
    if (isOK) {
      dispatch({
        type: "SET_HASHTAG_LIST",
        payload: data
      });
    }
  })
}

