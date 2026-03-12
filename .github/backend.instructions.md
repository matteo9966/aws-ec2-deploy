---
description: This file describes the coding standards and best practices for the backend codebase.
applyTo: **/*.ts

---
This document outlines the coding standards and best practices for the backend codebase. Adhering to these guidelines will help maintain a consistent code style, improve readability, and enhance maintainability across the project.
## 1. Project Structure
The backend codebase should be organized in a clear and logical manner. A common structure is as follows:
src/
├── server.ts
├── app.ts
├── config/
│   └── environment.ts
├── routes/
│   └── index.ts
├── controllers/
│   └── example.controller.ts
├── middleware/
│   ├── errorHandler.ts
│   └── requestLogger.ts
├── services/
│   └── example.service.ts
└── types/
  └── index.ts


  ## 2. Coding Standards
- Use camelCase for variable and function names.
- Use PascalCase for class names and interfaces.
- Use UPPER_SNAKE_CASE for constants.
- Always use semicolons at the end of statements.
- Use single quotes for strings, except when the string contains a single quote.
- Use template literals for string concatenation.
- Keep lines of code to a maximum of 80 characters for better readability.
- Use descriptive names for variables, functions, and classes to improve readability.

## 3. Best Practices
- Use async/await for asynchronous code to improve readability and error handling.
- Handle errors gracefully and provide meaningful error messages.
- Use environment variables for configuration and sensitive information.
- Write unit tests for critical functions and components to ensure code quality and reliability.
- Use a linter (e.g., ESLint) to enforce coding standards and catch potential issues early.
- Regularly review and refactor code to improve performance and maintainability.
- Document your code with comments where necessary, especially for complex logic and public APIs.
By following these coding standards and best practices, we can ensure that our backend codebase remains clean, efficient, and maintainable as the project grows.

