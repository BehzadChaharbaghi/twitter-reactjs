import React from "react";

var LayoutStateContext = React.createContext();
var LayoutDispatchContext = React.createContext();

//store bara rikhtan hame dakhelesh

function layoutReducer(state, action) {
    switch (action.type) {
        case "TOGGLE_DRAWER":
            return {...state, drawerOpen: !state.drawerOpen};
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function LayoutProvider({children}) {
    var [state, dispatch] = React.useReducer(layoutReducer, {
        drawerOpen: false,
    });
    return (
        <LayoutStateContext.Provider value={state}>
            <LayoutDispatchContext.Provider value={dispatch}>
                {children}
            </LayoutDispatchContext.Provider>
        </LayoutStateContext.Provider>
    );
}

function useLayoutState() {
    var context = React.useContext(LayoutStateContext);
    if (context === undefined) {
        throw new Error("useTwittState must be used within a TwittProvider");
    }
    return context;
}

function useLayoutDispatch() {
    var context = React.useContext(LayoutDispatchContext);
    if (context === undefined) {
        throw new Error("useTwittDispatch must be used within a TwittProvider");
    }
    return context;
}

export {LayoutProvider, useLayoutState, useLayoutDispatch, toggleDrawer};

// ###########################_SetStates_################################
function toggleDrawer(dispatch) {
    dispatch({
        type: "TOGGLE_DRAWER",
    });
}

