import { IonIcon } from "@ionic/react";
import {
  home,
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  logoGithub,
  logoTwitter,
} from "ionicons/icons";

interface Link {
  name: string;
  link: string;
}

interface Props {
  Icons: Link[];
}

export default function FooterSocialIcons({ Icons }: Props) {
  return (
    <div className=" text-teal-500">
      {Icons.map((icon) => (
        <span
          key={icon.name}
          className=" p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500 duration-300"
        >
          <IonIcon
            className=""
            icon={
              icon.name === "logo-facebook"
                ? logoFacebook
                : icon.name === "logo-twitter"
                ? logoTwitter
                : icon.name === "logo-github"
                ? logoGithub
                : icon.name === "logo-linkedin"
                ? logoLinkedin
                : icon.name === "logo-instagram"
                ? logoInstagram
                : home
            }
          />
        </span>
      ))}
    </div>
  );
}
