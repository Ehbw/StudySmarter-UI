import { ActionIcon, Box, Group, Navbar, Text, useMantineColorScheme } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type NavProps = {
    children?: React.ReactNode,
    display: boolean
}

export const Nav: React.FC<NavProps> = (props) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    return (
        <Navbar
            p="md"
            width={{ base: 300, sm: 200, lg: 300 }}
            hiddenBreakpoint="sm"
            height="100vh"
            hidden={!props.display}
        >
            <Navbar.Section mt="xs">
                <Box
                    sx={(theme) => ({
                        paddingLeft: theme.spacing.xs,
                        paddingRight: theme.spacing.xs,
                        paddingBottom: theme.spacing.lg,
                        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`
                    })}    
                >
                    <Group position="apart">
                        <Text>Study</Text>
                        <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                            {
                                colorScheme === "dark" ?
                                <FontAwesomeIcon icon="sun" fixedWidth /> :
                                <FontAwesomeIcon icon="moon" fixedWidth />
                            }
                        </ActionIcon>
                    </Group>
                </Box>
            </Navbar.Section>

            <Navbar.Section grow mt="md">
                {props.children}
            </Navbar.Section>
        </Navbar>
    )
}