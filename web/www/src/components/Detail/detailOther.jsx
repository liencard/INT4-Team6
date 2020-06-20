import React from 'react';
import Header from '../Header/index.jsx';
import styles from './Detail.module.css';
import { useParams } from 'react-router-dom';
import { useStore } from '../../hooks/useStore';

import { Timeline, Bookmark } from 'react-vertical-timeline';


const DetailOther = () => {
    const { id } = useParams();
    const { ancestorStore } = useStore();
    const ancestor = ancestorStore.getAncestorById(id);

    console.log(id);
    //console.log(ancestor);

  return (
    <>
      <Header
        logo={true}
        menu={true}
        togglePartners={true}
        content={{ name: 'Naam hier', partner: 'Partner naam' }}
      />

      {/* <Timeline
        height={300}
        progress={state.progress}
        onSelect={(p) => setState({ progress: p })}
      >
        <Bookmark progress={20} onSelect={(p) => setState({ progress: p })}>
          Hi there 20%
        </Bookmark>
        <Marker progress={33} /> 
        <Bookmark progress={55} onSelect={(p) => setState({ progress: p })}>
          Hi there 55%
        </Bookmark>
        <Bookmark progress={75} onSelect={(p) => setState({ progress: p })}>
          Hi there 75%
        </Bookmark>
      </Timeline> */}

      <p>Under construction</p>
    </>
  );
};

export default DetailOther;
