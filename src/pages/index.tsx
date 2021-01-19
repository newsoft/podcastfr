import React, { ReactElement } from 'react';

import Layout from '../components/layout';
import Podcast from '../components/podcast';
import JSONPodcasts from '../../content/podcasts.json';
import { PodcastExtra } from '../types';

// reference:
// https://stackoverflow.com/a/2450976/1985560

function shuffle(array: PodcastExtra[]) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default (): ReactElement => (
  <Layout>
    <ul className="grid gap-6 grid-cols-1">
      {shuffle(JSONPodcasts).map((data) => {
        return (
          <li>
            <Podcast key={`${data.yamlDescriptionFile}`} podcast={data} />
          </li>
        );
      })}
    </ul>
  </Layout>
);
