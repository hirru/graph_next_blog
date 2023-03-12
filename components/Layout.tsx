import React, { Children } from 'react'
import { Header } from './'

interface LayoutProps {
    children: any
}

function Layout(props: LayoutProps) {
  return (
   <>
   <Header />
   {props.children }
   </>
  )
}

export default Layout