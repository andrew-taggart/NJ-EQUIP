export function calculateEnergyBurden(userData, stateAverageEB = 2.11) {
  // Inputs:
  // Ee = annual household electricity consumption (kWh)
  // Re = electricity rate ($/kWh)
  // Eh = annual heating (therm/BTU)
  // Rh = heating rate ($/therm)
  // Mi = median household income ($/year)

  const Ee = Number(userData.Ee);
  const Re = Number(userData.Re);
  const Eh = Number(userData.Eh);
  const Rh = Number(userData.Rh);
  const Mi = Number(userData.Mi);

  if (![Ee, Re, Eh, Rh, Mi].every(Number.isFinite)) {
    return { energyBurdenPercent: null, message: "Please enter valid numbers.", display: null };
  }
  if (Ee <= 0 || Re <= 0 || Eh < 0 || Rh <= 0 || Mi <= 0) {
    return { energyBurdenPercent: null, message: "Please enter positive values (heating can be 0).", display: null };
  }

  const electricityCost = Ee * Re;
  const heatingCost = Eh * Rh;
  const totalCost = electricityCost + heatingCost;

  const EB = (totalCost / Mi) * 100;

  const over = EB > stateAverageEB;

  return {
    energyBurdenPercent: `${EB.toFixed(2)}%`,
    message: over ? "Overburdened" : "Below State Average",
    display: over ? "[Tips to lower energy burden](#tips)" : null,
    breakdown: {
      electricityCost,
      heatingCost,
      totalCost
    }
  };
}
