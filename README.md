# Dishes Payment Tracker

A React application to track and reward dish-washing tasks. Get paid $7 for each time you complete the dishes on allowed days (Sunday, Wednesday, and Thursday).

## Features

- Calendar view to track dish-washing tasks
- Earn $7 for each completed day
- Available only on Sundays, Wednesdays, and Thursdays
- Automatic total earnings calculation
- Data persistence (your progress is saved)
- Monthly navigation
- Mobile-friendly design

## Getting Started

### Prerequisites

Make sure you have the following installed on your computer:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yahyamaw311/task-payer.git
cd task-payer
```

2. Install dependencies:
```bash
npm install
```

### Running the App

1. Start the development server:
```bash
npm start
```

2. Open your browser and visit:
```
http://localhost:3000
```

The app will automatically reload if you make changes to the code.

## How to Use

1. The calendar shows the current month
2. Available days (Sunday, Wednesday, Thursday) are highlighted
3. Click on an available day to mark dishes as complete
4. Your earnings will be automatically calculated ($7 per completed day)
5. Use the arrow buttons to navigate between months
6. Your progress is automatically saved
7. Use the "Clear All Data" button to reset your progress

## Development

To build the app for production:
```bash
npm run build
```

This will create an optimized build in the `build` folder.

## Technologies Used

- React
- CSS3
- Local Storage for data persistence
- Modern JavaScript (ES6+)
- Cursor AI
