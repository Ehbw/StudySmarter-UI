import { DefaultMantineColor, Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

import classes from './button.module.css';

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
            className={classes.button}
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