import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../context/ThemeContext";
import { FaArrowUpLong } from "react-icons/fa6";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import "./AreaCharts.scss";

const data = [
  {
    month: "Jan",
    distribué: 30,
    'centre de tri': 20,
    distribution: 10,
    'agence postale': 100,
  },
  {
    month: "Feb",
    distribué: 25,
    'centre de tri': 15,
    distribution: 10,
    'agence postale': 85,
  },
  {
    month: "Mar",
    distribué: 35,
    'centre de tri': 25,
    distribution: 15,
    'agence postale': 90,
  },
  {
    month: "Apr",
    distribué: 40,
    'centre de tri': 30,
    distribution: 20,
    'agence postale': 70,
  },
  {
    month: "May",
    distribué: 45,
    'centre de tri': 35,
    distribution: 25,
    'agence postale': 80,
  },
  {
    month: "Jun",
    distribué: 50,
    'centre de tri': 40,
    distribution: 30,
    'agence postale': 50,
  },
  {
    month: "Jul",
    distribué: 55,
    'centre de tri': 45,
    distribution: 35,
    'agence postale': 75,
  },
  {
    month: "Aug",
    distribué: 60,
    'centre de tri': 50,
    distribution: 40,
    'agence postale': 86,
  },
  {
    month: "Sep",
    distribué: 65,
    'centre de tri': 55,
    distribution: 45,
    'agence postale': 78,
  },
  {
    month: "Oct",
    distribué: 70,
    'centre de tri': 60,
    distribution: 50,
    'agence postale': 60,
  },
  {
    month: "Nov",
    distribué: 75,
    'centre de tri': 65,
    distribution: 55,
    'agence postale': 70,
  },
  {
    month: "Dec",
    distribué: 80,
    'centre de tri': 70,
    distribution: 60,
    'agence postale': 80,
  },
];

const AreaBarChart = () => {
  const { theme } = useContext(ThemeContext);

  const formatTooltipValue = (value) => {
    return `${value}k`;
  };

  const formatYAxisLabel = (value) => {
    return `${value}k`;
  };

  const formatLegendValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="bar-chart">
      <div className="bar-chart-info">
        <h5 className="bar-chart-title">Vue d'ensemble</h5>
        <div className="chart-info-data">
          <div className="info-data-value">50.4K</div>
          <div className="info-data-text">
            <FaArrowUpLong />
            <p>5% de plus depuis le mois dernier.</p>
          </div>
        </div>
      </div>
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              padding={{ left: 10 }}
              dataKey="month"
              tickSize={0}
              axisLine={false}
              tick={{
                fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
                fontSize: 14,
              }}
            />
            <YAxis
              padding={{ bottom: 10, top: 10 }}
              tickFormatter={formatYAxisLabel}
              tickCount={6}
              axisLine={false}
              tickSize={0}
              tick={{
                fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
              }}
            />
            <Tooltip
              formatter={formatTooltipValue}
              cursor={{ fill: "transparent" }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              verticalAlign="top"
              align="right"
              formatter={formatLegendValue}
            />
            <Bar
              dataKey="distribué"
              fill="var(--primary-color)"
              activeBar={false}
              isAnimationActive={false}
              barSize={10}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey='centre de tri'
              fill="#e3e7fc"
              activeBar={false}
              isAnimationActive={false}
              barSize={10}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey="distribution"
              fill="#ffcccb"
              activeBar={false}
              isAnimationActive={false}
              barSize={10}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey="agence postale"
              fill="#fef102"
              activeBar={false}
              isAnimationActive={false}
              barSize={10}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaBarChart;
