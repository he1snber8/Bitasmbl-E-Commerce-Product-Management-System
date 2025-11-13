// Dashboard skeleton using hooks
import React from 'react';
import { useQuery, useSubscription, gql } from '@apollo/client';
const PRODUCTS = gql`query Products($categoryId: ID){ products(categoryId: $categoryId){ id name price } }`;
const PRODUCT_UPDATED = gql`subscription{ productUpdated { id name price } }`;
export default function Dashboard(){ /* useQuery(PRODUCTS), useSubscription(PRODUCT_UPDATED), render list, filters and stats */ return null; }