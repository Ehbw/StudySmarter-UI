import { AppShell, Burger, useMantineTheme } from "@mantine/core"
import React from "react"

import classes from './header.module.css';

type Props = {
    navbar: boolean;
    setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavHeader: React.FC<Props> = ({navbar, setNavbar}) => {
    const theme = useMantineTheme();
    return (
        <AppShell.Header 
            className={classes.header}
        >
            <div className={classes.headerBurger}>
                <Burger
                    opened={navbar}
                    onClick={() => setNavbar((s) => !s)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl" 
                />
            </div>
        </AppShell.Header>
    )
}