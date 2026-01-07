"""
Monte Carlo Simulation Engine
Runs thousands of simulations based on historical data statistics
"""

import numpy as np
import pandas as pd
from typing import List, Dict


class MonteCarloSimulator:
    """Monte Carlo simulation engine for portfolio projections"""
    
    def __init__(self):
        self.results_cache = {}
    
    def run_simulation(
        self,
        historical_data: pd.DataFrame,
        initial_investment: float = 10000,
        num_simulations: int = 1000,
        years: int = 5,
        strategy: str = "buy_hold"
    ) -> Dict:
        """
        Run Monte Carlo simulation based on historical data
        
        Args:
            historical_data: Historical price data
            initial_investment: Starting capital
            num_simulations: Number of simulation paths
            years: Projection period in years
            strategy: Strategy type (buy_hold, dca, etc.)
        
        Returns:
            Dictionary with simulation results and statistics
        """
        
        # Calculate historical statistics
        returns = historical_data['Returns'].dropna()
        mu = returns.mean()  # Daily expected return
        sigma = returns.std()  # Daily volatility
        
        print(f"Historical Stats - Mean: {mu:.6f}, Std: {sigma:.6f}")
        
        # Number of trading days
        days = int(years * 252)
        
        # Run simulations
        all_simulations = self._geometric_brownian_motion(
            initial_value=initial_investment,
            mu=mu,
            sigma=sigma,
            days=days,
            num_sims=num_simulations
        )
        
        # Calculate statistics
        statistics = self._calculate_simulation_statistics(
            all_simulations,
            initial_investment
        )
        
        # Get sample paths for visualization
        sample_paths = self._get_sample_paths(all_simulations, num_samples=10)
        
        return {
            "statistics": statistics,
            "sample_paths": sample_paths,
            "num_simulations": num_simulations,
            "parameters": {
                "mu": float(mu),
                "sigma": float(sigma),
                "days": days,
                "initial_investment": initial_investment
            }
        }
    
    def _geometric_brownian_motion(
        self,
        initial_value: float,
        mu: float,
        sigma: float,
        days: int,
        num_sims: int
    ) -> np.ndarray:
        """
        Simulate asset price paths using Geometric Brownian Motion
        
        Formula: S(t+1) = S(t) * exp((mu - 0.5*sigma^2)*dt + sigma*sqrt(dt)*Z)
        where Z ~ N(0,1)
        
        Args:
            initial_value: Starting price/value
            mu: Expected daily return (drift)
            sigma: Daily volatility
            days: Number of days to simulate
            num_sims: Number of simulation paths
        
        Returns:
            Array of shape (days, num_sims) with simulated paths
        """
        
        dt = 1  # Daily time step
        
        # Pre-allocate results array
        simulations = np.zeros((days, num_sims))
        simulations[0] = initial_value
        
        # Generate all random numbers at once (more efficient)
        random_shocks = np.random.normal(0, 1, size=(days-1, num_sims))
        
        # Calculate drift and diffusion components
        drift = (mu - 0.5 * sigma**2) * dt
        diffusion = sigma * np.sqrt(dt)
        
        # Simulate all paths
        for t in range(1, days):
            simulations[t] = simulations[t-1] * np.exp(
                drift + diffusion * random_shocks[t-1]
            )
        
        return simulations
    
    def _calculate_simulation_statistics(
        self,
        simulations: np.ndarray,
        initial_investment: float
    ) -> Dict:
        """
        Calculate statistics from simulation results
        
        Args:
            simulations: Array of simulation paths
            initial_investment: Starting value
        
        Returns:
            Dictionary of statistics
        """
        
        # Final values from all simulations
        final_values = simulations[-1, :]
        
        # Calculate percentiles
        percentiles = {
            "p5": float(np.percentile(final_values, 5)),
            "p25": float(np.percentile(final_values, 25)),
            "p50": float(np.percentile(final_values, 50)),  # Median
            "p75": float(np.percentile(final_values, 75)),
            "p95": float(np.percentile(final_values, 95))
        }
        
        # Basic statistics
        mean = float(np.mean(final_values))
        std = float(np.std(final_values))
        min_val = float(np.min(final_values))
        max_val = float(np.max(final_values))
        
        # ROI statistics
        roi = ((final_values - initial_investment) / initial_investment) * 100
        mean_roi = float(np.mean(roi))
        median_roi = float(np.median(roi))
        
        # Probability of profit
        prob_profit = float(np.sum(final_values > initial_investment) / len(final_values) * 100)
        
        # Risk metrics
        # Sharpe ratio approximation (annualized)
        returns = (final_values - initial_investment) / initial_investment
        sharpe = float(np.mean(returns) / np.std(returns) * np.sqrt(252))
        
        # Maximum drawdown (average across simulations)
        max_drawdowns = []
        for i in range(simulations.shape[1]):
            path = simulations[:, i]
            running_max = np.maximum.accumulate(path)
            drawdown = (path - running_max) / running_max
            max_drawdowns.append(np.min(drawdown))
        
        avg_max_drawdown = float(np.mean(max_drawdowns))
        
        return {
            "mean": mean,
            "median": percentiles["p50"],
            "std": std,
            "min": min_val,
            "max": max_val,
            "percentiles": percentiles,
            "mean_roi": mean_roi,
            "median_roi": median_roi,
            "probability_of_profit": prob_profit,
            "sharpe_ratio": sharpe,
            "avg_max_drawdown": avg_max_drawdown,
            "initial_investment": initial_investment
        }
    
    def _get_sample_paths(
        self,
        simulations: np.ndarray,
        num_samples: int = 10
    ) -> List[Dict]:
        """
        Extract sample paths for visualization
        
        Args:
            simulations: Full simulation array
            num_samples: Number of paths to extract
        
        Returns:
            List of dictionaries with path data
        """
        
        # Randomly select sample paths
        total_sims = simulations.shape[1]
        if num_samples > total_sims:
            num_samples = total_sims
        
        sample_indices = np.random.choice(total_sims, num_samples, replace=False)
        
        # Extract paths (sample every 21 days for monthly data)
        paths = []
        days = simulations.shape[0]
        
        for day in range(0, days, 21):  # Monthly sampling
            path_dict = {"day": day, "month": day // 21}
            
            for idx, sim_idx in enumerate(sample_indices):
                path_dict[f"path_{idx}"] = float(simulations[day, sim_idx])
            
            paths.append(path_dict)
        
        return paths