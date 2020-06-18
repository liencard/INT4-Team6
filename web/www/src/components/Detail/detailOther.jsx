import React from 'react';
import Header from '../Header/index.jsx';
import styles from './Detail.module.css';
import { useParams } from 'react-router-dom';
import { useStore } from '../../hooks/useStore';

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

    <p>Under construction</p>
    </>
  );
};

export default DetailOther;
