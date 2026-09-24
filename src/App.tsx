/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WeddingProvider } from './context/WeddingContext';
import { PublicWeddingPage } from './components/public/PublicWeddingPage';

export default function App() {
  return (
    <WeddingProvider>
      <PublicWeddingPage />
    </WeddingProvider>
  );
}
