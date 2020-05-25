import React, { useEffect, useContext } from 'react';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

import GoogleSheetsContext from '../contexts/GoogleSheetsContext';

function IndustryTotalPrizeMoneyAwarded() {
  const sheetsData = useContext(GoogleSheetsContext);

  useEffect(() => {
    // SETUP
    let svg = d3.select('svg'),
      margin = {
        top: 20,
        right: 20,
        bottom: 60,
        left: 75
      },
      x = d3.scaleBand().padding(0.4),
      y = d3.scaleLinear(),
      data = undefined;

    // GRADIENT
    const gradient = svg
      .append('svg:defs')
      .append('svg:linearGradient')
      .attr('id', 'gradient')
      .attr('gradientTransform', 'rotate(90)');
    gradient.append('stop').attr('stop-color', '#aa2568').attr('offset', '0%');
    gradient
      .append('stop')
      .attr('stop-color', '#ff3366')
      .attr('offset', '100%');

    let g = svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    g.append('g').attr('class', 'axis axis--x tick--small');
    g.append('g').attr('class', 'axis axis--y');

    // DRAW CHART
    function draw() {
      let bounds = svg.node().getBoundingClientRect(),
        width = bounds.width - margin.left - margin.right,
        height = bounds.height - margin.top - margin.bottom;

      x.rangeRound([0, width]);
      y.rangeRound([height, 0]);

      g.select('.axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x).tickSizeInner(5))
        .selectAll('text')
        .attr('transform', 'translate(-10,10)rotate(-45)')
        .style('text-anchor', 'end');
      g.select('.axis--y')
        .call(
          d3.axisLeft(y).tickFormat(d3.format('$~s')).tickSizeInner([-width])
        )
        .selectAll('text')
        .attr('dx', '-5');

      // Y AXIS LABEL
      g.select('.y-axis-label').remove();
      g.append('text')
        .attr('y', 0 - 60)
        .attr('x', 0 - height / 2)
        .attr('class', 'y-axis-label')
        .text('Pize Money');

      // TOOLTIP
      let tip = d3Tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
          return `<div class='title'>${
            d.year
          }</div><div>$${d3.format(',')(d.value)}</div>`;
        });
      g.call(tip);

      let bars = g.selectAll('.bar').data(data);

      // ENTER
      bars
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function (d) {
          return x(d.year);
        })
        .attr('y', function (d) {
          return y(d.value);
        })
        .attr('width', x.bandwidth())
        .attr('height', function (d) {
          return height - y(d.value);
        })
        .style('fill', 'url(#gradient)')
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

      // UPDATE
      bars
        .attr('x', function (d) {
          return x(d.year);
        })
        .attr('y', function (d) {
          return y(d.value);
        })
        .attr('width', x.bandwidth())
        .attr('height', function (d) {
          return height - y(d.value);
        });

      // EXIT
      bars.exit().remove();
    }

    // LOADING DATA
    function loadData() {
      data = sheetsData['industry|total-prize-money-awarded'].elements;

      x.domain(
        data.map(function (d) {
          return d.year;
        })
      );
      y.domain([
        0,
        d3.max(data, function (d) {
          return d.value;
        })
      ]);

      draw();
    }

    // START!
    loadData();
    window.addEventListener('resize', draw);
  }, [sheetsData]);

  return (
    <article className='screen screen--sub'>
      <h1 className='screen__heading'>
        HOW MUCH PRIZE MONEY HAS BEEN AWARDED?
      </h1>

      <ul className='screen__desc'>
        <li className='screen__desc__i'>
          From 2013 to 2016, the prize money awarded across all eSports games
          more than quadrupled ($21.4 million to $93.3 million).
        </li>
        <li className='screen__desc__i'>
          Projecting ahead to 2017, prize money could be set to breach the $150
          million mark, denoting an almost 100-fold increase from the 2003
          figure ($1.53 million).
        </li>
      </ul>

      <div className='screen__data-vis-wrap'>
        <div className='screen__data-vis-inner'>
          <svg id='chart'></svg>
        </div>
        <div className='chart-bottom-note'>Year</div>
      </div>
    </article>
  );
}

export default IndustryTotalPrizeMoneyAwarded;