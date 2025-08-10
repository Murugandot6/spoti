# AI Rules for Ridm Web Player

This document outlines the technical stack and guidelines for developing the Ridm Web Player application.

## Tech Stack

*   **React**: The core library for building the user interface.
*   **React Router**: Manages client-side routing within the application, with routes defined in `src/App.jsx`.
*   **Redux & Redux Toolkit**: Used for centralized state management across the application (e.g., player state, user library, prompts).
*   **Tailwind CSS**: The primary framework for all styling, ensuring a utility-first approach and responsive design.
*   **RTK Query**: Handles data fetching and caching for interactions with the Deezer and Musixmatch APIs.
*   **ColorThief**: A utility library for extracting dominant colors from images, used for dynamic UI theming.
*   **Swiper.js**: Utilized for creating modern, touch-enabled carousels and sliders.
*   **Appwrite**: Serves as the backend-as-a-service for database operations, including visitor tracking and survey responses.
*   **JavaScript/JSX**: The primary language for application logic and component definition.
*   **Vite**: The build tool used for fast development and optimized production builds.

## Library Usage Rules

To maintain consistency, efficiency, and best practices, adhere to the following rules when implementing new features or modifying existing ones:

*   **UI Components**:
    *   **Shadcn/ui**: Prefer using components from the `shadcn/ui` library for all new UI elements. If a specific component is not available or requires significant customization, create a new, small, focused component.
    *   **Lucide React**: Use `lucide-react` for all icons.
*   **Styling**:
    *   **Tailwind CSS**: All styling must be done using Tailwind CSS utility classes. Avoid custom CSS files or inline styles unless absolutely necessary for dynamic properties not easily achievable with Tailwind.
*   **State Management**:
    *   **Redux Toolkit**: All global application state should be managed using Redux Toolkit slices.
*   **API Interactions**:
    *   **RTK Query**: Use RTK Query for all data fetching from external APIs (Deezer, Musixmatch).
    *   **Axios**: While Axios is present, prefer RTK Query for API calls. Axios can be used for non-API data fetching or specific utility functions if RTK Query is not suitable.
*   **Routing**:
    *   **React Router**: Manage all navigation and routing using `react-router-dom`. Keep main routes defined in `src/App.jsx`.
*   **Backend/Database**:
    *   **Appwrite**: For any database interactions, user authentication, or server-side functions, utilize the Appwrite SDK.
*   **Carousels/Sliders**:
    *   **Swiper.js**: Use Swiper for any carousel or slider functionalities.
*   **Color Extraction**:
    *   **ColorThief**: Use ColorThief for extracting colors from images for dynamic theming.
*   **File Structure**:
    *   New components should be created in `src/components/`.
    *   New pages should be created in `src/pages/`.
    *   Utility functions should reside in `src/utils/`.
    *   Redux slices should be in `src/redux/features/`.
    *   API services (RTK Query) should be in `src/redux/services/`.
    *   Directory names must be all lowercase.
*   **Code Quality**:
    *   Prioritize creating small, focused files and components (ideally under 100 lines of code).
    *   Ensure complete and syntactically correct code.
    *   Follow existing coding style and conventions.
    *   Implement responsive designs using Tailwind CSS.
    *   Use toast notifications for important user feedback.
    *   Avoid over-engineering; focus on the user's request with minimal, elegant changes.