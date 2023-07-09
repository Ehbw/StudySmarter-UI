import { Burger, Header, MediaQuery, useMantineTheme } from "@mantine/core"
import React from "react"

type Props = {
    navbar: boolean;
    setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavHeader: React.FC<Props> = ({navbar, setNavbar}) => {
    const theme = useMantineTheme();
    return (
        <MediaQuery
            largerThan="sm"
            styles={{
                display: "none"
            }}    
        >
            <Header 
                height={{
                    base: 50,
                    md: 70
                }}
            >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%"
                }}>
                    <Burger
                        opened={navbar}
                        onClick={() => setNavbar((s) => !s)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl" 
                    />
                </div>
            </Header>
        </MediaQuery>
    )
}