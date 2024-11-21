import { blogs, Blog } from "@/app/fixtures/blogs";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";

type Props = {
  heading: string;
  subheading?: string;
  children: React.ReactNode;
};

export const SiteSection = (props: Props) => {
  return (
    <div className="mx-auto text-center max-w-7xl py-12 px-8 lg:px-8 border-t border-gray-200">
      <div className="mx-auto lg:mx-0">
        <h2 className="lg:text-3xl tracking-tight sm:text-2xl">
          {props.heading}
        </h2>
        {props.subheading ?? (
          <p className="mt-2 text-lg leading-8 text-gray-500">
            {props.subheading}
          </p>
        )}
      </div>
      <div className="mx-auto max-w-7xl pt-8 lg:px-8">
        {props.children}
      </div>
    </div>
  );
};