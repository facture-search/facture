import { emitSocialClick } from "@facture/helpers";
import type { ManufacturerSocialPlatformType } from "@facture/types";
import Link from "next/link";
import { BrandChrome, BrandFacebook, BrandInstagram, BrandLinkedin, BrandTwitter, BrandYoutube } from "tabler-icons-react";

interface Props {
    name: ManufacturerSocialPlatformType;
    link: string;
    manufacturer: string;
}

export function SocialIcon({ name, link, manufacturer }: Props) {
    const emit = () => emitSocialClick(name, link, manufacturer);

    const out: { [key in ManufacturerSocialPlatformType]: JSX.Element } = {
        website: (
            <a onClick={emit} role="social-website" target="_blank" rel="noreferrer">
                <BrandChrome />
            </a>
        ),
        facebook: (
            <a onClick={emit} role="social-facebook" target="_blank" rel="noreferrer">
                <BrandFacebook />
            </a>
        ),
        twitter: (
            <a onClick={emit} role="social-twitter" target="_blank" rel="noreferrer">
                <BrandTwitter />
            </a>
        ),
        linkedin: (
            <a onClick={emit} role="social-linkedin" target="_blank" rel="noreferrer">
                <BrandLinkedin />
            </a>
        ),
        instagram: (
            <a onClick={emit} role="social-instagram" target="_blank" rel="noreferrer">
                <BrandInstagram />
            </a>
        ),
        youtube: (
            <a onClick={emit} role="social-youtube" target="_blank" rel="noreferrer">
                <BrandYoutube />
            </a>
        ),
    };

    return <Link href={link}>{out[name]}</Link>;
}

export default SocialIcon;
