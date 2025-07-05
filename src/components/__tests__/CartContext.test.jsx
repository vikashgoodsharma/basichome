import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartProvider, useCart } from '../CartContext';

// Test component to access cart context
const TestComponent = ({ onCartChange }) => {
  const { cart, addToCart, removeFromCart, cartCount } = useCart();
  
  React.useEffect(() => {
    if (onCartChange) {
      onCartChange({ cart, cartCount });
    }
  }, [cart, cartCount, onCartChange]);

  return (
    <div>
      <div data-testid="cart-count">{cartCount}</div>
      <div data-testid="cart-items">
        {cart.map(item => (
          <div key={item.id} data-testid={`cart-item-${item.id}`}>
            {item.title} - Qty: {item.quantity}
          </div>
        ))}
      </div>
      <button 
        onClick={() => addToCart({ id: 1, title: 'Test Product', price: 29.99 })}
        data-testid="add-button"
      >
        Add Product
      </button>
      <button 
        onClick={() => removeFromCart(1)}
        data-testid="remove-button"
      >
        Remove Product
      </button>
    </div>
  );
};

const renderWithCartProvider = (component) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  );
};

describe('CartContext', () => {
  test('initializes with empty cart', () => {
    let cartState = null;
    
    renderWithCartProvider(
      <TestComponent 
        onCartChange={({ cart, cartCount }) => {
          cartState = { cart, cartCount };
        }}
      />
    );
    
    expect(cartState.cart).toEqual([]);
    expect(cartState.cartCount).toBe(0);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });

  test('addToCart adds a new product to cart', () => {
    renderWithCartProvider(<TestComponent />);
    
    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Test Product - Qty: 1');
  });

  test('addToCart increases quantity for existing product', () => {
    renderWithCartProvider(<TestComponent />);
    
    const addButton = screen.getByTestId('add-button');
    
    // Add product twice
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Test Product - Qty: 2');
  });

  test('removeFromCart decreases quantity for existing product', () => {
    renderWithCartProvider(<TestComponent />);
    
    const addButton = screen.getByTestId('add-button');
    const removeButton = screen.getByTestId('remove-button');
    
    // Add product twice
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    
    // Remove once
    fireEvent.click(removeButton);
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Test Product - Qty: 1');
  });

  test('removeFromCart removes product when quantity reaches zero', () => {
    renderWithCartProvider(<TestComponent />);
    
    const addButton = screen.getByTestId('add-button');
    const removeButton = screen.getByTestId('remove-button');
    
    // Add product once
    fireEvent.click(addButton);
    
    // Remove it
    fireEvent.click(removeButton);
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.queryByTestId('cart-item-1')).not.toBeInTheDocument();
  });

  test('cartCount calculates total quantity correctly', () => {
    let cartState = null;
    
    renderWithCartProvider(
      <TestComponent 
        onCartChange={({ cart, cartCount }) => {
          cartState = { cart, cartCount };
        }}
      />
    );
    
    const addButton = screen.getByTestId('add-button');
    
    // Add product multiple times
    fireEvent.click(addButton); // Qty: 1
    fireEvent.click(addButton); // Qty: 2
    fireEvent.click(addButton); // Qty: 3
    
    expect(cartState.cartCount).toBe(3);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('3');
  });

  test('handles multiple different products correctly', () => {
    const MultiProductTest = () => {
      const { cart, addToCart, cartCount } = useCart();
      
      return (
        <div>
          <div data-testid="cart-count">{cartCount}</div>
          <button 
            onClick={() => addToCart({ id: 1, title: 'Product 1', price: 29.99 })}
            data-testid="add-product-1"
          >
            Add Product 1
          </button>
          <button 
            onClick={() => addToCart({ id: 2, title: 'Product 2', price: 39.99 })}
            data-testid="add-product-2"
          >
            Add Product 2
          </button>
          <div data-testid="cart-items">
            {cart.map(item => (
              <div key={item.id} data-testid={`cart-item-${item.id}`}>
                {item.title} - Qty: {item.quantity}
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    renderWithCartProvider(<MultiProductTest />);
    
    const addProduct1Button = screen.getByTestId('add-product-1');
    const addProduct2Button = screen.getByTestId('add-product-2');
    
    // Add different products
    fireEvent.click(addProduct1Button);
    fireEvent.click(addProduct2Button);
    fireEvent.click(addProduct1Button); // Add Product 1 again
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('3');
    expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Product 1 - Qty: 2');
    expect(screen.getByTestId('cart-item-2')).toHaveTextContent('Product 2 - Qty: 1');
  });

  test('handles edge case of removing non-existent product', () => {
    renderWithCartProvider(<TestComponent />);
    
    const removeButton = screen.getByTestId('remove-button');
    
    // Try to remove a product that doesn't exist
    fireEvent.click(removeButton);
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.queryByTestId('cart-item-1')).not.toBeInTheDocument();
  });

  test('cart operations are synchronous and immediate', () => {
    let cartState = null;
    
    renderWithCartProvider(
      <TestComponent 
        onCartChange={({ cart, cartCount }) => {
          cartState = { cart, cartCount };
        }}
      />
    );
    
    const addButton = screen.getByTestId('add-button');
    
    // Add product and immediately check state
    fireEvent.click(addButton);
    
    expect(cartState.cart).toHaveLength(1);
    expect(cartState.cart[0].quantity).toBe(1);
    expect(cartState.cartCount).toBe(1);
  });

  test('cart state is isolated between different provider instances', () => {
    // Test that each CartProvider instance has its own isolated state
    const { unmount } = renderWithCartProvider(<TestComponent />);
    
    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    
    // Unmount and create a new provider instance
    unmount();
    
    // Create a new provider instance - should start with empty cart
    renderWithCartProvider(<TestComponent />);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });
}); 