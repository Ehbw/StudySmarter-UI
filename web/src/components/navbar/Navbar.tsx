import { ActionIcon, AppShell, Box, Group, Text, useMantineColorScheme } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import classes from './navbar.module.css';

type NavProps = {
    children?: React.ReactNode,
    display: boolean
}

export const Nav: React.FC<NavProps> = (props) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    return (
        <AppShell.Navbar
            className={classes.navbar}
            hiddenFrom="sm"
            hidden={!props.display}
        >
            <AppShell.Section mt="xs">
                <Box className={classes.navbarbox}>
                    <Group>
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
            </AppShell.Section>

            <AppShell.Section grow mt="md">
                {props.children}
            </AppShell.Section>
        </AppShell.Navbar>
    )
}