import styles from "./HomePage.module.css";
import Logo from "@/components/Logo";
import BarMenu from "@/components/BarMenu";

// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import {
	MantineProvider,
	virtualColor,
	createTheme,
	localStorageColorSchemeManager,
} from "@mantine/core";

import { useState, useEffect } from "react";

import React from "react";
//import { useDispatch, useSelector } from "react-redux";
import { AppShell, Burger, Group, Skeleton } from "@mantine/core";

import { MantineLogo } from "@mantinex/mantine-logo";
import { useDisclosure } from "@mantine/hooks";

const colorSchemeManager = localStorageColorSchemeManager({
	key: "my-app-color-scheme",
});
const theme = createTheme({
	colors: {
		primary: virtualColor({
			name: "primary",
			dark: "pink",
			light: "cyan",
		}),
	},
});
export default function HomePage() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<>
			<MantineProvider colorSchemeManager={colorSchemeManager} theme={theme} defaultColorScheme="dark">
				<div className={styles.parent}>
					<AppShell
						header={{ height: 60 }}
						navbar={{
							width: 300,
							breakpoint: "sm",
							collapsed: { mobile: !opened },
						}}
						padding="md"
					>
						<AppShell.Header>
							<Group h="100%" px="md">
								<Burger
									opened={opened}
									onClick={toggle}
									hiddenFrom="sm"
									size="sm"
								/>
								<Logo />
								<BarMenu />
							</Group>
						</AppShell.Header>
						<AppShell.Navbar p="md">
							Navbar
							{Array(15)
								.fill(0)
								.map((_, index) => (
									<Skeleton key={index} h={28} mt="sm" animate={false} />
								))}
						</AppShell.Navbar>
						<AppShell.Main>Main</AppShell.Main>
					</AppShell>
				</div>
			</MantineProvider>
		</>
	);
}
