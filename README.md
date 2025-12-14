# TODO LIST

Simple task manager built with React and Create React App.  
Tasks are stored in `localStorage` under the key `todo.items.v1`, so they survive page refresh and browser restarts

The UI is split into two sections:

- Left: list of tasks in reverse chronological order (newest at the top) 
- Right: detail panel to create, edit, delete, and mark tasks as done.

# Functional overview

Add task

Title is required, non‑empty, with a maximum length of 120 characters.​

Description is optional, with a maximum length of 1000 characters.​

Edit task

Update both title and description for any existing task.

Mark as done / undone

Toggle completion using a checkbox in the task list.

Delete task

Remove the currently selected task from the list.

Ordering

Tasks are stored and rendered in reverse chronological order, with the newest task at the top.​

Persistence

All tasks are stored in localStorage under a single key: todo.items.v1, ensuring the task list survives page refresh.​

Feedback

On creating a new task, a modal displays “Task created”.

On updating an existing task, a modal displays “Changes saved”.

# Prerequisites

Node.js 14 or higher

npm (bundled with Node.js)

# Installation

git clone https://github.com/Abhishek123-rgb/Todo-List.git
cd Todo-List
git checkout main
npm install
All code is on the main branch, so make sure you are on that branch before running the app

# Development server

npm start

This starts the development server at http://localhost:3000. The page reloads automatically when you change the code

# Notes and possible improvements

1. Automated tests are not yet implemented for this project; the focus is on fulfilling the   functional and non‑functional requirements of the offline coding challenge, including clean component structure and local persistence.​

2. The styling is intentionally minimal and can be extended with a design system or component library if needed.

3. The current layout targets desktop resolution; responsive refinements for smaller viewports can be added as a next step.



