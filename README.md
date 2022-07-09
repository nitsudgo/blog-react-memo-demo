# blog-react-memo-demo
Supplementary files for a blog post demonstrating the use of React Memo to mitigate un-required re-rendering.

## Usage
1. Clone this repo to your local machine.
1. In a terminal:
    1. `cd` into the root of the project directory.
    1. `npm i`
    1. `npm start`
1. In the browser, open the developer console (`F12`).
1. Play around with the application:
    1. Clicking on `Update and re-render` will update a value in state that is used by both `NoMemoComponent` and `YesMemoComponent`. The values should be updated in each of them, and in the dev console we should see two messages printed out, corresponding to the re-render that both the components undergo. This is expected: both components should re-render because the data they are taking in as props has changed.
    1. Clicking on `Re-render without update` will update a value in state that is **NOT** used by either of the components. The values within each of them will not change, but if we inspect the console, we see that only `NoMemoComponent` has printed a message. This is also expected for the following reason:
        1. When we click `Re-render without update`, a value in state updates and the main `App` is re-rendered due to the state change.
        1. Since `YesMemoComponent` and `NoMemoComponent` are both children of `App`, they *should* re-render, even if their props have not changed.
        1. `YesMemoComponent` is wrapped in a memoization, so it does not re-render as the props have not changed. 
        1. `NoMemoComponent` is **NOT** wrapped in a memoization, so it re-renders since the parent `App` component has re-rendered. 

We can carefully employ this memoization strategy in our applications for cases where a component's rendering is expensive. If a component is costly to render, memoization helps to prevent unnecessary re-rendering if the props have not changed.

For more details, do check out the original blog post.