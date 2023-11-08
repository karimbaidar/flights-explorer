
# Flight Price Explorer

## Introduction
___

This project is a quick start guide for using Tailwind CSS, Vue 3, and Docker. I've used Docker Compose and Dockerfiles to make it easy to kick off the project. Feel free to check it out and apply the concepts to your own work.

The main focus of the project is on the frontend, where I've created a flight explorer. The backend is built with Node.js but it's kept simple, serving as a straightforward endpoint for getting flight data. It's a practical example that gives you a good look at how everything comes together in the user interface.

- Leveraged Docker for streamlined development.
- Focused on implementing core functionalities due to time constraints, with the possibility of some missing features.
- Prioritized the use of reusable components for enhanced efficiency.
- Omitted the use of Stores or state management tools like Vuex, but suggested consideration for state tracking and preserving user search filter states.
- Applied linting with room for further improvement.
- Utilized Prettier for consistent code formatting.
- Emphasized service-based architecture for code reusability.
- Employed the v-select npm package for providing search and dropdown options for origins and destinations, as a time-saving alternative to building custom components.
- Included an application screenshot in the assets/ folder.
- Wrote a single test to mock API calls, with room for additional tests covering scenarios such as dropdown functionality, filter accuracy, list display, and sorting behavior.
- Acknowledged that the HomeView component is somewhat extensive, suggesting further optimization by breaking down functions into utility and service functions for improved reusability and efficiency.
- Integrated TypeScript, with consideration for instances where type inference may not be optimal.
- Utilized Jest for unit testing, with potential consideration for Playwright for end-to-end testing in future projects.
- Currently, no integration tests, but suggested potential evaluation for how multiple components synchronize and work together in complex scenarios.
- Avoided using RxJs in favor of a simpler fetch approach to avoid unnecessary complexity.
- Initialized the repository with Git version control.
- Utilized mock data in JSON format stored in a backend server's JSON file.
- The backend server is built with Express and Node.js.
- Incorporated SVG icons from FontAwesome for simplicity, with a suggestion for adopting the standard method for encoding icons for a more robust solution.
- Kept the API endpoint straightforward; future iterations could involve implementing authentication with token-based bearer concepts.
- Although Origin and Destination dropdown lists should ideally be dynamically managed, they are currently static for the sake of simplicity.
- Set TypeScript's strict mode to false in the tsconfig, but suggested adjustment to true for stricter type checking.
- Consideration for implementing 'LAZY loading' or pagination for improved user experience, particularly for long lists and dropdown elements.
- Personal preference for writing custom components rather than using third-party solutions like v-select.
- Didn't use icons for the input boxes on the left side as defined in the sample, but noted it is easily achievable.
- Mobile view is optimized, and via Tailwind, attempted to make it responsive for multiple-sized screens.
- The project uses hot module replacement for live development, reflecting changes immediately on the live development server.
- Acknowledgment of the possibility of some rusty coding, particularly mentioned in the README.md.

______

# Project Setup
To get started with this project, follow these steps:

### Install Docker Desktop.

Navigate to the directory where the docker-compose.yml file is located.

Run the following command to build and start the containers:

```
docker-compose up --build
```
Building the containers will take some time as it also installs the necessary Node.js modules for the project. You may encounter warnings and other TypeScript-related messages, which can be safely ignored. The application should run smoothly after the build process is complete.

### Running Tests
To run tests, follow these steps:

Navigate to the 'client' directory.

Run the following command to execute all tests but we have limited tests. 

```
npx jest
```

## How to Contribute

I welcome contributions from the community to make this project even better. Here are some guidelines to get you started:

1. Fork the repository.
2. Clone the forked repository to your local machine.

```bash
git clone https://github.com/your-username/project.git
```

3. Create a new branch for your feature or bug fix.
```bash
git checkout -b feature-or-bugfix-branch
```

4. Make your changes and commit them with a descriptive commit message.
```bash
git commit -m "Add feature or fix bug: a brief description"
```

5. Push your changes to your fork on GitHub.
```bash
git push origin feature-or-bugfix-branch
```

6. Open a pull request (PR) to the main branch of the original repository.
7. Provide a clear and concise description of your changes in the pull request.
8. Your contribution will be reviewed, and if everything looks good, it will be merged.

## Code Style
Follow the existing code style in the project. If you're introducing new features or making significant changes, consider updating or adding relevant documentation.

## Issues
Feel free to check the existing issues for tasks that need attention or open a new issue if you find a bug or have a feature request.

Thank you for contributing!

