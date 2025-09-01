export interface SiteDataProps {
	name: string;
	title: string;
	description: string;
	useViewTransitions?: boolean; // defaults to false. Set to true to enable some Astro 3.0 view transitions
	author: {
		name: string;
		email: string;
		twitter: string; // used for twitter cards when sharing a blog post on twitter
	};
	defaultImage: {
		src: string;
		alt: string;
	};
}

// Update this file with your site specific information
const siteData: SiteDataProps = {
    name: "Atelier 13 Interiors",
	// Your website's title and description (meta fields)
    title: "Atelier 13 — Interior design studio",
    description:
        "We design thoughtful, functional interiors for homes and small businesses. From concept to renovation, we bring spaces to life.",
	useViewTransitions: true,
	// Your information!
	author: {
		name: "Saikolab",
		email: "info@saikolab.com",
	},

	// default image for meta tags if the page doesn't have an image already
	defaultImage: {
		src: "/images/saikolab-logo.jpg",
		alt: "Saikolab logo",
	},
};

export default siteData;
