import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '../ProductCard';
import { CartProvider, useCart } from '../CartContext';

// Mock Next.js components
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }) {
    return <img src={src} alt={alt} {...props} />;
  };
});

jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

// Mock ImageWrapper component
jest.mock('../ImageWrapper', () => {
  return function MockImageWrapper({ src, alt }) {
    return <img src={src} alt={alt} data-testid="product-image" />;
  };
});

const mockProduct = {
  id: 1,
  title: 'Test Product with a very long title that should be truncated',
  price: 29.99,
  image: 'https://fakestoreapi.com/img/test.jpg',
  category: 'electronics'
};

const renderWithCartProvider = (component) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  );
};

describe('ProductCard', () => {
  test('renders product information correctly', () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);
    
    // Check if product title is rendered (truncated)
    expect(screen.getByText('Test Product with a very long title...')).toBeInTheDocument();
    
    // Check if price is rendered
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    
    // Check if image is rendered
    expect(screen.getByTestId('product-image')).toBeInTheDocument();
    expect(screen.getByTestId('product-image')).toHaveAttribute('src', mockProduct.image);
    expect(screen.getByTestId('product-image')).toHaveAttribute('alt', mockProduct.title);
    
    // Check if View Details link is rendered
    expect(screen.getByText('View Details')).toBeInTheDocument();
    expect(screen.getByText('View Details')).toHaveAttribute('href', '/products/1');
  });

  test('shows "Add to Cart" button when product is not in cart', () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton).toHaveClass('bg-blue-600');
    expect(addToCartButton).not.toHaveClass('bg-red-400');
  });

  test('shows "Remove from Cart" button when product is in cart', async () => {
    // Create a custom component that adds the product to cart
    const TestComponent = () => {
      const { addToCart } = useCart();
      
      React.useEffect(() => {
        addToCart(mockProduct);
      }, []);
      
      return <ProductCard product={mockProduct} />;
    };
    
    renderWithCartProvider(<TestComponent />);
    
    // Wait for the button to change to "Remove from Cart"
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /remove from cart/i })).toBeInTheDocument();
    });
    
    const removeButton = screen.getByRole('button', { name: /remove from cart/i });
    expect(removeButton).toHaveClass('bg-red-400');
    expect(removeButton).not.toHaveClass('bg-blue-600');
  });

  test('truncates long product titles', () => {
    const longTitleProduct = {
      ...mockProduct,
      title: 'This is a very long product title that should definitely be truncated to 25 characters'
    };
    
    renderWithCartProvider(<ProductCard product={longTitleProduct} />);
    
    // Should show truncated title with ellipsis
    expect(screen.getByText('This is a very long product...')).toBeInTheDocument();
    expect(screen.queryByText(longTitleProduct.title)).not.toBeInTheDocument();
  });

  test('handles click on Add to Cart button', async () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    
    await act(async () => {
      fireEvent.click(addToCartButton);
    });
    
    // After clicking, the button should change to "Remove from Cart"
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /remove from cart/i })).toBeInTheDocument();
    });
    
    expect(screen.getByRole('button', { name: /remove from cart/i })).toHaveClass('bg-red-400');
  });

  test('handles click on Remove from Cart button', async () => {
    // Create a component that starts with the product in cart
    const TestComponent = () => {
      const { addToCart } = useCart();
      
      React.useEffect(() => {
        addToCart(mockProduct);
      }, []);
      
      return <ProductCard product={mockProduct} />;
    };
    
    renderWithCartProvider(<TestComponent />);
    
    // Wait for the remove button to appear
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /remove from cart/i })).toBeInTheDocument();
    });
    
    const removeButton = screen.getByRole('button', { name: /remove from cart/i });
    
    await act(async () => {
      fireEvent.click(removeButton);
    });
    
    // After clicking, the button should change back to "Add to Cart"
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    });
    
    expect(screen.getByRole('button', { name: /add to cart/i })).toHaveClass('bg-blue-600');
  });

  test('renders with correct CSS classes', () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);
    
    const productCard = screen.getByText(mockProduct.title.substring(0, 25) + '...').closest('div');
    expect(productCard).toHaveClass('border', 'border-gray-300', 'rounded-md', 'p-4');
  });
}); 