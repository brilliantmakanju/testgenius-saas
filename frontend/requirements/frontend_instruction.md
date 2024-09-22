# Project Overview
Use this guide to build a web app where user ( developers ) upload their file or files to help them generate test based on the file ( developer has to provide all associated files so as to write effective test and user will be able to run the test on the web app and also edit the files and test ) also will be able to download their test files that was generated.


# Feature requirements
- We will use nextjs, shadcn, stripe, auth0
- create a page or screen when developer can upload all files required
- Have a nice UI & animation when uploading and after uploading files
- display number of files uploaded and test generated overtime ( this should be on the dashboard page)
- we need user to be able to edit the files and also run the test ( a screen to do that )
- for editing we need it to be or have a screen similar to a text editor
- we could have a page to view all uploaded files and test associated files and will be grouped based on tags or attributes or project


# Current File structure
├── README.md
├── app
│   ├── favicon.ico
│   ├── fonts
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   └── ui
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── checkbox.tsx
│       ├── command.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── tabs.tsx
│       └── tooltip.tsx
├── components.json
├── lib
│   └── utils.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── requirements
│   └── frontend_instruction.md
├── tailwind.config.ts
└── tsconfig.json


# Rules
- All new components should go in the /components and be named based on what the component does example: fileuploadComponent.ts also group the components
- All new pages go in /app once again group pages or nest pages when necessary

Landing Page: Introduction to the platform and its benefits
Sign Up / Login Page: User authentication
Project Creation Page: Start a new project and set parameters
File Upload Page: Upload and manage code files for testing
Dashboard: Overview of user's projects and recent activity
Project Settings Page: Manage project configurations and team members
User Profile Page: Manage user settings and preferences
Test Generation Page: Initiate AI-powered test generation and view progress
Test Results Page: Display generated tests with options to edit and export
Documentation Page: Provide guides and best practices for using the platform



