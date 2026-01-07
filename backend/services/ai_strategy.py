"""
AI Strategy Generator
UPDATED: No Anthropic API needed - uses default strategies
"""

import anthropic
from typing import Optional


class AIStrategyGenerator:
    """Generate trading strategies - NO API COSTS!"""
    
    def __init__(self, api_key: str):
        """
        Initialize (API key not used anymore)
        """
        print("AI Strategy Generator initialized (API disabled - using templates)")
        self.client = None  # Don't create client to avoid costs
    
    async def generate_strategy(
        self,
        description: str,
        ticker: str
    ) -> str:
        """
        Generate strategy code - NO API NEEDED!
        Always returns default strategy to avoid costs
        
        Args:
            description: Strategy description (not used)
            ticker: Asset ticker
        
        Returns:
            Default strategy code
        """
        print(f"Using default strategy (API disabled to avoid costs)")
        return self._get_default_strategy(description, ticker)
    
    def _get_default_strategy(self, description: str, ticker: str) -> str:
        """
        Return a default buy-and-hold strategy
        
        Args:
            description: Strategy description (for comment)
            ticker: Ticker symbol
        
        Returns:
            Default strategy code
        """
        
        return f'''"""
Trading Strategy for {ticker}
Description: {description}

This is a simple buy-and-hold strategy.
For custom AI-generated strategies, upgrade to Pro!
"""

import pandas as pd
import numpy as np


def strategy(df: pd.DataFrame) -> pd.Series:
    """
    Simple buy-and-hold strategy
    
    Args:
        df: DataFrame with OHLCV data (columns: Open, High, Low, Close, Volume)
    
    Returns:
        Series of trading signals (1 = long, 0 = neutral, -1 = short)
    """
    # Buy and hold - always long
    signals = pd.Series(1, index=df.index)
    
    return signals


def calculate_returns(df: pd.DataFrame, signals: pd.Series) -> pd.Series:
    """
    Calculate strategy returns
    
    Args:
        df: DataFrame with price data
        signals: Trading signals
    
    Returns:
        Series of strategy returns
    """
    # Calculate daily returns
    returns = df['Close'].pct_change()
    
    # Apply signals (shifted by 1 to avoid look-ahead bias)
    strategy_returns = signals.shift(1) * returns
    
    return strategy_returns


def backtest(df: pd.DataFrame, initial_capital: float = 10000) -> dict:
    """
    Run backtest on strategy
    
    Args:
        df: DataFrame with OHLCV data
        initial_capital: Starting capital
    
    Returns:
        Dictionary with backtest results
    """
    signals = strategy(df)
    returns = calculate_returns(df, signals)
    
    # Calculate cumulative returns
    cumulative_returns = (1 + returns).cumprod()
    final_value = initial_capital * cumulative_returns.iloc[-1]
    
    # Calculate metrics
    total_return = (final_value - initial_capital) / initial_capital * 100
    sharpe_ratio = returns.mean() / returns.std() * np.sqrt(252) if returns.std() > 0 else 0
    
    return {{
        "final_value": final_value,
        "total_return": total_return,
        "sharpe_ratio": sharpe_ratio,
        "signals": signals
    }}
'''