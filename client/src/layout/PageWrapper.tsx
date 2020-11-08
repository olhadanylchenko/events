import React, { ComponentProps } from 'react'
import Footer from "./Footer"
import Header from "./Header"

const PageWrapper: React.FunctionComponent<{}> = (props) => {
    return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>  
    )
}

export default PageWrapper;
