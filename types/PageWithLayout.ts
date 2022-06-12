import React from 'react';
import type { NextPage } from 'next';

export type PageWithLayout<T> = NextPage<T> & { getLayout: (page: React.ReactNode) => React.ReactNode; };