import React from 'react';
import { VictoryChart, VictoryArea, VictoryAxis } from 'victory';

const Graph = ({stepsWalkedList,timeList }) => {
  

  const data = timeList.map((time, index) => ({
    time,
    stepsWalked: stepsWalkedList[index]
  }));

  return (
    <div>
      <VictoryChart
        style={{
          parent: { color: '#c9e348' }
        }}
      >
        <VictoryAxis
          tickValues={timeList}
          style={{
            axis: { stroke: 'white' },
            tickLabels: { fill: 'white' }
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: 'white' },
            tickLabels: { fill: 'white' }
          }}
        />
        <VictoryArea
          data={data}
          x="time"
          y="stepsWalked"
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          style={{
            data: { fill: "#c9e348" }
          }}
          interpolation="natural"
        />
      </VictoryChart>
    </div>
  );
};

export default Graph;
