import React from "react"
import{ Button } from '@radix-ui/themes'
import Link from "next/link"

const seeIssue = () => {
    return(
        <div><Button><Link href='/'>Done Issue</Link></Button></div>
    )
}

export default seeIssue