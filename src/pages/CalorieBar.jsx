import React from 'react';
import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory';

const CalorieBar = ({ caloriesBurnt }) => {
  const goalCalories = 3500;

  const calculatePercentage = () => {
    return (caloriesBurnt / goalCalories) * 100;
  };

  const percentage = calculatePercentage();

  return (
    <div>
      <svg viewBox="0 0 400 400">
        <VictoryPie
          standalone={false}
          width={400}
          height={400}
          data={[
            { x: 1, y: percentage },
            { x: 2, y: 100 - percentage },
          ]}
          innerRadius={120}
          cornerRadius={10}
          labels={() => null}
          animate={{ duration: 1000 }}
          style={{
            data: {
              fill: ({ datum }) => {
                const color = datum.x === 1 ? '#F05E16' : '#ECECEC';
                return datum.y === 0 ? 'transparent' : color;
              },
            },
          }}
        />
        <VictoryAnimation duration={1000} data={{ percentage }}>
          {(newProps) => (
            <VictoryLabel className='VICTORY_LABEL'
              textAnchor="middle"
              verticalAnchor="middle"
              x={200}
              y={200}
              text={`${Math.round(newProps.percentage)}%`}
              style={{
                fontSize: 45,
                fontWeight: 'bold',
                fill: 'white',
              }}
            />
          )}
        </VictoryAnimation>
      </svg>
    </div>
  );
};

export default CalorieBar;
