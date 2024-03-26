interface Link {
  name: string;
  link: string;
}

interface Props {
  Links: Link[];
  title: string;
}

export default function FooterItem({ Links, title }: Props) {
  return (
    <ul>
      <h1 className=" mb-1 font-semibold">{title}</h1>
      {Links.map((link) => (
        <li key={link.name}>
          <a
            className=" text-gray-400 hover:text-teal-400 duration-300 cursor-pointer text-sm leading-6"
            href={link.link}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
