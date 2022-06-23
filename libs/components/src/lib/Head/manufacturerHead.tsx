import { ColorDisplay } from "@facture/types";
import Head from "next/head";

interface Props {
    manufacturer: string;
    name: string;
    description: string;
    color: ColorDisplay;
}

export function ManufacturerHead({ manufacturer, name, description, color }: Props) {
    const title = `${name} - Facture`;
    const url = `https://facture.com.au/manufacturers/${manufacturer}`;

    const colorMapping: { [key in ColorDisplay]: string } = {
        slate: "#475569",
        gray: "#4b5563",
        zinc: "#52525b",
        neutral: "#525252",
        stone: "#57534e",
        red: "#dc2626",
        orange: "#ea580c",
        amber: "#d97706",
        yellow: "#ca8a04",
        lime: "#65a30d",
        green: "#16a34a",
        emerald: "#059669",
        teal: "#0d9488",
        cyan: "#0891b2",
        sky: "#0284c7",
        blue: "#2563eb",
        indigo: "#4f46e5",
        violet: "#7c3aed",
        purple: "#9333ea",
        fuchsia: "#c026d3",
        pink: "#db2777",
        rose: "#e11d48",
    };

    const themeColor = colorMapping[color];

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="theme-color" content={themeColor} />
            <link rel="canonical" href={url} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
        </Head>
    );
}

export default ManufacturerHead;
