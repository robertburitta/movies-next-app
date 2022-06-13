import React from 'react';
import type { NextPage } from 'next';

export type PageWithLayout = NextPage & { getLayout: (page: React.ReactNode) => React.ReactNode; };