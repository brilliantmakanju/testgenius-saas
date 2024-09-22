export const apiReference: ApiReference = [
  {
    "id": "authentication",
    "title": "Authentication",
    "description": "The Authentication API allows you to securely authenticate users and manage access tokens. Use these endpoints to implement user login, token refresh, and logout functionality in your application.",
    "endpoints": [
      {
        "method": "POST",
        "path": "/api/auth/login",
        "description": "Authenticate a user and retrieve an access token. This endpoint verifies the user's credentials and returns a JWT token for subsequent authenticated requests.",
        "requestBody": {
          "email": "user@example.com",
          "password": "your_password"
        },
        "response": {
          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          "token_type": "Bearer",
          "expires_in": 3600
        }
      }
    ]
  },
  {
    "id": "projects",
    "title": "Projects",
    "description": "The Projects API allows you to manage test generation projects. Use these endpoints to create, retrieve, update, and delete projects, as well as manage the files associated with each project.",
    "endpoints": [
      {
        "method": "POST",
        "path": "/api/projects",
        "description": "Create a new project for test generation. This endpoint allows you to set up a new project with a name and associated repository, preparing it for test generation.",
        "requestBody": {
          "name": "My Project",
          "repository": "https://github.com/user/repo"
        },
        "response": {
          "id": "project-123",
          "name": "My Project",
          "repository": "https://github.com/user/repo",
          "createdAt": "2023-06-15T10:30:00Z"
        },
        "authRequired": true
      },
      {
        "method": "GET",
        "path": "/api/projects/{projectId}",
        "description": "Retrieve detailed information about a specific project. This endpoint returns the project's metadata, including its name, associated repository, and creation date.",
        "response": {
          "id": "project-123",
          "name": "My Project",
          "repository": "https://github.com/user/repo",
          "createdAt": "2023-06-15T10:30:00Z"
        },
        "authRequired": true
      }
    ]
  },
  {
    "id": "tests",
    "title": "Tests",
    "description": "The Tests API provides endpoints for generating, retrieving, and managing tests for your projects. Use these endpoints to initiate test generation, fetch generated tests, and manage test suites.",
    "endpoints": [
      {
        "method": "GET",
        "path": "/api/projects/{projectId}/tests",
        "description": "Retrieve all generated tests for a specific project. This endpoint returns a list of test files, including their content, allowing you to review and integrate the generated tests into your project.",
        "response": [
          {
            "id": "test-1",
            "fileName": "Component.test.js",
            "content": "describe('Component', () => { ... })"
          },
          {
            "id": "test-2",
            "fileName": "Utils.test.js",
            "content": "test('utility function', () => { ... })"
          }
        ],
        "authRequired": true
      },
      {
        "method": "POST",
        "path": "/api/projects/{projectId}/generate",
        "description": "Initiate the test generation process for a specific project. This endpoint triggers our AI to analyze your project's code and generate appropriate tests. The process runs asynchronously, and you'll receive a job ID to check the status.",
        "response": {
          "status": "success",
          "message": "Test generation started",
          "jobId": "job-456"
        },
        "authRequired": true
      }
    ]
  }
]
