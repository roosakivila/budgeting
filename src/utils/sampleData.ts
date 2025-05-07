import { useFinance } from "../context/FinanceContext";

export const useSampleData = () => {
  const { addExpense, setIncome, setBudget, state } = useFinance();

  // Add sample income
  const addSampleIncome = () => {
    setIncome(3000); // Monthly income
    console.log("Sample income added: 3000");
  };

  // Add sample budget
  const addSampleBudgets = () => {
    state.categories.forEach((category) => {
      let budgetLimit = 0;
      
      // Set different limits for different categories
      switch (category) {
        case "Rent":
          budgetLimit = 1000;
          break;
        case "Bills":
          budgetLimit = 300;
          break;
        case "Groceries":
          budgetLimit = 400;
          break;
        case "Hobbies":
          budgetLimit = 200;
          break;
        case "Public transportation":
          budgetLimit = 100;
          break;
        case "Entertainment":
          budgetLimit = 150;
          break;
        default:
          budgetLimit = 100;
      }
      
      setBudget({ category, limit: budgetLimit });
      console.log(`Budget set for ${category}: ${budgetLimit}`);
    });
  };

  // Generate a random date within the last 30 days
  const getRandomDate = (daysOffset = 0) => {
    const today = new Date();
    const randomDays = Math.floor(Math.random() * 30) + daysOffset;
    const date = new Date(today);
    date.setDate(today.getDate() - randomDays);
    return date;
  };

  // Add sample expenses
  const addSampleExpenses = () => {
    // Clear any existing expenses first to avoid duplicates
    console.log("Adding sample expenses...");
    
    // Create expenses with different dates for better data visualization
    const sampleExpenses = [
      { amount: 1000, category: "Rent", date: getRandomDate(1) },
      { amount: 120, category: "Bills", date: getRandomDate(3) },
      { amount: 80, category: "Groceries", date: getRandomDate(7) },
      { amount: 120, category: "Groceries", date: getRandomDate(14) },
      { amount: 50, category: "Entertainment", date: getRandomDate(5) },
      { amount: 80, category: "Hobbies", date: getRandomDate(10) },
      { amount: 20, category: "Public transportation", date: getRandomDate(2) }
    ];

    // Add the expenses one by one with a delay to ensure proper processing
    sampleExpenses.forEach((expense) => {
      // We don't need to pass the date as the addExpense function adds the current date
      // The FinanceContext will handle the date and ID generation
      addExpense({
        amount: expense.amount,
        category: expense.category
      });
      console.log(`Sample expense added: ${expense.amount} for ${expense.category}`);
    });
  };

  // Initialize with all sample data
  const initializeWithSampleData = () => {
    addSampleIncome();
    addSampleBudgets();
    addSampleExpenses();
    console.log("App initialized with sample data");
  };

  return {
    addSampleIncome,
    addSampleBudgets,
    addSampleExpenses,
    initializeWithSampleData
  };
}; 