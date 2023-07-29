import { Header } from '@components';
import React, { useState } from 'react';
import HomeScreen from './HomeScreen';



export const Home = () => {
  const [stateCheckbox, setStateCheckbox] = useState<string[]>([]);


  return (
    <>
      <Header
        isCheckbox
        updateCheckbox={setStateCheckbox}
        valueCheckBox={stateCheckbox}
      />
      <HomeScreen  stateCheckbox={stateCheckbox}/>
    </>
  );
};
