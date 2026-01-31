import React from "react";
import { config, fields, collection, singleton } from "@keystatic/core";
import { wrapper } from "@keystatic/core/content-components";

const admonition = wrapper({
	label: "Admonition",
	ContentView: ({ children }) => React.createElement("div", null, children),
	schema: {
		variant: fields.select({
			label: "Variant",
			options: [
				{ label: "Info", value: "info" },
				{ label: "Tip", value: "tip" },
				{ label: "Caution", value: "caution" },
				{ label: "Danger", value: "danger" },
			],
			defaultValue: "info",
		}),
	},
});

const mdxComponents = {
	Admonition: admonition,
};

const portfolioImage = (directory: string) =>
	fields.image({
		label: "Image",
		directory,
		publicPath: `/${directory}/`,
	});

const portfolioSchema = (directory: string, langDefault: "en" | "el") => ({
	title: fields.slug({
		name: {
			label: "Title",
			validation: { isRequired: true },
		},
	}),
	description: fields.text({ label: "Description", multiline: true }),
	heroImage: fields.image({
		label: "Hero Image",
		directory,
		publicPath: `/${directory}/`,
	}),
	clients: fields.array(fields.text({ label: "Client" }), {
		label: "Clients",
		itemLabel: (props) => props.value ?? "Client",
	}),
	location: fields.text({ label: "Location" }),
	images: fields.array(
		fields.object({
			images: fields.array(portfolioImage(directory), {
				label: "Images",
			}),
		}),
		{
			label: "Image Groups",
		},
	),
	date: fields.date({ label: "Date" }),
	order: fields.number({ label: "Order" }),
	draft: fields.checkbox({ label: "Draft" }),
	lang: fields.select({
		label: "Language",
		options: [
			{ label: "English", value: "en" },
			{ label: "Greek", value: "el" },
		],
		defaultValue: langDefault,
	}),
	translationKey: fields.text({ label: "Translation Key" }),
	body: fields.mdx({ label: "Body", extension: "md", components: mdxComponents }),
});

export default config({
	storage: { kind: "local" },
	collections: {
		portfoliosEn: collection({
			label: "Portfolios (EN)",
			path: "src/data/portfolios/en/*/index",
			slugField: "title",
			format: { contentField: "body" },
			schema: portfolioSchema("src/data/portfolios/en", "en"),
		}),
		portfoliosEl: collection({
			label: "Portfolios (EL)",
			path: "src/data/portfolios/el/*/index",
			slugField: "title",
			format: { contentField: "body" },
			schema: portfolioSchema("src/data/portfolios/el", "el"),
		}),
		testimonials: collection({
			label: "Testimonials",
			path: "src/data/testimonials/*/index",
			slugField: "title_en",
			format: { contentField: "body" },
			schema: {
				title_en: fields.text({ label: "Title (EN)" }),
				title_el: fields.text({ label: "Title (EL)" }),
				testimonial_en: fields.text({ label: "Testimonial (EN)", multiline: true }),
				testimonial_el: fields.text({ label: "Testimonial (EL)", multiline: true }),
				image: fields.image({
					label: "Image",
					directory: "src/data/testimonials",
					publicPath: "/src/data/testimonials/",
				}),
				order: fields.number({ label: "Order" }),
				draft: fields.checkbox({ label: "Draft" }),
				lang: fields.select({
					label: "Language",
					options: [
						{ label: "English", value: "en" },
						{ label: "Greek", value: "el" },
					],
					defaultValue: "en",
				}),
				translationKey: fields.text({ label: "Translation Key" }),
				body: fields.mdx({ label: "Body", extension: "md", components: mdxComponents }),
			},
		}),
	},
	singletons: {
		privacyPolicy: singleton({
			label: "Privacy Policy",
			path: "src/data/otherPages/privacy-policy",
			format: { contentField: "body" },
			schema: {
				title: fields.text({ label: "Title" }),
				description: fields.text({ label: "Description", multiline: true }),
				lang: fields.select({
					label: "Language",
					options: [
						{ label: "English", value: "en" },
						{ label: "Greek", value: "el" },
					],
					defaultValue: "en",
				}),
				translationKey: fields.text({ label: "Translation Key" }),
				body: fields.mdx({ label: "Body", extension: "md", components: mdxComponents }),
			},
		}),
		elements: singleton({
			label: "Elements Page",
			path: "src/data/otherPages/elements",
			format: { contentField: "body" },
			schema: {
				title: fields.text({ label: "Title" }),
				description: fields.text({ label: "Description", multiline: true }),
				lang: fields.select({
					label: "Language",
					options: [
						{ label: "English", value: "en" },
						{ label: "Greek", value: "el" },
					],
					defaultValue: "en",
				}),
				translationKey: fields.text({ label: "Translation Key" }),
				body: fields.mdx({ label: "Body", components: mdxComponents }),
			},
		}),
	},
});
