import gifi from "@/assets/logo.gif";

import styles from "./Logo.module.css";
import { useState, useEffect } from "react";

import React from "react";
//import { useDispatch, useSelector } from "react-redux";

import { Title } from '@mantine/core';
export default function Logo() {
	return (
		<>
			<div className={styles.parent}>
					      <Title order={3}>
				<img src={gifi} className={styles.logo} />
			 Shama</Title>
			</div>
		</>
	);
}
