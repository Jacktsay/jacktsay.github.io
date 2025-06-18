import matplotlib
import matplotlib.pyplot as plt
from matplotlib.font_manager import fontManager
import pandas as pd
import numpy as np

# use table_evaluator for evaluation
from table_evaluator import TableEvaluator

# Load or create sample data (you'll need to replace this with your actual data)
# Example: Load from CSV files
try:
    # Try to load your actual data files
    real_data = pd.read_csv('real_data.csv')  # Replace with your actual file path
    sampled_data = pd.read_csv('sampled_data.csv')  # Replace with your actual file path
    
    # Define loan_metadata with discrete columns
    loan_metadata = type('LoanMetadata', (), {
        'discrete_columns': ['column1', 'column2']  # Replace with your actual discrete column names
    })()
    
except FileNotFoundError:
    # Create sample data for demonstration
    print("Sample data files not found. Creating sample data for demonstration...")
    
    # Create sample real data
    np.random.seed(42)
    real_data = pd.DataFrame({
        'feature1': np.random.normal(0, 1, 1000),
        'feature2': np.random.normal(5, 2, 1000),
        'feature3': np.random.choice(['A', 'B', 'C'], 1000),
        'feature4': np.random.choice([0, 1], 1000)
    })
    
    # Create sample synthetic data
    sampled_data = pd.DataFrame({
        'feature1': np.random.normal(0, 1, 1000),
        'feature2': np.random.normal(5, 2, 1000),
        'feature3': np.random.choice(['A', 'B', 'C'], 1000),
        'feature4': np.random.choice([0, 1], 1000)
    })
    
    # Define metadata for discrete columns
    loan_metadata = type('LoanMetadata', (), {
        'discrete_columns': ['feature3', 'feature4']  # Categorical columns
    })()

# Now create the TableEvaluator with the data
table_evaluator = TableEvaluator(
    real_data[list(set(real_data.columns) - set(loan_metadata.discrete_columns))],
    sampled_data[list(set(real_data.columns) - set(loan_metadata.discrete_columns))])
table_evaluator.plot_mean_std() 