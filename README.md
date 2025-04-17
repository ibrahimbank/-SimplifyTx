# Transaction Dashboard

A modern transaction management dashboard built with React, TypeScript, and Material-UI.

## Features

- 📊 View transaction lists with filtering capabilities
- ➕ Create new transactions with form validation
- 🔍 Filter by ID, amount, status, and date range
- 📱 Fully responsive design
- 🎨 Themed with Material-UI design system
- ⚡ Type-safe with TypeScript

## Live Demo

[View Live Demo]: https://simplify-tx.vercel.app/

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:

  - git clone https://github.com/ibrahimbank/-SimplifyTx.git
  
  - cd transaction-dashboard

2. npm install
# or
yarn install

Open http://localhost:3000 to view in browser.


## Production Build

npm run build
# or
yarn build

## 🧪 Validation & Edge Cases
✅ Amount must be a positive number.

✅ Date must not be in the future.

✅ Filters work with debounce to reduce re-renders.

✅ API errors are gracefully handled.

## 🧠 My Approach
- Core UI & State: Built with React and Next.js using useState, useEffect for local state and Axios for API interaction.

- Filters: Used a separate FilterSection component with controlled inputs and debounce logic.

- Form Validation: Manually validated form inputs before posting data.

- Routing: Used Next.js pages for index.js (transaction list) and new-transaction.js (create form).

## Tech Stack
1. Frontend:
- React 18
- TypeScript
- Material-UI 5
- Axios

2. Build Tools:

- Webpack
- Babel

## Project Structure ( Main Folders )
src:
  - components:      
     - FilterSection 
    - TransactionCard 
     - Loader          
     - ErrorMessage   
  - pages: 
     - app
     - document
     - index 
     - new-transaction 
  
  - style:
      - globals.css
              

License
- Distributed under the MIT License. See LICENSE for more information.


Project Link: https://simplify-tx.vercel.app/
