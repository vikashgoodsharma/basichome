# BasicHome - E-commerce Product Catalog

A modern, responsive e-commerce product catalog built with Next.js, React, and Tailwind CSS. Features include product browsing, search functionality, cart management, and a clean, user-friendly interface.

## 🚀 Features

- **Product Catalog**: Browse products with images, titles, prices, and descriptions
- **Search Functionality**: Real-time search by product title
- **Shopping Cart**: Add/remove products with React Context for state management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Product Details**: Detailed product pages with comprehensive information
- **SEO Optimized**: Meta tags and structured data for better search engine visibility
- **Testing**: Comprehensive unit tests with Jest and React Testing Library

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.4
- **Frontend**: React 19.0.0
- **Styling**: Tailwind CSS 4
- **Testing**: Jest + React Testing Library
- **API**: FakeStore API for product data
- **State Management**: React Context API

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js**: Version 18.x or higher
- **npm**: Version 8.x or higher

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/basichome.git
cd basichome
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build for Production

```bash
npm run build
npm start
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI/CD pipeline
npm run test:ci
```

### Test Coverage

The project includes comprehensive test coverage for:

- **Component Testing**: ProductCard component with cart functionality
- **Business Logic Testing**: Cart context with add/remove operations
- **Integration Testing**: Component interactions and state management

### Test Structure

```
src/components/__tests__/
├── ProductCard.test.jsx    # ProductCard component tests
└── CartContext.test.jsx    # Cart business logic tests
```

### Coverage Thresholds

The project maintains a minimum coverage threshold of 70% for:
- Branches
- Functions
- Lines
- Statements

## 📁 Project Structure

```
basichome/
├── .github/workflows/      # GitHub Actions CI/CD
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── __tests__/     # Test files
│   │   ├── CartContext.jsx # Cart state management
│   │   ├── Header.jsx     # Site header with cart icon
│   │   ├── ProductCard.jsx # Product display component
│   │   └── ImageWrapper.jsx # Image wrapper component
│   ├── pages/             # Next.js pages
│   │   ├── index.js       # Home page with product list
│   │   ├── products/      # Product detail pages
│   │   └── _app.js        # App wrapper with providers
│   └── styles/            # Global styles
├── jest.config.js         # Jest configuration
├── jest.setup.js          # Jest setup file
└── package.json           # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:ci` - Run tests for CI/CD

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Ensure all tests pass before submitting PR
- Follow the existing code style
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) for providing product data
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Testing Library](https://testing-library.com/) for testing utilities

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.
