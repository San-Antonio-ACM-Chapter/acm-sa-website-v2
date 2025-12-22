# Testing Guide

## Overview

This project uses Jest and React Testing Library for unit and integration testing.

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test File Structure

Tests are co-located with the components they test in `__tests__` directories:

```
src/
  app/
    __tests__/
      page.test.tsx
    components/
      __tests__/
        ComponentName.test.tsx
      ComponentName.tsx
```

## Writing Tests

### Basic Component Test

```typescript
import { render, screen } from '@testing-library/react'
import { YourComponent } from '../YourComponent'

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />)
    
    const element = screen.getByText(/expected text/i)
    expect(element).toBeInTheDocument()
  })
})
```

### Testing Three.js Components

Three.js components require special mocking since they use WebGL:

```typescript
// Mock the Canvas component
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="canvas-mock">{children}</div>
  ),
}))

// Mock drei helpers
jest.mock('@react-three/drei', () => ({
  PerformanceMonitor: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))
```

### Testing Client Components

For components using React hooks or browser APIs:

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('InteractiveComponent', () => {
  it('handles user interaction', async () => {
    const user = userEvent.setup()
    render(<InteractiveComponent />)
    
    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)
    
    expect(screen.getByText(/clicked/i)).toBeInTheDocument()
  })
})
```

## Best Practices

1. **Test behavior, not implementation** - Focus on what users see and interact with
2. **Use semantic queries** - Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Mock external dependencies** - Mock APIs, Three.js, and external libraries
4. **Keep tests focused** - One assertion per test when possible
5. **Use descriptive test names** - Describe what the test does in plain English

## Coverage Goals

- Aim for 80%+ coverage on utility functions
- Focus on critical user paths for components
- Don't chase 100% coverage at the expense of test quality

## Debugging Tests

```bash
# Run a specific test file
npm test -- ThreeWrapper.test.tsx

# Run tests matching a pattern
npm test -- --testNamePattern="renders correctly"

# Update snapshots
npm test -- -u
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about/)

