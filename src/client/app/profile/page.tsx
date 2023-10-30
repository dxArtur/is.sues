import React from "react"
import { Avatar, Text, Button, Flex } from "@radix-ui/themes"


const profilePage =()=>{

    return(
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-4">
        <Avatar
          src="https://via.placeholder.com/150"
          alt="Profile Picture"
          size={150}
          className="mx-auto"
        />
        <Text size="2xl" weight="bold" className="text-center">
          John Doe
        </Text>
        <Text size="lg" className="text-center">
          Software Developer
        </Text>
        <Flex direction="row" gap={1} className="justify-center">
          <Button as="a" href="#" variant="blue">
            Follow
          </Button>
          <Button variant="white">Message</Button>
        </Flex>
      </div>
    </div>
    )
}

export default profilePage