import { FC } from "react";
import { Helmet } from "react-helmet";

interface SeoProps {
  title: string;
}

const Seo: FC<SeoProps> = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
    </Helmet>
  );
};

export default Seo;
