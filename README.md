[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=22944340&assignment_repo_type=AssignmentRepo)
# 320-Final-Project

Project requirements:

- Application is functional and provides an experience to the user
  - Your app runs and a user can interact with it to do something. Very open ended what this will be like. Use your creativity to make something fun!
- Application uses routes
  - App must include at least two routes, ideally one that takes params to call API data, but at minimum loads two or more routes in your Single Page Application. React Router strongly encouraged.
- Fetches external API
  - Whether an api you have created (like a firebase collection, or similar), or a published API, but it must pull data from an external source. **Must use the native fetch api.** No external libraries for data fetching (like axios or react-query). **EXCEPTION**: Can use Firebase SDK if you are using a Firebase App
- Application is deployed
  - Deployed and visible to the public. GitHub Pages, Vercel, Firebase, etc
- Submitted to GitHub properly
  - All work done on a feature branch and merged into the main branch
- Utilizes reusable components
  - As needed components will be flexible and reusable
- Uses prop-types
  - All components that take in props must use prop-types, no generic proptypes, they must be specific. For example, if it takes an array of data, it must be detailed to what that array of data looks like, not just a general array

- README updated
  - README updated to include:
- Incorporates unit testing
  - At least one unit test must be included and working. Components reliant on api calls will not need to be unit tested, but anything that just relies on props will be easy to test. Must document how to run tests
- Utilzes Modern JavaScript
  - Utilizes modern methods of writing JS, no var keyword. Uses arrow functions where appropriate and uses modern methods (for example .map())
- App has styling and is polished
- Incorporate custom CSS to your project. Outside CSS libraries are allowed (Bootstrap, Tailwind, etc), Remove `console.log` statements once you're finished with development. Check for and remove Check for any React errors in the console. Fix linting issues

### URL
https://movie-night-generator.web.app
  
### SUMMARY
  Cine-Byte is movie night generator app that lets you seach movies using OMDB database and lets you build your own watchlist. For those that want to keep track of the movies they watched and or have a hard time picking a movie to watch Movie Night Generator solves that problem for them. 

### What Worked
   Setting up Firebase worked well least I was able to set that right away. It seemed easy ans straight forward. 

### What Didn't Work Well
  Thinking in React (State) was challanging. When this project was done in plan JavaScript the function were easier to follow chronologically. In React learning to think what data needs to be tracked and what UI look like for each state. 

### Changes I Would Make
  The thing that would really change is incorporating Bootstrap for styling. The looks and feel of the app could use a modern touch then what CSS offers. 

### What I Would Improve
  Making of the custom watchlist based on genre. Count of watched/unwatched movies in the watchlist or overall if multiple watchlists. 

### How To Run Locally
  1. Clone/Fork repo
  2. In root of the project run: `npm install`
  3. Create a .env file in the root with your Firebase and OMDB API keys:
      ```
      VITE_FIREBASE_API_KEY=your_key
      VITE_FIREBASE_AUTH_DOMAIN=your_domain
      VITE_FIREBASE_PROJECT_ID=your_project_id
      VITE_OMDB_API_KEY=your_key
      ```
  4. Run `npm run dev`

### How to Run Tests

1. Install dependencies: `npm install`
2. Run tests: `npm run test`

The test suite covers the `validateSearchInput` utility function which validates movie search input fields. Tests include:
- Returns error when title is empty
- Returns ok when title is provided
- Returns error when year is not 4 digits
- Returns ok when year is valid 4 digits