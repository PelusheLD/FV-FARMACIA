import { useState, useEffect } from 'react';

interface DollarRateData {
  fuente: string;
  nombre: string;
  compra: number;
  venta: number;
  promedio: number;
  fechaActualizacion: string;
}

interface DolarVzlaResponse {
  current: {
    usd: number;
    eur: number;
    date: string;
  };
}

export const useDollarRate = () => {
  const [dollarRate, setDollarRate] = useState<DollarRateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDollarRate = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://api.dolarvzla.com/public/exchange-rate');
      
      if (!response.ok) {
        throw new Error('Error al obtener la tasa del dólar');
      }
      
      const data: DolarVzlaResponse = await response.json();
      
      // Convertir el formato de la nueva API al formato esperado por el componente
      const usdRate = data.current.usd;
      const rateData: DollarRateData = {
        fuente: 'DolarVzla',
        nombre: 'Tasa Oficial',
        compra: usdRate,
        venta: usdRate,
        promedio: usdRate,
        fechaActualizacion: data.current.date
      };
      
      setDollarRate(rateData);
      
    } catch (err) {
      setError('No se pudo obtener la tasa del dólar');
      console.error('Error fetching dollar rate:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDollarRate();
    
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchDollarRate, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const convertToBolivares = (usdAmount: number): number => {
    if (!dollarRate) return 0;
    return usdAmount * dollarRate.promedio;
  };

  const formatCurrency = (amount: number, currency: 'USD' | 'BS' = 'USD') => {
    if (currency === 'BS') {
      return new Intl.NumberFormat('es-VE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    }
    
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return {
    dollarRate,
    loading,
    error,
    convertToBolivares,
    formatCurrency,
    refetch: fetchDollarRate
  };
};





