import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AreaCard from './AreaCard';
import './AreaCards.scss';

const getBaseUrl = () => {
  const { hostname, protocol } = window.location;
  return `${protocol}//${hostname}:8081/`; // Assuming backend is always on port 8081
};

const API_URL = getBaseUrl();

const AreaCards = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [triData, setTriData] = useState([]);
  const [triEnv, setTriEnv] = useState([]);
  const [triDist, setTriDist] = useState([]);
  const [distribued,setDistribued] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const defaultDeliveryTimeData = {
    totalLetters: 1000,
    depositOffice: 300,
    triOffice: 200,
    distributionOffice: 400,
    distributedLetters: 100
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}histenvoi`);
        const data = response.data;

        setHistoricalData(data);
        setTriEnv(data.filter(item => item.HIst_evenement === 'EMA' || item.HIst_evenement === 'EMB' || item.HIst_evenement === 'EMC'));
        setTriData(data.filter(item => item.HIst_evenement === 'EMD' || item.HIst_evenement === 'EMF' || item.HIst_evenement === 'EMH'));
        setTriDist(data.filter(item => item.HIst_evenement === 'EMG' || item.HIst_evenement === 'EMH'));
        setDistribued(data.filter(item => item.HIst_evenement === 'EMI'));
        setTotalDataCount(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="content-area-cards">
       <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        cardInfo={{
          title: "Nombre d'envois",
          value: totalDataCount.length,
          text: "nombre de colis total"
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "var(--primary-color)"]}
        percentFillValue={(triEnv.length / historicalData.length) * 100}
        cardInfo={{
          title: "Agence postale",
          value: triEnv.length,
          text:"nombre de colis à l'agence postale"
           }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={(triData.length / historicalData.length) * 100}
        cardInfo={{
          title: "centre de tri",
          value: triData.length,
          text: "nombre de colis au centre de tri"
                }}
      />
      <AreaCard
        colors={["#e4e8ef", "#e3001f"]}
        percentFillValue={(triDist.length / historicalData.length) * 100}
        cardInfo={{
          title: "Centre de distribution",
          value: triDist.length,
          text: "nombre de colis au centre de distribution",
        }}
      />
             <AreaCard
        colors={["#e4e8ef", "var(--yellow-color)"]}
        percentFillValue={(distribued.length / historicalData.length) * 100}
        cardInfo={{
          title: "distribués",
          value: distribued.length,
          text: "nombre de colis distribués"
        }}
      />
       <AreaCard
  colors={["#e4e8ef", "purple"]}
  cardInfo={{
    title: "Moyenne",
    value: "14 heures",
    text: "Temps de livraison moyen"
  }}
/>

    </section>
  );
};

export default AreaCards;
