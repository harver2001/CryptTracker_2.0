import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import { HistoricalChart } from '../config/api';
import { createTheme, ThemeProvider, makeStyles, CircularProgress } from '@material-ui/core';
import { Classnames } from 'react-alice-carousel';
import { Line } from 'react-chartjs-2';
import SelectButton from "./SelectButton";
import {
  ArcElement,
  Chart as ChartJS,
  Title,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  LineElement,
  TooltipItem,
  TooltipModel,
  PointElement,
} from 'chart.js';

ChartJS.register(Title,LineElement,LinearScale,CategoryScale,PointElement,ArcElement, Tooltip, Legend);
const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setflag] = useState(false);
  const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ];
  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  // console.log(coin);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days,currency]);

  // // const fetchHistoricData = async () => {
  // //   const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
  // //   // setflag(true);
  // //   setHistoricData(data.prices);
  // // };

  // useEffect(() => {
  //   // fetchHistoricData();
  // },[currency,days]);

  // console.log("data", historicData);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark"
    },
  })
  // console.log(Date(1667743637624));
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>


<br></br>
<br></br>
<br></br>
{/* <br></br>
<br></br> */}

        {!historicData | flag === false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={150}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "turquoise",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;