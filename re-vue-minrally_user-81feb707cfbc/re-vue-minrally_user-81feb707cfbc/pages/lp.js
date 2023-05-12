/* eslint-disable import/no-unresolved */
import LayoutLandingPage from 'layouts/landing-page';
import React from 'react'
import LandingPageComponent from '@components/LandingPage'

const LandingPage = () => {
  return (
    <LandingPageComponent />
  )
}
LandingPage.layout = LayoutLandingPage;

export default LandingPage