---
description: Best practices for defining and maintaining Express.js routes.
applyTo: src/routes/**/*.ts
---

This document defines best practices for writing Express.js routes that are consistent, secure, and easy to maintain.

## 1. Route Design
- Keep routes focused on HTTP concerns only (request parsing, response shaping, status codes).
- Use resource-oriented paths (for example: `/users`, `/users/:id`) instead of action-style paths.
- Use plural nouns for collection resources and route parameters for specific resources.
- Keep route names predictable and avoid deep nesting when possible.
- Version public APIs when introducing breaking changes (for example: `/api/v1/...`).

## 2. Separation of Concerns
- Keep business logic out of route files.
- Delegate non-trivial work to controllers/services.
- Keep route handlers short and readable.
- Group related routes in dedicated router modules.

## 3. Validation and Input Safety
- Validate `req.params`, `req.query`, and `req.body` before calling business logic.
- Reject invalid input with clear client-safe error messages.
- Never trust client input; sanitize and normalize where needed.
- Parse and coerce values deliberately (for example IDs, booleans, pagination values).

## 4. Error Handling
- Wrap async handlers so rejected promises are forwarded to centralized error middleware.
- Return consistent error response shapes across all routes.
- Use appropriate HTTP status codes (`400`, `401`, `403`, `404`, `409`, `422`, `500`).
- Do not leak internal implementation details in error messages.

## 5. Middleware Usage
- Apply authentication/authorization middleware close to the protected routes.
- Keep middleware composable and single-purpose.
- Reuse shared middleware (logging, auth, validation, rate limiting) rather than duplicating logic.
- Maintain a clear middleware order (logging -> auth -> validation -> handler -> error handling).

## 6. Response Consistency
- Return JSON responses with a stable structure.
- Use explicit status codes for every response path.
- Avoid sending multiple response formats for the same endpoint unless documented.
- Return early after sending a response to avoid accidental fall-through.

## 7. Performance and Reliability
- Support pagination for list endpoints.
- Avoid heavy synchronous work inside route handlers.
- Use timeouts/retries in downstream service layers, not route handlers.
- Keep routes idempotent where HTTP semantics require it (`GET`, `PUT`, `DELETE`).

## 8. Security
- Enforce least privilege in protected routes.
- Avoid exposing sensitive fields in responses.
- Validate file upload types/sizes and limit payload size.
- Use rate limiting where appropriate for login and public endpoints.

## 9. Testing Expectations
- Add route tests for success, validation failure, authorization failure, and unexpected errors.
- Verify status codes and response body contracts in tests.
- Test edge cases for path/query/body values.
- Keep tests deterministic and independent.

## 10. Documentation
- Keep route contracts documented (request shape, response shape, status codes).
- Update route documentation when behavior changes.
- Include examples for common success and error cases.
