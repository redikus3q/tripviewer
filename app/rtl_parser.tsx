"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

/* eslint-disable  @typescript-eslint/no-explicit-any */
const ReadOnlyRichText = (props: { value: any }) => {
	const editor = useMemo(() => withReact(createEditor()), []);
	// const value = await replaceUploadIdsWithUrls(props.value, props.payload);

	// Render block-level elements (e.g., paragraphs, headings)
	/* eslint-disable  @typescript-eslint/no-explicit-any */
	const renderElement = useCallback((props: any) => {
		const { attributes, children, element } = props;
		switch (element.type) {
			case "heading":
				return <h1 {...attributes}>{children}</h1>;
			case "link":
				return (
					<a
						className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
						href={element.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{children}
					</a>
				);
			case "ol":
				return (
					<ol
						className="ps-5 mt-2 space-y-1 list-decimal list-inside"
						{...attributes}
					>
						{children}
					</ol>
				);
			case "ul":
				return (
					<ul
						className="max-w-md space-y-1 list-disc list-inside"
						{...attributes}
					>
						{children}
					</ul>
				);
			case "li":
				return <li {...attributes}>{children}</li>;
			case "paragraph":
				return <p {...attributes}>{children}</p>;
			case "upload":
				const url = element.value.url;
				const alt = element.value.alt;

				// Displaying image metadata along with the image
				return (
					<div {...attributes}>
						<Image
							src={url}
							alt={alt || url}
							style={{
								width: "50%",
								height: "auto",
							}}
							className="rounded-xl shadow-lg w-28 h-28 object-cover border-2 border-gray-400 max-w-full h-auto mt-3"
							width={500}
							height={300}
						/>
						{children}
					</div>
				);
			default:
				return <div {...attributes}>{children}</div>;
		}
	}, []);

	// Render inline text formatting (e.g., bold, italic, underline)
	/* eslint-disable  @typescript-eslint/no-explicit-any */
	const renderLeaf = useCallback((props: any) => {
		const { attributes, children, leaf } = props;
		let el = children;
		if (leaf.bold) {
			el = <strong>{el}</strong>;
		}
		if (leaf.italic) {
			el = <em>{el}</em>;
		}
		if (leaf.underline) {
			el = <u>{el}</u>;
		}
		return <span {...attributes}>{el}</span>;
	}, []);

	// Preventing mismatch beetween client and server renders
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return (
			<span className="loading loading-spinner loading-md text-primary"></span>
		);
	}

	return (
		<Slate editor={editor} initialValue={props.value} onChange={() => {}}>
			<Editable
				readOnly
				renderElement={renderElement}
				renderLeaf={renderLeaf}
			/>
		</Slate>
	);
};

export default ReadOnlyRichText;
