# Trademarkia Search Page

## Overview

This project replicates the Trademarkia Search Page using ReactJS and Next.js, styled with TailwindCSS. It includes functionality for searching trademarks, filtering by owner, law firm, attorney, and trademark status, and displaying search results with status indicators.

## Live Demo

A live demo of the application can be viewed [here](#) (replace with your actual demo link).

## Project Structure

```
/trademarkia-search
|-- /components
|   |-- SearchBar.tsx
|   |-- Filters.tsx
|   |-- TrademarkList.tsx
|   |-- StatusIndicator.tsx
|
|-- /pages
|   |-- /api
|       |-- search.ts
|   |-- index.tsx
|
|-- /styles
|   |-- globals.css
|
|-- /public
|   |-- /images
|
|-- tailwind.config.js
|-- tsconfig.json
|-- package.json
|-- README.md
```

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ddileep01/trademarkia-search.git
   cd trademarkia-search
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   Your application should be running on `http://localhost:3000`.

## Features

- **Search Bar**: Allows users to input search queries for trademarks.
- **Filters**: Provides filtering options by owner, law firm, attorney, and trademark status.
- **Status Indicator**: Displays search progress and results status (e.g., "Searching," "No Results Found," "Error Occurred").
- **Responsive Design**: Styled with TailwindCSS to ensure a responsive layout.

## Usage

1. **Search for Trademarks**: Enter a query in the search bar and click the search button.
2. **Apply Filters**: Use the filter options to narrow down search results by owner, law firm, attorney, or status.
3. **View Results**: The search results will be displayed below the search bar with relevant trademark information.
4. **Status Updates**: View status updates based on the search progress.

## API Integration

The application integrates with the Trademarkia API for search functionality. The API documentation can be found [here](https://www.postman.com/trademarkia/workspace/new-hiring-2024/request/34681474-16bfa9da-0720-4eea-90ee-7e7b1354af1b?action=share&creator=34681474&ctx=documentation).

### API Endpoints

- **Search Endpoint**: `/api/search`
  - **Method**: `GET`
  - **Query Parameters**: `query`, `country`, `owner`, `law_firm`, `attorney`, `status`

## Technologies Used

- **Next.js**: For server-side rendering and building the application.
- **ReactJS**: For building the user interface components.
- **TailwindCSS**: For styling the components with utility-first CSS.
- **TypeScript** (Bonus): For type safety and better development experience.

## Features (Bonus)

1. **TypeScript**: The project uses TypeScript for type safety.
2. **Server-Side Rendering (SSR)**: Implemented using Next.js to improve performance and SEO.
3. **Persistent Shareable Search Results Link**: Generates a unique link to share search results (not yet implemented).
4. **Loading States**: Shows loading indicators during search operations.

## Development

To contribute or modify the project:

1. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make your changes**

3. **Commit and push**

   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin feature/your-feature
   ```

4. **Create a Pull Request** on GitHub

## Testing

To run tests:

1. **Install testing dependencies**

   ```bash
   npm install --save-dev jest @types/jest ts-jest
   ```

2. **Run tests**

   ```bash
   npm test
   ```

## Deployment

To deploy the application:

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy to Vercel** (or any other hosting provider)

   ```bash
   vercel deploy
   ```

## Troubleshooting

- **Issue with API integration**: Ensure that the API credentials and endpoint configurations are correct.
- **CSS styling problems**: Check TailwindCSS configurations and ensure that styles are correctly applied.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.