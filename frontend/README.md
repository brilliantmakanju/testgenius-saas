
## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/testgenius-frontend.git
   cd testgenius-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   AUTH0_SECRET='your-auth0-secret'
   AUTH0_BASE_URL='http://localhost:3000'
   AUTH0_ISSUER_BASE_URL='https://your-domain.auth0.com'
   AUTH0_CLIENT_ID='your-auth0-client-id'
   AUTH0_CLIENT_SECRET='your-auth0-client-secret'
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Authentication

TestGenius uses Auth0 for user authentication. The authentication flow is managed through the `UserProvider` component from `@auth0/nextjs-auth0/client` in `app/layout.tsx`.

Protected routes are managed through the `middleware.ts` file, which uses `withMiddlewareAuthRequired` from Auth0 to ensure that only authenticated users can access certain pages.

## Routing

TestGenius uses Next.js 13+ App Router for handling routes. The main structure is as follows:

- `/`: Landing page (public)
- `/dashboard`: User dashboard (protected)
- `/settings`: User settings (protected)
- `/auth`: Authentication-related pages (protected)

Protected routes are nested under the `app/(protected)` folder.

## Components

### Loader

A custom loading animation displayed during initial page load and transitions. It features a typewriter effect for the "TestGenius" text and a rotating circle animation.

### LayoutWrapper

Manages the overall layout of the application, including the sidebar, main content area, and loading state. It uses Framer Motion for smooth transitions between loading and content states.

### Nav

The main navigation component for unauthenticated users. It includes links to features, about page, and login button. It also handles mobile responsiveness with a hamburger menu for smaller screens.

### Sidebar

A collapsible sidebar for authenticated users, providing navigation links, theme toggle, logout option, and user profile information. It can be expanded or collapsed for better space management.

## Theming

The application supports both light and dark modes using the `next-themes` library. Theme toggling is available in the navigation bar and sidebar. The `ThemeProvider` component in `app/layout.tsx` manages the theme state.

## Styling

TestGenius uses Tailwind CSS for styling. The main configuration is in `tailwind.config.js`. Custom styles are defined in `styles/globals.css`.

Custom fonts (Geist and Geist Mono) are used and loaded using `next/font/local` in `app/layout.tsx`.

## State Management

Local component state is managed using React's `useState` hook. For more complex state management, consider implementing a solution like Redux or Zustand as the application grows.

## API Integration

(To be implemented) The frontend will integrate with a Django backend API for test generation and management.

## Performance Optimization

- Next.js automatic code splitting
- Dynamic imports for Sidebar and Nav components
- Image optimization with Next.js Image component (to be implemented)
- Font optimization with `next/font`

## Deployment

The project is set up to be easily deployed on Vercel. For other platforms, refer to the Next.js deployment documentation.

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

Please ensure your code follows the existing style and includes appropriate tests.

## License

[MIT License](LICENSE)
