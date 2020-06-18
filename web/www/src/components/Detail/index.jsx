import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../hooks/useStore';
import { useObserver } from 'mobx-react-lite';
//import styles from './Detail.module.css';

import DetailOne from './detailOne.jsx';
import DetailTwo from './detailTwo.jsx';
import DetailThree from './detailThree.jsx';
import DetailOther from './detailOther.jsx';

const Detail = () => {

  const { id } = useParams();
  const { ancestorStore } = useStore();
  const ancestor = ancestorStore.getAncestorById(id);
  
  console.log(id);
  console.log(ancestor)

  return useObserver(() => (
    <>

      {(() => {
        if (id === '23') { // Margaret
          return <DetailOne />;
        } else if (id === '25'){ // Mary
          return <DetailTwo />;
        } else if (id === '4'){ // Benjamin
          return <DetailThree />;
        } else {
          return <DetailOther />;
        }
      })()}
    </>
  ));
};

export default Detail;
