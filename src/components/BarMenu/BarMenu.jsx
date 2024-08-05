import styles from "./BarMenu.module.css";
import { useState, useEffect } from "react";

import React from "react";
import { Avatar } from "@mantine/core";
//import { useDispatch, useSelector } from "react-redux";
import { Menu, Button, Text, rem } from "@mantine/core";
import {
	IconSettings,
	IconSearch,
	IconPhoto,
	IconMessageCircle,
	IconTrash,
	IconArrowsLeftRight,
} from "@tabler/icons-react";

import { useMemo } from "react";
import WebApp from "@twa-dev/sdk";

function getUserRows(user) {
	return [
		{ title: "id", value: user.id.toString() },
		{ title: "username", value: user.username },
		{ title: "photo_url", value: user.photo_url },
		{ title: "last_name", value: user.last_name },
		{ title: "first_name", value: user.first_name },
		{ title: "is_bot", value: user.is_bot },
		{ title: "is_premium", value: user.is_premium },
		{ title: "language_code", value: user.language_code },
		{ title: "allows_to_write_to_pm", value: user.allows_write_to_pm },
		{ title: "added_to_attachment_menu", value: user.added_to_attachment_menu },
	];
}
export default function BarMenu() {
	const initDataRaw = WebApp.initData;
	const initData = WebApp.initDataUnsafe;

	const initDataRows = useMemo(() => {
		if (!initData || !initDataRaw) {
			return;
		}
		const {
			hash,
			start_param,
			chat_instance,
			chat_type,
			auth_date,
			can_send_after,
			query_id,
		} = initData;
		return [
			{ title: "raw", value: initDataRaw },
			{
				title: "auth_date",
				value: new Date(auth_date * 1000).toLocaleString(),
			},
			{ title: "auth_date (raw)", value: auth_date },
			{ title: "hash", value: hash },
			{ title: "can_send_after", value: can_send_after },
			{ title: "query_id", value: query_id },
			{ title: "start_param", value: start_param },
			{ title: "chat_type", value: chat_type },
			{ title: "chat_instance", value: chat_instance },
		];
	}, [initData, initDataRaw]);

	const userRows = useMemo(() => {
		return initData && initData.user ? getUserRows(initData.user) : undefined;
	}, [initData]);

	const receiverRows = useMemo(() => {
		return initData && initData.receiver
			? getUserRows(initData.receiver)
			: undefined;
	}, [initData]);

	const chatRows = useMemo(() => {
		if (!initData?.chat) {
			return;
		}
		const { id, title, type, username, photo_url } = initData.chat;

		console.log(initData);
		return [
			{ title: "id", value: id.toString() },
			{ title: "title", value: title },
			{ title: "type", value: type },
			{ title: "username", value: username },
			{ title: "photo_url", value: photo_url },
		];
	}, [initData]);
	useEffect(() => {
		console.log('3', chatRows,initData,initDataRows);
	}, [chatRows])
	return (
		<>
			<div className={styles.parent}>
				<Menu shadow="md" width={200}>
					<Menu.Target>
						<Avatar  alt="it's me" />
					</Menu.Target>

					<Menu.Dropdown>
						<Menu.Label>Application</Menu.Label>
						<Menu.Item
							leftSection={
								<IconSettings style={{ width: rem(14), height: rem(14) }} />
							}
						>
							Settings
						</Menu.Item>
						<Menu.Item
							leftSection={
								<IconMessageCircle
									style={{ width: rem(14), height: rem(14) }}
								/>
							}
						>
							Messages
						</Menu.Item>
						<Menu.Item
							leftSection={
								<IconPhoto style={{ width: rem(14), height: rem(14) }} />
							}
						>
							Gallery
						</Menu.Item>
						<Menu.Item
							leftSection={
								<IconSearch style={{ width: rem(14), height: rem(14) }} />
							}
							rightSection={
								<Text size="xs" c="dimmed">
									⌘K
								</Text>
							}
						>
							Search
						</Menu.Item>

						<Menu.Divider />

						<Menu.Label>Danger zone</Menu.Label>
						<Menu.Item
							leftSection={
								<IconArrowsLeftRight
									style={{ width: rem(14), height: rem(14) }}
								/>
							}
						>
							Transfer my data
						</Menu.Item>
						<Menu.Item
							color="red"
							leftSection={
								<IconTrash style={{ width: rem(14), height: rem(14) }} />
							}
						>
							Delete my account
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</div>
		</>
	);
}
