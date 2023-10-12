import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppShell } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react"
import { NavHeader } from "../components/Header";
import { NavbarButton } from "../components/navbar/Button";
import { Nav } from "../components/navbar/Navbar";

type TemplateProps = {
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({children}) => {
    const [navbar, setNavbar] = useState<boolean>(true)
    const matches = useMediaQuery('(min-width: 768px)')

    return (
      <AppShell
        navbar={{
          breakpoint: "md",
          width: 300
        }}
      >
        <NavHeader navbar={navbar} setNavbar={setNavbar} />
        <Nav display={navbar}>
          <NavbarButton icon={<FontAwesomeIcon icon="house" fixedWidth />} label="Dashboard" link="/" color="green"/>
          <NavbarButton icon={<FontAwesomeIcon icon="book-open" fixedWidth />} label="Study Sets" link="/sets" color="red"/>
        </Nav>
        <AppShell.Main>
          {children}
        </AppShell.Main>
      </AppShell>
    )
}

export default Template;