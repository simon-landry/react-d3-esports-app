import React, { useEffect, useContext } from 'react';
import _ from 'lodash';

import VisualizationContext from '../contexts/VisualizationContext';
import TranslationContext from '../contexts/TranslationContext';

function IndustryEsportsViewership() {
  const vizData = useContext(VisualizationContext);
  const t = useContext(TranslationContext);
  const pageData = t.data;

  const tableData = vizData['leaderboards|top-female-players'].elements;

  const countries = _.sortBy(_.uniqBy(tableData, 'country'), 'country').map(
    row => row.country
  );
  const games = _.sortBy(_.uniqBy(tableData, 'main-game'), 'main-game').map(
    row => row['main-game']
  );

  useEffect(() => {
    // Todo: table sorting/filtering
    window.tableFunctionality();
  }, []);

  return (
    <article className='screen screen--sub'>
      <h1 className='screen__heading'>{pageData.cat2_sub6_title}</h1>

      <ul className='screen__desc'>
        <li className='screen__desc__i'>{pageData.cat2_sub6_desc1}</li>
        <li className='screen__desc__i'>{pageData.cat2_sub6_desc2}</li>
      </ul>

      <div className='table-data table-data--7-col'>
        <div className='table-filters'>
          <select className='table-filter'>
            <option value=''>{pageData.cat2_sub6_txt1}</option>
            {countries.map((name, index) => (
              <option value={name} key={index}>
                {name}
              </option>
            ))}
          </select>

          <select className='table-filter'>
            <option value=''>{pageData.cat2_sub6_txt2}</option>
            {games.map((name, index) => (
              <option value={name} key={index}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className='table-wrap'>
          <div className='table-inner'>
            <div className='table__head'>
              <div className='table__th'>{pageData.cat2_sub6_txt3}</div>
              <div className='table__th'>{pageData.cat2_sub6_txt4}</div>
              <div className='table__th'>{pageData.cat2_sub6_txt5}</div>
              <div className='table__th'>{pageData.cat2_sub6_txt6}</div>
              <div className='table__th'>{pageData.cat2_sub6_txt7}</div>
              <div className='table__th'>{pageData.cat2_sub6_txt8}</div>
              <div className='table__th'>{pageData.cat2_sub6_txt9}</div>
            </div>
            <div className='table__body'>
              {tableData.map((row, index) => (
                <div className='table__row' key={index}>
                  <div className='table__td'>{row['rank']}</div>
                  <div className='table__td'>{row['country']}</div>
                  <div className='table__td'>{row['player-id']}</div>
                  <div className='table__td'>{row['player-name']}</div>
                  <div className='table__td'>{row['total-winnings']}</div>
                  <div className='table__td'>{row['main-game']}</div>
                  <div className='table__td'>{row['main-winnings']}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default IndustryEsportsViewership;
