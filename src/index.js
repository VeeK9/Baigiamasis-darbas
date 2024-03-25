import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UsersProvider } from "./contexts/UsersContext";
import { PostsProvider } from "./contexts/PostsContext";
import { CommentsProvider } from "./contexts/CommentsContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <UsersProvider>
      <PostsProvider>
        <CommentsProvider>
          <App />
        </CommentsProvider>
      </PostsProvider>
    </UsersProvider>
  </BrowserRouter>
);
