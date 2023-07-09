import { DefaultMantineColor, Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

type NavbarButtonProps = {
    icon: React.ReactNode;
    link?: string; 
    label: string;
    color: DefaultMantineColor;
    children?: never[]; 
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({icon, link, label, color}) => {
    const navigation = useNavigate()
    return (
        <UnstyledButton 
            component="a"
            href={link}
            sx={(theme) => ({
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
                }
            })}
        >
            <Group>
                <ThemeIcon color={color} variant="light">
                    {icon}
                </ThemeIcon>
                <Text size="sm">
                    {label}
                </Text>
            </Group>
        </UnstyledButton>

    )
}