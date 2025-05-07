import { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the types for our financial data
export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

export interface Budget {
  category: string;
  limit: number;
}

export interface FinanceState {
  income: number;
  expenses: Expense[];
  budgets: Budget[];
  categories: string[];
}

// Define the action types for our reducer
type FinanceAction =
  | { type: 'SET_INCOME'; payload: number }
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'UPDATE_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string }
  | { type: 'SET_BUDGET'; payload: Budget }
  | { type: 'RESET_INCOME' }
  | { type: 'RESET_EXPENSES' };

// Create the initial state
const initialCategories = [
  "Rent",
  "Bills",
  "Hobbies",
  "Groceries",
  "Public transportation",
  "Entertainment"
];

const initialState: FinanceState = {
  income: 0,
  expenses: [],
  budgets: initialCategories.map(category => ({ category, limit: 0 })),
  categories: initialCategories
};

// Create the reducer function
const financeReducer = (state: FinanceState, action: FinanceAction): FinanceState => {
  switch (action.type) {
    case 'SET_INCOME':
      return { ...state, income: action.payload };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense => 
          expense.id === action.payload.id ? action.payload : expense
        )
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload)
      };
    case 'SET_BUDGET':
      return {
        ...state,
        budgets: state.budgets.map(budget => 
          budget.category === action.payload.category ? action.payload : budget
        )
      };
    case 'RESET_INCOME':
      return { ...state, income: 0 };
    case 'RESET_EXPENSES':
      return { ...state, expenses: [] };
    default:
      return state;
  }
};

// Create the context
interface FinanceContextType {
  state: FinanceState;
  setIncome: (amount: number) => void;
  resetIncome: () => void;
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  setBudget: (budget: Budget) => void;
  resetExpenses: () => void;
  // Calculated values
  totalExpenses: number;
  categoryTotals: { [key: string]: number };
  remainingBudget: { [key: string]: number };
  savings: number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// Create the provider component
interface FinanceProviderProps {
  children: ReactNode;
}

export const FinanceProvider = ({ children }: FinanceProviderProps) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  // Action creators
  const setIncome = (amount: number) => {
    dispatch({ type: 'SET_INCOME', payload: amount });
  };

  const resetIncome = () => {
    dispatch({ type: 'RESET_INCOME' });
  };

  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
  };

  const updateExpense = (expense: Expense) => {
    dispatch({ type: 'UPDATE_EXPENSE', payload: expense });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  const setBudget = (budget: Budget) => {
    dispatch({ type: 'SET_BUDGET', payload: budget });
  };

  const resetExpenses = () => {
    dispatch({ type: 'RESET_EXPENSES' });
  };

  // Calculated values
  const totalExpenses = state.expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = state.categories.reduce((totals: { [key: string]: number }, category) => {
    totals[category] = state.expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return totals;
  }, {});

  const remainingBudget = state.budgets.reduce((remaining: { [key: string]: number }, budget) => {
    const spent = categoryTotals[budget.category] || 0;
    remaining[budget.category] = budget.limit - spent;
    return remaining;
  }, {});

  const savings = state.income - totalExpenses;

  const value = {
    state,
    setIncome,
    resetIncome,
    addExpense,
    updateExpense,
    deleteExpense,
    setBudget,
    resetExpenses,
    totalExpenses,
    categoryTotals,
    remainingBudget,
    savings
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

// Create a custom hook for using the context
export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}; 