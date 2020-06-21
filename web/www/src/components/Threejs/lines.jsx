import React from 'react';
import Line from '../Threejs/line.jsx';

const Lines = () => {
  return (
    <>
        {/* GEORGE */}
        <Line points={[[0, 0, 21], [-1.5, 0, 20], [-2, 0, 18]]} />
          <Line points={[[-2, 0, 18], [-4.2, 0, 16.5], [-5, 0, 15]]} /> {/* to benjamin */ }
            <Line points={[[-5, 0, 15], [-8, 0, 13.5], [-9, 0, 12]]} /> {/* to gabriel */}
              <Line points={[[-9, 0, 12], [-9.9, 0, 10.5], [-10, 0, 9]]} /> {/* to raymond */ }
                <Line points={[[-10, 0, 9], [-10.9, 0, 7.5], [-11, 0, 6]]} /> {/* to henry */}
                  <Line points={[[-11, 0, 6], [-11.9, 0, 4.5], [-12, 0, 3]]} /> {/* to marcus */}
                  <Line points={[[-11, 0, 6], [-10.1, 0, 4.5], [-10, 0, 3]]} /> {/* to mary */}
              <Line points={[[-9, 0, 12], [-8.1, 0, 10.5], [-8, 0, 9]]} /> {/* to amanda */ }
            <Line points={[[-5, 0, 15], [-5.2, 0, 13.5], [-7, 0, 12]]} /> {/* to lisa */}
          <Line points={[[-2, 0, 18], [-2.1, 0, 16.5], [-3, 0, 15]]} /> {/* to camille */ }
            <Line points={[[-3, 0, 15], [-3.45, 0, 13.5], [-3.5, 0, 12]]} /> {/* to jacob */}
            <Line points={[[-3, 0, 15], [-1.7, 0, 13.5], [-1.5, 0, 12]]} /> {/* to elisa */}

        {/* ELIZABETH */}
        <Line points={[[0, 0, 21], [1.5, 0, 20], [2, 0, 18]]} />
          <Line points={[[2, 0, 18], [2.1, 0, 16.5], [3, 0, 15]]} /> {/* to frederic */}
            <Line points={[[3, 0, 15], [1.7, 0, 13.5], [1.5, 0, 12]]} /> {/* to steve */}
            <Line points={[[3, 0, 15], [3.45, 0, 13.5], [3.5, 0, 12]]} /> {/* to sara */}
          <Line points={[[2, 0, 18], [4.2, 0, 16.5], [5, 0, 15]]} /> {/* to mathilde */}
            <Line points={[[5, 0, 15], [5.2, 0, 13.5], [7, 0, 12]]} /> {/* to jacob */}
              <Line points={[[7, 0, 12], [6.1, 0, 10.5], [6, 0, 9]]} /> {/* to samuel */}
                <Line points={[[6, 0, 9], [5.1, 0, 7.5], [5, 0, 6]]} /> {/* to richard */}
                  <Line points={[[5, 0, 6], [4.1, 0, 4.5], [4, 0, 3]]} /> {/* to steven */}
                  <Line points={[[5, 0, 6], [5.9, 0, 4.5], [6, 0, 3]]} /> { /* to alice */}
                <Line points={[[6, 0, 9], [6.9, 0, 7.5], [7, 0, 6]]} /> {/* to margaret */}
                  <Line points={[[7, 0, 6], [8.8, 0, 4.5], [9, 0, 3]]} /> {/* to james */}
              <Line points={[[7, 0, 12], [7.9, 0, 10.5], [8, 0, 9]]} /> {/* to elizabeth */}
            <Line points={[[5, 0, 15], [8, 0, 13.5], [9, 0, 12]]} /> {/* to patricia */}
              <Line points={[[9, 0, 12], [10.5, 0, 10.5], [11, 0, 9]]} /> {/* to william */}
    </>
  );
};

export default Lines;
