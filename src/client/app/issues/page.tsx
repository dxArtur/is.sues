import React from "react"
import { Button } from '@radix-ui/themes'
import Link from "next/link"

const issuesPage = () => {
    return (
        <div className="space-x-3">
            <Button>
                <Link href='/issues/new'>
                    New sssue
                </Link>
            </Button>
            <Button>
                <Link href='/issues/new'>
                    See my issues
                </Link>
            </Button>
        </div>
    )
}

export default issuesPage